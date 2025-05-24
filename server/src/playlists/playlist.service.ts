import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './entities/Playlist.entity';
import { CreatePlaylistDto } from './dto/create.playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(
      @InjectRepository(Playlist)
      private playlistRepository: Repository<Playlist>
    ) {}

  async create(createPlaylistDto: CreatePlaylistDto) {
    try {
        const playlist = this.playlistRepository.create(createPlaylistDto);
        return await this.playlistRepository.save(playlist);

    } catch (error) {
      //if (error.code === '23505') { // Violação de constraint única (email duplicado)
      //  throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
     // }
      //throw new HttpException(
        //'Erro ao criar usuário', 
        //HttpStatus.INTERNAL_SERVER_ERROR
      //);
      console.log('Erro ao gravar registro service.')
    }
  }

  async list(): Promise<Playlist[]> {
    return this.playlistRepository.find();
  }
}