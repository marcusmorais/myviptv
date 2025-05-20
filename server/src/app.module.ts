import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/User.entity';
import { UserController } from './users/users.controller';
//import { UsersModule } from './users/users.module';
//import { User } from './users/entities/User.entity';
//import { ChannelsModule } from './channels/channels.module';
//import { PlaylistsModule } from './playlists/playlists.module';

//Controllers
/*
import { UserController } from './users/users.controller';
import { ChannelController } from './controllers/ChannelController';
import { PlaylistController } from './controllers/PlaylistController';

//Entidades
import { User } from './users/entities/User';
import { Playlist } from "./entities/Playlist";
import { Channel } from "./entities/Channel";
*/

/*
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Channel, Playlist]), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<'postgres'>('DB_TYPE'),
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [__dirname + '/**/
        //*.entity{.ts,.js}'],
        //migrations: ["src/migrations/*{.ts,.js}"], //
        //synchronize: true,
        //logging: true,
        //subscribers: [] //
      //}),
    //}),
  //  UsersModule 
    //,
   // ChannelsModule,
   // PlaylistsModule,
 // ],
//})
//export class AppModule {}


@Module({
  imports: [
    ConfigModule.forRoot(),
    //TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        //entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //entities: ["src/users/entities/*{.ts,.js}"],
        //entities: [User],
        synchronize: true,
        logging: true
        //migrations: ["src/migrations/*{.ts,.js}"], 
      }), 
      inject: [ConfigService]
    })
    //,
    //UsersModule
    //ChannelsModule,
   // PlaylistsModule,
  ],
})
export class AppModule {}