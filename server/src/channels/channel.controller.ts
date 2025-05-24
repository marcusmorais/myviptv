import { Controller, Get, Post, Delete, Body, Param, Query, UseFilters, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { CreateChannelDto } from './dto/create.channel.dto';
import { ChannelService } from "./channel.service";

@ApiTags('Channels')
@Controller('playlists/:playlistId/channels')
@UseFilters(HttpExceptionFilter)
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService
  ) { }

  @ApiOperation({ summary: 'Cria novos canais na playlist / Create new channels for playlist' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Canais criados com sucesso / Channels created successfully',
    type: CreateChannelDto
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error / Erro interno do servidor'
  })
  @ApiParam({ name: 'playlistId', description: 'ID da playlist' })
  @ApiQuery({ name: 'userId', type: String, required: true })
  @Post()
  async create(@Body() CreateChannelDto: CreateChannelDto, 
               @Param('playlistId') playlistId: string,
               @Query('userId') userId: string) {
    try {

      return this.channelService.create(CreateChannelDto,  playlistId, userId);

    } catch (error) {

      console.log('Erro ao criar canais ctlr')
    }
  }

  @ApiOperation({ summary: 'Deleta canais da playlist / Delete channels from playlist' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Canais excluidos com sucesso / Channels deleted successfully',
    type: CreateChannelDto
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error / Erro interno do servidor'
  })
  @ApiParam({ name: 'playlistId', description: 'ID da playlist' })
  @ApiQuery({ name: 'userId', type: String, required: true })
  @Delete()
  async deleteAllChannelsFromPlaylist(@Param('playlistId') playlistId: string,
                                      @Query('userId') userId: string) {
    try {

      return this.channelService.deleteAllChannelsFromPlaylist(playlistId, userId);

    } catch (error) {

      console.log('Erro ao criar canais ctlr')
    }
  }

  @ApiOperation({ summary: 'Deleta canal unico da playlist / Delete unique channel from playlist' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Canal excluido com sucesso / Channel deleted successfully',
    type: CreateChannelDto
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error / Erro interno do servidor'
  })
  @ApiParam({ name: 'playlistId', description: 'ID da playlist' })
  @ApiParam({ name: 'channelId', description: 'ID do Canal' })
  @ApiQuery({ name: 'userId', type: String, required: true })
  //@Controller('playlists/:playlistId/channels/:channelId')
  @Delete('/:channelId' )
  async deleteChannelsById(@Param('playlistId') playlistId: string,
                           @Query('userId') userId: string,
                           @Param('channelId') channelId: string,
  ) {
    try {

      return this.channelService.deleteChannelFromPlaylist(playlistId, userId, channelId);

    } catch (error) {

      console.log('Erro ao deletar canal ctlr')
    }
  }




  /*
    @Post()
    @ApiOperation({ summary: 'Adiciona canal à playlist' })
    @ApiParam({ name: 'playlistId', description: 'ID da playlist' })
    @ApiResponse({ 
      status: 201, 
      description: 'Canal criado com sucesso',
      type: Channel 
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    async addToPlaylist(
      @Param('playlistId') playlistId: string,
      @Body() body: {
        name: string;
        url: string;
        tvgId?: string;
        tvgName?: string;
        tvgLogo?: string;
        groupTitle?: string;
        isFavorite?: boolean;
        category?: string;
        extra?: string;
      }
    ) {
      this.logger.log(`Adicionando canal à playlist ${playlistId}`);
      
      try {
        const channel = await this.channelRepository.save({
          ...body,
          playlist: { id: playlistId }
        });
        
        return channel;
        
      } catch (error) {
        this.logger.error(`Erro ao adicionar canal: ${error.message}`);
        throw new HttpException('Erro ao criar canal', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  */
  @Get()
  @ApiOperation({ summary: 'List all channels / Lista canais da playlist' })
  @ApiParam({ name: 'playlistId', description: 'ID da playlist' })
  @ApiQuery({ name: 'userId', type: String, required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Channel list / Lista de canais',
    type: [CreateChannelDto]
  })
  async listByPlaylist(@Param('playlistId') playlistId: string,
    @Query('userId') userId: string) {

    return this.channelService.findByPlaylistId(playlistId, userId);



  }
}