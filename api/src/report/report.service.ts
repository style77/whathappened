import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionError } from './entities/session-error.entity';
import { Session } from './entities/session.entity';
import { Error } from './entities/error.entity';
import pako from 'pako';
import { Key } from 'src/keys/entities/key.entity';
import {
  ReportDetailsResponse,
  ReportResponse,
} from './responses/report.response';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Error)
    private errorRepository: Repository<Error>,

    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,

    @InjectRepository(SessionError)
    private sessionErrorRepository: Repository<SessionError>,

    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) { }

  async createError(
    id: string,
    message: string,
    filename: string,
    lineno: number,
    colno: number,
    errorStack: string,
    key: Key,
  ): Promise<Error> {
    const error = this.errorRepository.create({
      id,
      message,
      filename,
      lineno,
      colno,
      errorStack,
      key,
    });

    return this.errorRepository.save(error);
  }

  async getOrCreateError(
    id: string,
    message: string,
    filename: string,
    lineno: number,
    colno: number,
    errorStack: string,
    publicKey: Key,
  ) {
    const error = await this.errorRepository.findOne({ where: { id } });
    if (error) {
      return error;
    }

    return await this.createError(
      id,
      message,
      filename,
      lineno,
      colno,
      errorStack,
      publicKey,
    );
  }

  async createSession(
    id: string,
    userId: string,
    ua: string,
    url: string,
    referrer: string,
    screen: { width: number; height: number },
    viewport: { width: number; height: number },
  ): Promise<Session> {
    const session = this.sessionRepository.create({
      id,
      userId,
      ua,
      url,
      referrer,
      screen,
      viewport,
    });

    return this.sessionRepository.save(session);
  }

  private static decompressUint8Array(compressedData: Uint8Array): any {
    const decompressedData = pako.inflate(compressedData, { to: 'string' });
    return JSON.parse(decompressedData);
  }

  async createSessionError(
    session: Session,
    error: Error,
    mouseMovements: Uint8Array,
    interactions: Uint8Array,
    startedAt: Date,
    endedAt: Date,
    duration: number,
  ): Promise<SessionError> {
    const sessionError = new SessionError();
    sessionError.session = session;
    sessionError.error = error;
    sessionError.mouseMovements = ReportService.decompressUint8Array(
      mouseMovements,
    ) as {
      x: number;
      y: number;
      timestamp: number;
    }[];
    sessionError.interactions = ReportService.decompressUint8Array(
      interactions,
    ) as {
      eventType: string;
      eventData: any;
      timestamp: number;
    }[];
    sessionError.startedAt = startedAt;
    sessionError.endedAt = endedAt;
    sessionError.duration = duration;

    return this.sessionErrorRepository.save(sessionError);
  }

  async getAllReports(
    limit: number = 10,
    offset: number = 0,
    key?: Key,
  ): Promise<ReportResponse[]> {
    const query = this.reportRepository
      .createQueryBuilder('report')
      .innerJoinAndSelect('report.error', 'error')
      .innerJoinAndSelect('error.key', 'key')
      .leftJoinAndSelect('error.sessionErrors', 'sessionError')
      .leftJoinAndSelect('sessionError.session', 'session')
      .limit(limit)
      .offset(offset);

    if (key) {
      query.where('key.id = :key', { key: key.key });
    }

    const reports = await query.getMany();

    return reports.map((report) => {
      const occurrences = report.error.sessionErrors.length;
      const uniqueUsersAffected = new Set(
        report.error.sessionErrors.map((se) => se.session.userId),
      ).size;

      return {
        id: report.id,
        url: report.url,
        severity: report.severity,
        steps: report.steps,
        videoUrl: report.videoUrl,
        thumbnailUrl: report.thumbnailUrl,
        error: {
          id: report.error.id,
          message: report.error.message,
          filename: report.error.filename,
          lineno: report.error.lineno,
          colno: report.error.colno,
          errorStack: report.error.errorStack,
          firstOccurredAt: report.error.firstOccurredAt.toISOString(),
          lastOccurredAt: report.error.lastOccurredAt.toISOString(),
          key: {
            key: report.error.key.key,
          },
          occurrences,
          uniqueUsersAffected,
        },
      };
    });
  }

  private async getUserTotalErrorsCount(userId: string): Promise<number> {
    const query = this.sessionErrorRepository
      .createQueryBuilder('sessionError')
      .innerJoinAndSelect('sessionError.session', 'session')
      .where('session.userId = :userId', { userId });

    return query.getCount();
  }

  async getReportDetails(
    errorId: string,
    limit: number,
    offset: number,
  ): Promise<ReportDetailsResponse> {
    // Fetch the error with its sessions and related details
    const query = this.sessionErrorRepository
      .createQueryBuilder('sessionError')
      .innerJoinAndSelect('sessionError.session', 'session')
      .innerJoinAndSelect('sessionError.error', 'error')
      .where('error.id = :errorId', { errorId })
      .limit(limit)
      .offset(offset);

    const sessionErrors = await query.getMany();

    if (sessionErrors.length === 0) {
      return null;
    }

    const firstSessionError = sessionErrors[0];

    const userMap = new Map<
      string,
      { encounteredThisError: number; totalErrors: number }
    >();

    for (const se of sessionErrors) {
      const userId = se.session.userId;
      if (!userMap.has(userId)) {
        userMap.set(userId, {
          encounteredThisError: 0,
          totalErrors: await this.getUserTotalErrorsCount(userId),
        });
      }

      const user = userMap.get(userId);
      user.encounteredThisError += 1;
    }

    const report = await this.reportRepository.findOne({
      where: {
        error: {
          id: firstSessionError.error.id,
        },
      },
    });

    const reportDetailsResponse: ReportDetailsResponse = {
      id: firstSessionError.error.id,
      url: report.url,
      severity: report.severity,
      steps: report.steps,
      videoUrl: report.videoUrl,
      thumbnailUrl: report.thumbnailUrl,
      error: {
        id: firstSessionError.error.id,
        message: firstSessionError.error.message,
        filename: firstSessionError.error.filename,
        lineno: firstSessionError.error.lineno,
        colno: firstSessionError.error.colno,
        errorStack: firstSessionError.error.errorStack,
        firstOccurredAt: firstSessionError.error.firstOccurredAt.toISOString(),
        lastOccurredAt: firstSessionError.error.lastOccurredAt.toISOString(),
        key: {
          key: firstSessionError.error.key.key,
          user: { id: firstSessionError.error.key.user.id },
        },
        occurrences: sessionErrors.length,
        uniqueUsersAffected: new Set(
          sessionErrors.map((se) => se.session.userId),
        ).size,
        sessions: sessionErrors.map((se) => ({
          id: se.session.id,
          user: {
            id: se.session.userId,
            encounteredThisError: userMap.get(se.session.userId)
              .encounteredThisError,
            totalErrors: userMap.get(se.session.userId).totalErrors,
          },
          ua: se.session.ua,
          url: se.session.url,
          referrer: se.session.referrer,
          screen: se.session.screen,
          viewport: se.session.viewport,
          time: {
            startedAt: se.startedAt.toISOString(),
            endedAt: se.endedAt.toISOString(),
            duration: se.duration,
          },
        })),
      },
    };

    return reportDetailsResponse;
  }
}
