import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PublicKeyGuard } from 'src/keys/guards/publicKey.guard';
import { CreateReportDTO } from './dto/report.dto';
import { ReportService } from './report.service';
import { KeysService } from 'src/keys/keys.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Key } from 'src/keys/entities/key.entity';

@Controller('report')
export class ReportController {
  constructor(
    private reportService: ReportService,
    private keysService: KeysService,
  ) {}

  @UseGuards(PublicKeyGuard)
  @Post('/')
  async createReport(
    @Req() request: Request,
    @Res() response: Response,
    @Body() createReportDto: CreateReportDTO,
  ) {
    const key = request.headers['Authorization'] as string;
    const publicKey = await this.keysService.findKey(key);

    if (!publicKey) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    try {
      await this.reportService.createReportTransaction(
        createReportDto,
        publicKey,
      );
      return response
        .status(201)
        .json({ message: 'Report created successfully' });
    } catch (error) {
      Logger.error('Error creating report:', error);
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllReports(
    @Req() request,
    @Res() response: Response,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('publicKey') publicKey?: string,
  ) {
    let key: Key | null = null;
    if (!publicKey) {
      return await this.reportService.getAllReports(limit, offset, null);
    }

    key = await this.keysService.findKey(publicKey);
    if (!key) {
      return response.status(404).json({ message: 'Key not found' });
    }
    if (key.user.id !== request.user.id) {
      // Unauthorized, but we don't want to leak the key existence
      return response.status(404).json({ message: 'Key not found' });
    }

    return await this.reportService.getAllReports(limit, offset, key);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:errorId')
  async getReportDetails(
    @Req() req,
    @Res() response: Response,
    errorId: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    const details = await this.reportService.getReportDetails(
      errorId,
      limit,
      offset,
    );
    if (!details) {
      return response.status(404).json({ message: 'Report not found' });
    }

    if (details.error.key.user.id !== req.user.id) {
      return response.status(404).json({ message: 'Report not found' });
    }

    return details;
  }
}
