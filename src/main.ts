import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './Modules/Common/http-excepcion.filter';


async function bootstrap() {
  const logger = new Logger('Boostrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Blog-Test')
    .setDescription('The blog test')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  logger.log('Swagger corriendo en /api');
  logger.log(`Servidor corriendo en el puerto ${process.env.PORT || 3001}`);
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
