import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DASHBOARD_URL } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: DASHBOARD_URL,
    methods: '*',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
  });
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
