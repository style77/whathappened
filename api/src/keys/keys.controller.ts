import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Post,
  Query,
  Req,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { KeysService } from './keys.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateKeyDto, UpdateKeyDto } from './dto/key.dto';

@Controller('keys')
export class KeysController {
  constructor(private keysService: KeysService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async list(
    @Req() req,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    const user: any = req.user;
    return await this.keysService.findAllUserKeys(user, {
      limit,
      offset,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  createKey(@Req() req, @Body() createKeyDto: CreateKeyDto) {
    return this.keysService.createKey(req.user, createKeyDto.allowed_domains);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/')
  async updateKey(@Req() req, @Body() updateKeyDto: UpdateKeyDto) {
    const keyObj = await this.keysService.findKey(updateKeyDto.key);
    if (!keyObj || keyObj.user.id !== req.user.id) {
      throw new NotFoundException('Key not found');
    }
    return this.keysService.updateKey(keyObj.key, updateKeyDto.allowed_domains);
  }

  @Get('/verify')
  async verify(
    @Req() req: Request,
    @Headers('Authorization') publicKey: string,
  ) {
    const referer = req.headers.referer || req.headers.origin;

    const result = await this.keysService.verifyKey(publicKey, referer);
    return {
      success: result,
    };
  }
}
