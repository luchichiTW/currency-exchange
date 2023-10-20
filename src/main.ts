import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const PORT = 3000;
const DOC_PATH = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Currency Exchange')
    .setDescription('Currency Exchange Quiz API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DOC_PATH, app, document);

  await app.listen(PORT);
  Logger.log(`🚀 Application is running on: http://localhost:${PORT}`);
  Logger.log(`🚀 Doc is running on: http://localhost:${PORT}/${DOC_PATH}`);
}
bootstrap();
