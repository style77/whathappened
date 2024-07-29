import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

const SALT_OR_ROUNDS = 10;

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    private async getPasswordHash(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, SALT_OR_ROUNDS);
        return hash;
      }

    async createUser(email: string, password: string) {
        const hashedPassword = await this.getPasswordHash(password);
        const user = this.usersRepository.create({ email, hashedPassword });
        return this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }
}
