import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Playlist } from "../entities/Playlist";
import { Channel } from "../entities/Channel";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "example",
  database: process.env.DB_NAME || "myviptv",
  synchronize: true,
  logging: false,
  entities: [User, Playlist, Channel],
  migrations: ["src/migrations/*{.ts,.js}"],
  subscribers: [],
});

