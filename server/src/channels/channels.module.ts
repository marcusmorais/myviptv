import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { Channel } from './entities/Channel.entity';
import { PlaylistsModule } from '../playlists/playlists.module'; // Adicione esta linha


@Module({
  imports: [TypeOrmModule.forFeature([Channel]), PlaylistsModule],
  controllers: [ChannelController],
  providers: [ChannelService],
  exports: [ChannelService]
})
export class ChannelsModule {}