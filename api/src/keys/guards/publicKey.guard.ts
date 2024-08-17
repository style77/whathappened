import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { KeysService } from '../keys.service';

@Injectable()
export class PublicKeyGuard implements CanActivate {
  constructor(
    private readonly keysService: KeysService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const publicKey = request.headers.authorization;
    const referer = request.headers.referer || request.headers.origin;

    if (!publicKey) {
      throw new UnauthorizedException('Public key is missing');
    }

    const isValid = await this.keysService.verifyKey(publicKey, referer);
    if (!isValid) {
      throw new UnauthorizedException('Invalid public key or referer');
    }

    return true;
  }
}
