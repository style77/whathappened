import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionError } from './entities/session-error.entity';
import { Session } from './entities/session.entity';
import { Error } from './entities/error.entity';
import pako from 'pako';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Error)
    private errorRepository: Repository<Error>,

    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,

    @InjectRepository(SessionError)
    private sessionErrorRepository: Repository<SessionError>,
  ) {}

  async createError(
    message: string,
    filename: string,
    lineno: number,
    colno: number,
    errorStack: string,
  ): Promise<Error> {
    const error = this.errorRepository.create({
      message,
      filename,
      lineno,
      colno,
      errorStack,
    });

    return this.errorRepository.save(error);
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
}
