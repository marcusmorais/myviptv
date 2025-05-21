import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/entities/User.entity';
import { UserController } from './users/users.controller';
import { UsersModule } from './users/users.module';

import { Channel } from "./channels/entities/Channel.entity";
import { ChannelController } from './channels/channel.controller';
import { ChannelsModule } from './channels/channels.module';


import { Playlist } from "./playlists/entities/Playlist.entity";
import { PlaylistsModule } from './playlists/playlists.module';
import { PlaylistController } from './playlists/playlists.controller';



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
    //TypeOrmModule.forFeature([User, Playlist]),
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
       // entities: ["src/users/entities/*{.ts,.js}"],
        //entities: [User],
        synchronize: true,
        logging: true,
        autoLoadEntities: true, // Adicione esta linha
        //migrations: ["src/migrations/*{.ts,.js}"], 
      }), 
      inject: [ConfigService]
    })
    ,UsersModule,
    ChannelsModule,
    PlaylistsModule,
  ],
})
export class AppModule {}