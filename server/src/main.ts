// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule,  { logger: ['debug', 'error', 'log', 'verbose', 'warn'] });
  console.log(`🚀 AppModule created!`);

   // Define o prefixo global
  app.setGlobalPrefix('myiptv-service/v1');

  // Registra o filtro global
  app.useGlobalFilters(new HttpExceptionFilter());

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('MyVIP TV API')
    .setDescription('API para gerenciamento de playlists e canais')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('myiptv-service/v1/swagger', app, document);

  await app.listen(3001);

  console.log(`🚀 Server running on ${await app.getUrl()}`);
  
  
  console.log('=====================');
  console.log(`Swagger UI: http://localhost:3001/api`);

}
bootstrap();