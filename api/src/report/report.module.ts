import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionError } from './entities/session-error.entity';
import { Session } from './entities/session.entity';
import { Report } from './entities/report.entity';
import { Error } from './entities/error.entity';
import { KeysModule } from 'src/keys/keys.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Error, Session, SessionError, Report]),
    KeysModule,
  ],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule { }
