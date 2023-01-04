import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('NestApplication')
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const configEnv = app.get(ConfigService)


  const configSawgger = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Transaction - Admin Management')
    .setDescription('Admin panel  - Admin document APIs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSawgger);
  SwaggerModule.setup('api', app, document);

  await app.listen(configEnv.get(`port`))
  logger.log(`App is running on: ${configEnv.get('appUrl')}:${configEnv.get('port')}`);
}
bootstrap();
