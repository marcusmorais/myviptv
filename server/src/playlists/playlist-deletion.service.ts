
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './entities/Playlist.entity';
import { ChannelService } from '../channels/channel.service';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class PlaylistDeletionService {
    constructor(
        @InjectRepository(Playlist)
        private playlistRepository: Repository<Playlist>,
        private channelsService: ChannelService
    ) { }

    async deletePlaylistWithChannels(playlistId: string, userId: string): Promise<void> {
        try {


            const playlist = await this.playlistRepository.findOne({
                where: { id: playlistId, userId },
            });

            if (!playlist) {
                throw new NotFoundException('Playlist not found or does not belong to user');
            }

            await this.channelsService.deleteAllChannelsFromPlaylist(playlistId, userId);
            console.log('Channels deleted successfully');

            await this.playlistRepository.delete(playlistId);
            console.log('Playlist deleted successfully');



        } catch (error) {


            // Já tratados anteriormente
            if (error instanceof BadRequestException || error instanceof NotFoundException) {
                throw error;
            }

            // Verificação segura do tipo
            if (error instanceof Error && error.message.includes('invalid input syntax for type uuid')) {
                throw new BadRequestException('Invalid user ID format');
            }

            // Qualquer outro erro → 500
            console.error('Unexpected error:', error);
            throw new InternalServerErrorException('Failed to delete playlist');
        }
    }
}