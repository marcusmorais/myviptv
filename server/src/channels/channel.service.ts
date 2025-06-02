import { Injectable, ConflictException, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Channel } from './entities/Channel.entity';
import { CreateChannelDto } from './dto/create.channel.dto';
import { ValidatorError } from '../common/validates';
import { PlaylistService } from '../playlists/playlist.service';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
    private playlistService: PlaylistService
  ) { }

  validador = new ValidatorError;

  async create(CreateChannelDto: CreateChannelDto, playlistId: string, userId: string) {
    try {


      //valida se user eh dono da playlist selecionada
      const playlist = await this.playlistService.checkPlaylistIdExists(playlistId, userId)

      if (playlist == false) {

        throw new NotFoundException(`Playlist with ID ${playlistId} not found for this user`);
      }

      const channel = this.channelRepository.create(CreateChannelDto);
      
      return await this.channelRepository.save(channel);

    } catch (error) {

      console.log('Erro ao gravar registro service.')
      throw new ConflictException('Erro ao salvar novo canal.');
    }
  }

  async list(): Promise<Channel[]> {
    return this.channelRepository.find();
  }

  async findByPlaylistId(playlistId: string, userId: string): Promise<Channel[]> {

    try {

      if (!this.validador.isValidUUID(userId)) {
        throw new BadRequestException('Invalid UUID format for userId');
      }

      if (!this.validador.isValidUUID(playlistId)) {
        throw new BadRequestException('Invalid UUID format for playlistId');
      }

      //valida se user eh dono da playlist selecionada
      const playlist = await this.playlistService.checkPlaylistIdExists(playlistId, userId)

      console.log('retorno check: ' + playlist)

      if (playlist == false) {

        throw new NotFoundException(`Playlist with ID ${playlistId} not found for this user`);
      }

      const channels = await this.channelRepository.find({
        where: { playlistId: playlistId },
      });

      if (channels.length == 0) {

        throw new NotFoundException(`No channels found for playlist ${playlistId}`);

      }


      return channels;

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
      throw new InternalServerErrorException('Failed to retrieve data');


    }


  }

  async deleteAllChannelsFromPlaylist(playlistId: string, userId: string): Promise<DeleteResult> {

    try {

      if (!this.validador.isValidUUID(userId)) {
        throw new BadRequestException('Invalid UUID format for userId');
      }

      if (!this.validador.isValidUUID(playlistId)) {
        throw new BadRequestException('Invalid UUID format for playlistId');
      }

      //valida se user eh dono da playlist selecionada
      const playlist = await this.playlistService.checkPlaylistIdExists(playlistId, userId)

      if (playlist == false) {

        throw new NotFoundException(`Playlist with ID ${playlistId} not found for this user`);
      }

      const deleteResult = await this.channelRepository.delete({
        playlistId: playlistId
      });

      // Método alternativo: Usando query builder (para mais controle)
      // const deleteResult = await this.channelRepository
      //   .createQueryBuilder()
      //   .delete()
      //   .where("playlistId = :playlistId", { playlistId })
      //   .execute();

      if (deleteResult.affected === 0) {
        throw new NotFoundException(`No channels found for playlist ${playlistId}`);
      }

      return deleteResult;

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
      throw new InternalServerErrorException('Failed to delete channels');
    }
  }

  async deleteChannelFromPlaylist(playlistId: string, userId: string, channeltId: string): Promise<DeleteResult> {

    try {

      if (!this.validador.isValidUUID(channeltId)) {
        throw new BadRequestException('Invalid UUID format for channeltId');
      }

      if (!this.validador.isValidUUID(userId)) {
        throw new BadRequestException('Invalid UUID format for userId');
      }

      if (!this.validador.isValidUUID(playlistId)) {
        throw new BadRequestException('Invalid UUID format for playlistId');
      }

      //valida se user eh dono da playlist selecionada
      const playlist = await this.playlistService.checkPlaylistIdExists(playlistId, userId)

      if (playlist == false) {

        throw new NotFoundException(`Playlist with ID ${playlistId} not found for this user`);
      }

      const deleteResult = await this.channelRepository.delete({
        id: channeltId,
        playlistId: playlistId
      });

      // Método alternativo: Usando query builder (para mais controle)
      // const deleteResult = await this.channelRepository
      //   .createQueryBuilder()
      //   .delete()
      //   .where("playlistId = :playlistId", { playlistId })
      //   .execute();

      if (deleteResult.affected === 0) {
        throw new NotFoundException(`No channels found for playlist ${playlistId}`);
      }

      return deleteResult;

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
      throw new InternalServerErrorException('Failed to delete channels');
    }
  }
}