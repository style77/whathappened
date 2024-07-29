import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Key } from './entities/key.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class KeysService {
    constructor(
        @InjectRepository(Key)
        private keysRepository: Repository<Key>,
    ) {}

    private static generateKey(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    async createKey(user: User, allowed_domains: string[]): Promise<Key> {
        const key = this.keysRepository.create({
            key: KeysService.generateKey(),
            user: user,
            allowed_domains: allowed_domains,
        });
        return this.keysRepository.save(key);
    }

    async findKey(key: string): Promise<Key> {
        return this.keysRepository.findOne({ where: { key } });
    }

    async findAllUserKeys(user: User): Promise<Key[]> {
        return this.keysRepository.find({ where: { user } });
    }

    async deleteKey(key: string): Promise<void> {
        await this.keysRepository.delete({ key });
    }

    async updateKey(key: string, allowed_domains: string[]): Promise<Key> {
        const keyToUpdate = await this.findKey(key);
        keyToUpdate.allowed_domains = allowed_domains;
        return this.keysRepository.save(keyToUpdate);
    }
}
