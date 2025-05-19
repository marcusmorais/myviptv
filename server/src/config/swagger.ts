import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MyVIPTV API',
      version: '1.0.0',
      description: 'API para gerenciamento de playlists IPTV'
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
        description: 'Servidor Local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: [],
  paths: [
    path.join( 'C:\Users\Marcus\myviptv\server\src\routes.ts'),
    path.join( 'C:\Users\Marcus\myviptv\server\src\controllers\*.ts'),
    path.join( 'C:\Users\Marcus\myviptv\server\src\entities\*.ts'),
    path.join( 'C:\Users\Marcus\myviptv\server\src\dtos\*.ts'),
    path.join( '../controllers/*.ts'),
    path.join( '../entities/*.ts'),
    path.join( '../dtos/*.ts')
  ]// Caminho para os controllers
};

export const setupSwagger = (app: Express) => {
  try {
    const specs = swaggerJsdoc(options);
    //specs.
    // Middleware para logar erros na geração do Swagger
    //if (!specs?.paths || Object.keys(specs.paths).length === 0) {
     // console.warn('⚠️ Nenhuma rota foi documentada. Verifique:');
     // console.warn('1. Se os arquivos estão nos caminhos especificados');
    //  console.warn('2. Se os decorators @swagger estão corretos');
     // console.warn('Caminhos verificados:', options.apis);
   // }
   
   console.log ('path: '  );

    // Rota JSON
    app.get('/api-docs-json', (req, res) => {
      res.json(specs);
    });

    // UI do Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    console.log('📄 Swagger UI disponível em http://localhost:3001/api-docs');
  } catch (error) {
    console.error('❌ Erro ao configurar Swagger:', error);
  }
};