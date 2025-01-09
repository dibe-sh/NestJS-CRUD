import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(ConfigService);

  const PORT = appConfig.get('PORT') ?? 7002;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest CRUD API')
    .setDescription('A simple CRUD API using NestJS and Postgres')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // Swagger Setup
  const documentFactory = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(
    'api',
    app,
    documentFactory,
    // Expose swagger.json if required
    //   {
    //   jsonDocumentUrl: 'swagger/json',
    // }
  );

  // CORS Prevention
  app.enableCors({
    // Currently Configured to be accessed by *, change as per required
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  // Custom Interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  // API Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(PORT);
  console.log(
    `Application running on port [${PORT}]\n http://localhost:${PORT}`,
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
