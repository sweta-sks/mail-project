import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Aws Bot')
    .setDescription('Aws Bot APIs')
    .setVersion('1.0.0')
    .addBearerAuth()
    .setContact('Help', '', 'help@aws.com')
    .setTitle('Aws Bot API')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  await app.listen(4000);
}
bootstrap();
