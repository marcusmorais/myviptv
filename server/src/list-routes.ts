import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RouterModule } from '@nestjs/core/router';

async function listRoutes() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const router = app.get(RouterModule);
  
  //const routes = router.getRoutes();
  console.log('=== ROTAS MAPEADAS ===');
 // routes.forEach(route => {
    //console.log(`${route.methods.join(', ')} ${route.path}`);
 // });
  console.log('=====================');
  
  await app.close();
}

listRoutes();