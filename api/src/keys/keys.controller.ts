import { Body, Controller, Get, NotFoundException, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { KeysService } from './keys.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateKeyDto, UpdateKeyDto } from './dto/key.dto';

@Controller('keys')
export class KeysController {
    constructor(private keysService: KeysService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    list(@Req() req) {
        return this.keysService.findAllUserKeys(req.user);
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
}
