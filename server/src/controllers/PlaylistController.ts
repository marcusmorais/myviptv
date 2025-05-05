import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Playlist } from "../entities/Playlist";

export class PlaylistController {
  async create(req: Request, res: Response) {
    const { name, userId } = req.body;
    const playlist = await AppDataSource.getRepository(Playlist).save({
      name,
      user: { id: userId }
    });
    res.json(playlist);
  }

  async list(req: Request, res: Response) {
    const playlists = await AppDataSource.getRepository(Playlist).find({
      relations: ["channels"]
    });
    res.json(playlists);
  }
}