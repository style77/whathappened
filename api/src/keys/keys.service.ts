import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Key } from './entities/key.entity';
import { Like, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

interface QueryParams {
  page: number;
  limit: number;
  sort: string;
  order: 'ASC' | 'DESC';
  filter?: string;
}

@Injectable()
export class KeysService {
  constructor(
    @InjectRepository(Key)
    private keysRepository: Repository<Key>,
  ) {}

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

  async findAllUserKeys(user: User, params: QueryParams): Promise<Key[]> {
    const { page, limit, sort, order, filter } = params;
    const where: any = { user };

    if (filter) {
      where.keyName = Like(`%${filter}%`);
    }

    return this.keysRepository.find({
      where,
      order: { [sort]: order },
      skip: (page - 1) * limit,
      take: limit,
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
