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

    const normalizeDomain = (domain: string): string => {
      return domain.replace(/(https?:\/\/)|(www\.)/, '');
    };

    try {
      const refererUrl = new URL(referer);
      const refererDomain = normalizeDomain(refererUrl.host);

      for (const allowedDomain of keyObj.allowed_domains) {
        const normalizedAllowedDomain = normalizeDomain(allowedDomain);
        if (refererDomain === normalizedAllowedDomain) {
          return true;
        }
      }
    } catch (error) {
      console.error('Error parsing URL:', error);
      return false;
    }

    return false;
  }
}
