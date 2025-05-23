import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../users/entities/User.entity";
import { Channel } from "../../channels/entities/Channel.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Playlist {
  @ApiProperty({ example: 'a1b2c3d4', description: 'ID único da playlist' })
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ApiProperty({ example: 'Filmes Premium', description: 'Nome da playlist' })
  @Column()
  name!: string;

  @ApiProperty({ example: '6327e6ef-338c-434b-9eca-1678590c01c2', description: 'Id do Usuario' })
  @Column()
  userId!: string;

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