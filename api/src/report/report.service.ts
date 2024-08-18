import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { SessionError } from './entities/session-error.entity';
import { Session } from './entities/session.entity';
import { Error } from './entities/error.entity';
import { inflate } from 'pako';
import { Key } from 'src/keys/entities/key.entity';
import { Report } from './entities/report.entity';
import { CreateReportDTO } from './dto/report.dto';
import {
  ReportDetailsResponse,
  ReportResponse,
} from './responses/report.response';

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

    private dataSource: DataSource,
  ) {}

  private static decompressUint8Array(compressedData: Uint8Array): any {
    return JSON.parse(inflate(compressedData, { to: 'string' }));
  }

  async createReportTransaction(
    createReportDto: CreateReportDTO,
    publicKey: Key,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const error = await this.getOrCreateError(
        createReportDto.error.id,
        createReportDto.error.message,
        createReportDto.error.filename,
        createReportDto.error.lineno,
        createReportDto.error.colno,
        createReportDto.error.errorStack,
        publicKey,
        queryRunner,
      );

      const session = await this.createSession(
        createReportDto.session.id,
        createReportDto.session.user,
        createReportDto.session.ua,
        createReportDto.session.url,
        createReportDto.session.referrer,
        createReportDto.session.screen,
        createReportDto.session.viewport,
        queryRunner,
      );

      await this.createSessionError(
        session,
        error,
        createReportDto.mouseMovements,
        createReportDto.interactions,
        new Date(createReportDto.session.time.startedAt),
        new Date(createReportDto.session.time.endedAt),
        createReportDto.session.time.duration,
        queryRunner,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async createError(
    id: string,
    message: string,
    filename: string,
    lineno: number,
    colno: number,
    errorStack: string,
    key: Key,
    queryRunner: QueryRunner,
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

    return queryRunner.manager.save(error);
  }

  async getOrCreateError(
    id: string,
    message: string,
    filename: string,
    lineno: number,
    colno: number,
    errorStack: string,
    publicKey: Key,
    queryRunner: QueryRunner,
  ): Promise<Error> {
    const error = await queryRunner.manager.findOne(Error, {
      where: { id },
    });
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
      queryRunner,
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
    queryRunner: QueryRunner,
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

    return queryRunner.manager.save(session);
  }

  async createSessionError(
    session: Session,
    error: Error,
    mouseMovements: Uint8Array,
    interactions: Uint8Array,
    startedAt: Date,
    endedAt: Date,
    duration: number,
    queryRunner: QueryRunner,
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

    return queryRunner.manager.save(sessionError);
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
