import { Body, Controller, Post, HttpCode, Req, HttpStatus, UseGuards, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const { access_token } = await this.authService.signIn(req.user);
        
        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000)
        }).json({ access_token });
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto.email, signUpDto.password);
    }

    @Get('logout')
    async signOut(@Res({ passthrough: true }) res: Response) {
        return res.clearCookie('access_token').json({ message: 'Logged out successfully}' });
    }

    @UseGuards(JwtAuthGuard)
    @Get('verify')
    verify() {
        return { message: 'Valid token' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    me(@Req() req) {
        return req.user;
    }
}
