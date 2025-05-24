import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistController } from './playlists.controller';
import { PlaylistService } from './playlist.service';
import { Playlist } from './entities/Playlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService]
})
export class PlaylistsModule {}