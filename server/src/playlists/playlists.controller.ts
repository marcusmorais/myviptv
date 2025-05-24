import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlaylistService } from "./playlist.service";
import { CreatePlaylistDto } from './dto/create.playlist.dto';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto) {
     try {
        
        return this.playlistService.create(createPlaylistDto);

    } catch (error) {
      //if (error.code === '23505') { // Violação de constraint única (email duplicado)
      //  throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
     // }
      console.log ('Erro ao criar playlist ctlr')
    }
  }

 @Get()
  async list() {
    return this.playlistService.list();
  }
}


