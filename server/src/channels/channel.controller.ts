import { Controller, Get, Post, Body, Param, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create.channel.dto';
import { Channel } from './entities/Channel.entity';

@ApiTags('Channels')
@Controller('playlists/:playlistId/channels')
export class ChannelController {
private readonly logger = new Logger(ChannelController.name)
constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>
  ) {} 
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
  @ApiResponse({ 
     status: HttpStatus.OK,
    description: 'Channel list / Lista de canais',
    type: [Channel] 
  })
  async listByPlaylist(@Param('playlistId') playlistId: string) {
    //this.logger.log(`Buscando canais para playlist ${playlistId.toString}`);
    
  
    playlistId = '0fa3a657-495a-4f66-956a-88a60788e3cf';
    console.log(`Buscando canais para playlist ${playlistId}`);

    try {
      
   
      return this.channelRepository.find({ 
        where: { playlist: { id: playlistId } },
        order: { name: "ASC" }
        });

       console.log(`passou 1`);
      //this.channelRepository.createQueryBuilder()
      
      /*
      if (!channels.length) {
        console.log(`passou x`);
        this.logger.warn(`Nenhum canal encontrado para playlist ${playlistId}`);
        throw new HttpException(
          'Nenhum canal encontrado', 
          HttpStatus.NOT_FOUND
        );
      }
  */
      HttpStatus.OK
      console.log(`passou 2`);
      
     // return channels;
      
    } catch (error) {
         console.log(`erro  1`);
        const errorMessage = error instanceof Error ? error.stack : JSON.stringify(error);
      //  this.logger.error(`Falha na busca para playlistId ${playlistId}: ${errorMessage}`);
      console.log(`Falha na busca para playlistId ${playlistId}: ${errorMessage}`);
        throw new HttpException('Erro interno', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}