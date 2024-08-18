import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { KeysModule } from './keys/keys.module';
import { Key } from './keys/entities/key.entity';
import { DynamicCorsMiddleware } from './middlewares/dynamic-cors.middleware';
import { VisualizerModule } from './microservices/visualizer/visualizer.module';
import { ReportModule } from './report/report.module';
import { SessionError } from './report/entities/session-error.entity';
import { Session } from './report/entities/session.entity';
import { Report } from './report/entities/report.entity';
import { Error } from './report/entities/error.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Key, Error, Session, SessionError, Report],
      synchronize: true,
      extra: {
        ssl: true,
      },
    }),
    AuthModule,
    UsersModule,
    KeysModule,
    VisualizerModule,
    ReportModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DynamicCorsMiddleware).forRoutes('*');
  }
}
