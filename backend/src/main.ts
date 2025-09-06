import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configure body parsers
  const jsonLimit = process.env.MAX_JSON_SIZE ?? '10mb';
  const binaryLimit = process.env.MAX_BINARY_SIZE ?? '100mb';
  app.use(express.json({ limit: jsonLimit }));
  app.use(express.urlencoded({ extended: true, limit: jsonLimit }));
  app.use(express.raw({ type: 'application/octet-stream', limit: binaryLimit }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
