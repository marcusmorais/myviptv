import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ChannelsModule } from './channels/channels.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { I18nService } from './core/services/i18n.service';






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
        providers: [I18nService],
        exports: [I18nService],
      }),
      inject: [ConfigService],

    })
    , UsersModule,
    ChannelsModule,
    PlaylistsModule,
  ],
})
export class AppModule { }