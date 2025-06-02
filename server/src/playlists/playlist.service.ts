import { Injectable, ConflictException, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './entities/Playlist.entity';
import { CreatePlaylistDto } from './dto/create.playlist.dto';
import { ValidatorError } from '../common/validates';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    public playlistRepository: Repository<Playlist>
  ) { }

  validador = new ValidatorError;

  async create(createPlaylistDto: CreatePlaylistDto) {
    try {
      const playlist = this.playlistRepository.create(createPlaylistDto);
      return await this.playlistRepository.save(playlist);

    } catch (error) {

      console.log('Erro ao gravar registro service.')
      throw new ConflictException('Erro ao salvar nova playlist.');
    }
  }

  async list(): Promise<Playlist[]> {
    const playlist = await this.playlistRepository.find();

    if (!playlist) {
      throw new NotFoundException('Playlists not found');
    }

    return playlist
  }

  async findByUserId(userId: string): Promise<Playlist[]> {

    try {


      if (!this.validador.isValidUUID(userId)) {
        throw new BadRequestException('Invalid UUID format');
      }

      const playlists = await this.playlistRepository.find({
        where: { userId: userId },
      });

      if (playlists.length == 0) {
        throw new NotFoundException(`No playlists found for user ${userId}`);
      }

      return playlists;

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
      throw new InternalServerErrorException('Failed to retrieve playlists');
    }
  }

  async checkPlaylistIdExists(playlistId: string, userId: string): Promise<boolean> {

    var validacao: boolean = true;

    // Primeiro verifica se é um UUID válido
    if (!this.validador.isValidUUID(playlistId)) {
      //throw new BadRequestException('Invalid playlist ID format playlistId');
      validacao = false;
    }

    if (!this.validador.isValidUUID(userId)) {
      // throw new BadRequestException('Invalid playlist ID format userId');
      validacao = false;
    }

    const playlists = await this.playlistRepository.find({
      where: { userId: userId },
      select: ['id'] // Apenas buscamos os IDs para melhor performance
    });

    // Verifica se existe alguma playlist com o ID especificado
    const exists = playlists.some(playlist => playlist.id === playlistId);

    if (!exists) {
      // throw new NotFoundException(`Playlist with ID ${playlistId} not found for this user!`);
      validacao = false;
    }

    console.log('Validacao: ' + validacao)

    return validacao;
  }
}