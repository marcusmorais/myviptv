

import { Controller, Get, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from "../entities/Playlist";
import { CreatePlaylistDto } from '../dtos/CreatePlaylist.dto';

@ApiTags('Playlists')
@Controller('playlists')
export class PlaylistController {
  constructor(
      @InjectRepository(Playlist)
      private playlistRepository: Repository<Playlist>
    ) {}

  @Post()
  @ApiOperation({ summary: 'Create new playlist / Cria nova playlist' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Playlist created succesfully / Playlist criado com sucesso',
    type: Playlist 
  })
 @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid data / Dados invalidos' 
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error / Erro interno do servidor'
  })

  async create(@Body() createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
     try {
        const playlist = this.playlistRepository.create(createPlaylistDto);
        return await this.playlistRepository.save(playlist);

    } catch (error) {
      //if (error.code === '23505') { // Violação de constraint única (email duplicado)
      //  throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
     // }
      throw new HttpException(
        'Erro ao criar usuário', 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

 @Get()
 @ApiOperation({ summary: 'List all playlists / Lista todos as playlists' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Playlist returned / Lista retornada',
    type: [Playlist]
  }) 
  async list(): Promise<Playlist[]> {
    return this.playlistRepository.find();
  }
}


