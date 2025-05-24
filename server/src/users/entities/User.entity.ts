import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Playlist } from "../../playlists/entities/Playlist.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string; // Note o '!' para evitar TS2564

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @OneToMany(() => Playlist, playlist => playlist.user)
  playlists!: Playlist[];
}