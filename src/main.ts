import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4000',
    ],
  });
  
  await app.listen(port);
  Logger.log(`Url server running on -> ${await app.getUrl()}`);
}
bootstrap();
