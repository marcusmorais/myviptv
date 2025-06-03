import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistController } from './playlists.controller';
import { PlaylistService } from './playlist.service';
import { Playlist } from './entities/Playlist.entity';
import { ChannelsModule } from '../channels/channels.module';
import { PlaylistDeletionService } from './playlist-deletion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), forwardRef(() => ChannelsModule)],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistDeletionService],
  exports: [PlaylistService, PlaylistDeletionService]
})
export class PlaylistsModule {}