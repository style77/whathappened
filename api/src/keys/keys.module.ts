import { Module } from '@nestjs/common';
import { KeysController } from './keys.controller';
import { KeysService } from './keys.service';
import { Key } from './entities/key.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Key])],
  controllers: [KeysController],
  providers: [KeysService],
  exports: [KeysService]
})
export class KeysModule {}
