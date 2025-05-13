import { Router } from "express";
import { PlaylistController } from "./controllers/PlaylistController";
import { ChannelController } from "./controllers/ChannelController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const playlistController = new PlaylistController();
const channelController = new ChannelController();

router.post("/users", userController.create);
router.get("/users", userController.list);

router.post("/playlists", playlistController.create);
router.get("/playlists", playlistController.list);

//router.post("/playlists/:playlistId/channels", channelController.addToPlaylist);
router.get("/playlists/:playlistId/channels", channelController.listByPlaylist);

export default router;