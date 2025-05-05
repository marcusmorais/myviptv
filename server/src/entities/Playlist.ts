import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Channel } from "./Channel";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => User, user => user.playlists)
  user!: User;

  @OneToMany(() => Channel, channel => channel.playlist, {
    cascade: true, // Auto-salva canais ao salvar playlist
    onDelete: "CASCADE" // Remove canais quando playlist é deletada
  })
  channels!: Channel[];
}