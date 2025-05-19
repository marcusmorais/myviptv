
import { NestFactory } from '@nestjs/core';


import { ConfigModule, ConfigService } from '@nestjs/config';
//import { testConnection } from "./config/test-connection";
import { errorHandler } from './core/middlewares/error-handler';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

//Controllers
import { UserController } from './controllers/UserController';
import { ChannelController } from './controllers/ChannelController';
import { PlaylistController } from './controllers/PlaylistController';

//Entidades
import { User } from './entities/User';
import { Playlist } from "./entities/Playlist";
import { Channel } from "./entities/Channel";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Channel, Playlist]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type:  config.get<'postgres'>('DB_TYPE'),
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [User, Channel, Playlist], // Liste todas suas entidades aqui
        migrations: ["src/migrations/*{.ts,.js}"],
        synchronize: true, // Apenas para desenvolvimento!
        logging: true,
        subscribers: []
      }),
    }),
  ],
  controllers: [UserController, ChannelController, PlaylistController]
})
export class AppModule {}
export class UserModule {}
export class ChannelModule {}
export class PlaylistModule {}

console.log("Server running on http://localhost:3001");



async function bootstrap1() {
  const app = await NestFactory.create(AppModule, { logger: false });
  await app.listen(3001);
}
bootstrap1();

/*
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`ServerTS Server running on port ${PORT}`);
});
*/

//testConnection();
//AppDataSource.initialize()

  //.then(() => {
    //const app = express();
    // setupSwagger(app); 
    //app.use(express.json());
    //app.use("/api", router);
  //  app.listen(3001, () => {
    //  console.log("Server running on http://localhost:3001");
   // });
    //app.use(errorHandler);
  //})
 // .catch(console.error);



  