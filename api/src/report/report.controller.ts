import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PublicKeyGuard } from 'src/keys/guards/publicKey.guard';
import { CreateReportDTO } from './dto/report.dto';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @UseGuards(PublicKeyGuard)
  @Post('/')
  async createReport(@Body() createReportDto: CreateReportDTO) {
    const error = await this.reportService.createError(
      createReportDto.error.message,
      createReportDto.error.filename,
      createReportDto.error.lineno,
      createReportDto.error.colno,
      createReportDto.error.errorStack,
    );
    const session = await this.reportService.createSession(
      createReportDto.session.id,
      createReportDto.session.user,
      createReportDto.session.ua,
      createReportDto.session.url,
      createReportDto.session.referrer,
      createReportDto.session.screen,
      createReportDto.session.viewport,
    );

    const sessionError = await this.reportService.createSessionError(
      session,
      error,
      createReportDto.mouseMovements,
      createReportDto.interactions,
      new Date(createReportDto.session.time.startedAt),
      new Date(createReportDto.session.time.endedAt),
      createReportDto.session.time.duration,
    );

    return sessionError;
  }
}
