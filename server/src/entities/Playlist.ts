import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Channel } from "./Channel";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Playlist {
  @ApiProperty({ example: 'a1b2c3d4', description: 'ID único da playlist' })
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ApiProperty({ example: 'Filmes Premium', description: 'Nome da playlist' })
  @Column()
  name!: string;

  @ManyToOne(() => User, user => user.playlists)
  user!: User;
 
  @ApiProperty({ 
    type: () => [Channel],
    description: 'Canais da playlist' 
  })
  @OneToMany(() => Channel, channel => channel.playlist, {
    cascade: true, // Auto-salva canais ao salvar playlist
    onDelete: "CASCADE" // Remove canais quando playlist é deletada
  })
  channels!: Channel[];
}