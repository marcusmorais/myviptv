import { Router } from "express";
import { PlaylistController } from "./controllers/PlaylistController";
import { ChannelController } from "./controllers/ChannelController";

const router = Router();
const playlistController = new PlaylistController();
const channelController = new ChannelController();

router.post("/playlists", playlistController.create);
router.get("/playlists", playlistController.list);

router.post("/playlists/:playlistId/channels", channelController.addToPlaylist);
router.get("/playlists/:playlistId/channels", channelController.listByPlaylist);

export default router;