import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Key } from './entities/key.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

interface QueryParams {
  limit: number;
  offset: number;
}

@Injectable()
export class KeysService {
  constructor(
    @InjectRepository(Key)
    private keysRepository: Repository<Key>,
  ) { }

  private static generateKey(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
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

  async findAllUserKeys(user: User, params?: QueryParams): Promise<Key[]> {
    const { limit, offset } = params;

    return await this.keysRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      take: limit,
      skip: offset,
    });
  }

  async deleteKey(key: string): Promise<void> {
    await this.keysRepository.delete({ key });
  }

  async updateKey(key: string, allowed_domains: string[]): Promise<Key> {
    const keyToUpdate = await this.findKey(key);
    keyToUpdate.allowed_domains = allowed_domains;
    return this.keysRepository.save(keyToUpdate);
  }

  async verifyKey(key: string, referer: string): Promise<boolean> {
    const keyObj = await this.findKey(key);
    if (!keyObj) {
      return false;
    }

    if (!keyObj.allowed_domains.includes(referer)) {
      return false;
    }

    return true;
  }
}
