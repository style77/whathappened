import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { KeysService } from './keys/keys.service';
import { KeysModule } from './keys/keys.module';
import { Key } from './keys/entities/key.entity';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '../.env',
    isGlobal: true,
  }), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Key],
    synchronize: true,
  }), AuthModule, UsersModule, KeysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
