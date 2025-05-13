import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Playlist } from "../entities/Playlist";
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Playlists')
@Controller('playlists')
export class PlaylistController {
  @Post()
  @ApiOperation({ summary: 'Cria nova playlist' })
  @ApiResponse({ 
    status: 201, 
    description: 'Playlist criada com sucesso',
    type: Playlist 
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })

  async create(req: Request, res: Response) {
    const { name, userId } = req.body;
    const playlist = await AppDataSource.getRepository(Playlist).save({
      name,
      user: { id: userId }
    });
    ///res.json(playlist);
    return res.status(201).json(playlist);
  }

 @Get()
 @ApiOperation({ summary: 'Lista todas as playlists de todos users' })
  @ApiResponse({
    status: 200,
    description: 'Lista de playlists retornada',
    type: [Playlist]
  })
  async list(req: Request, res: Response) {
    const playlists = await AppDataSource.getRepository(Playlist).find({
      relations: ["channels"]
    });
    res.json(playlists);
  }
}


