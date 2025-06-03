import { Controller, Get, Post, Delete, Body, Param, UseFilters, HttpStatus, Query, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlaylistService } from "./playlist.service";
import { CreatePlaylistDto } from './dto/create.playlist.dto';
import { PlaylistDeletionService } from './playlist-deletion.service';


@Controller('playlists')
@ApiTags('Playlists')
@UseFilters(HttpExceptionFilter)
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService,
    private playlistDeletionService: PlaylistDeletionService
  ) { }

  @ApiOperation({ summary: 'Cria um nova playlist / Create new playlist' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Playlist criada com sucesso / Playlist created successfully',
    type: CreatePlaylistDto
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error / Erro interno do servidor'
  })
  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto) {
    try {

      return this.playlistService.create(createPlaylistDto);

    } catch (error) {

      console.log('Erro ao criar playlist ctlr')
    }
  }

  @ApiOperation({ summary: 'List all playlists / Lista todas as playlists' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Playlist list returned / Playlists retornadas',
    type: [CreatePlaylistDto]
  })
  @Get()
  async list() {
    return this.playlistService.list();
  }

  @ApiOperation({ summary: 'Find playlists by userid / Lista playlists por usuario' })
  @Get('byuser/:userId')
  @ApiParam({ name: 'userId', type: String, description: 'ID do usuário' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User returned / User retornado',
    type: [CreatePlaylistDto]
  })
  async listByUserId(@Param('userId') userId: string) {
    return this.playlistService.findByUserId(userId);
  }

  @ApiOperation({ summary: 'Delete playlist / Deleta playlists por usuario' })
  @ApiParam({ name: 'playlistId', description: 'ID da playlist' })
  @ApiQuery({ name: 'userId', type: String, required: true })
  @Delete('/:playlistId')
  async deletePlaylist(@Param('playlistId') playlistId: string,
    @Query('userId') userId: string
  ) {
    try {

      await this.playlistDeletionService.deletePlaylistWithChannels(playlistId, userId);

      return { message: 'Playlist and associated channels deleted successfully' };

    } catch (error) {

      console.log('Erro ao deletar playlist ctlr')
      // Já tratados anteriormente
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to retrieve playlists');
    }
  }
}


