// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  console.log(`🚀 Starting bootstrap!`);
  const app = await NestFactory.create(AppModule,  { logger: ['debug', 'error', 'log', 'verbose', 'warn'] });
  console.log(`🚀 AppModule created!`);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('MyVIP TV API')
    .setDescription('API para gerenciamento de playlists e canais')
    .setVersion('1.0')
    .addTag('users')
    .addTag('playlists')
    .addTag('channels')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
  console.log(`🚀 Server running on ${await app.getUrl()}`);
  console.log(`Swagger UI disponível em: ${await app.getUrl()}/api`);



 // Log adicional para verificar as rotas
  const server = app.getHttpServer();
  const router = server._events.request._router;
  
  console.log('\n=== ROTAS MAPEADAS ===');
  console.log(router)
  
  
  console.log('=====================');
  console.log(`Swagger UI: http://localhost:3001/api`);

}
bootstrap();