import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signUp(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            throw new BadRequestException("User already exists");
        }

        const createdUser = await this.usersService.createUser(email, password);
        const { hashedPassword, ...result } = createdUser;

        return result
    }

    async signIn(user: any) {
        const payload = {
            sub: user.id,
            email: user.email,
            createdAt: user.createdAt
        }
        
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

    async validateUser(password: string, hashedPassword: string): Promise<boolean> {
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        return isPasswordValid;
    }
}
