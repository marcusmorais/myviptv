import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Channel } from "../entities/Channel";
import { CreateChannelDto } from "../dtos/CreateChannel.dto";

export class ChannelController {
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