import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import appConfig from '@config/app.config';

async function bootstrap() {
  const PORT = appConfig.nodePort;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  if (appConfig.isDev) {
    // swagger
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder().setTitle('Chatbox API').build(),
    );

    SwaggerModule.setup('docs', app, document);
  }
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () =>
    Logger.log(`Server is listening to port ${PORT}`),
  );
}
bootstrap();
