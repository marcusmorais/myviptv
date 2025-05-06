import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Channel } from "../entities/Channel";
import { CreateChannelDto } from "../dtos/CreateChannel.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Channels')
//@Controller('playlists/:playlistId/channels')
export class ChannelController {
 // @Post()
  @ApiOperation({ summary: 'Adiciona canal à playlist' })
  @ApiParam({ name: 'playlistId', description: 'ID da playlist' })
  @ApiBody({ type: CreateChannelDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Canal criado com sucesso',
    type: Channel 
  })
  async addToPlaylist(req: Request, res: Response) {
    const { playlistId } = req.params;
    const channelData: CreateChannelDto = req.body;
    
    const channel = await AppDataSource.getRepository(Channel).save({
      ...channelData,
      playlist: { id: playlistId }
    });
    
    return res.status(201).json(channel);
  }

  async listByPlaylist(req: Request, res: Response) {
    const { playlistId } = req.params;
    const channels = await AppDataSource.getRepository(Channel).find({
      where: { playlist: { id: playlistId } },
      order: { name: "ASC" }
    });
    res.json(channels);
  }
}