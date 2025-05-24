import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Playlist } from "./Playlist";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Channel {

  @ApiProperty({ example: 'a1b2c3d4', description: 'ID único do canal' })
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @ApiProperty({ example: 'CNN', description: 'Nome do canal' })
  @Column()
  name!: string;
  
  @ApiProperty({ example: 'http://xyz.cc:80/zzzzz/aaaaa/90025.ts', description: 'URL do Canal' })
  @Column({ type: "text" })
  url!: string;

  // Metadados padrão M3U
  @ApiProperty({ example: 'NSCTV.br', description: 'tvgId do Canal' })
  @Column({ nullable: true }) 
  tvgId!: string;
  
  @ApiProperty({ example: 'CNN BRASIL [FHD]', description: 'tvgName do Canal' })
  @Column({ nullable: true }) 
  tvgName!: string;
  
  @ApiProperty({ example: 'http://xxx.cc/lives/NOTICIAS/CNN%20BRASIL.png', description: 'tvgLogo do Canal' })
  @Column({ nullable: true }) 
  tvgLogo!: string;
  
  @ApiProperty({ example: 'CANAIS | NOTICIAS', description: 'groupTitle do Canal' })
  @Column({ nullable: true }) 
  groupTitle!: string;

  // Relacionamento
  @ManyToOne(() => Playlist, playlist => playlist.channels)
  playlist!: Playlist;

  // Campos adicionais para controle
  @Column({ default: false })
  isFavorite!: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  // Índices para melhor performance
  @Column({ nullable: true })
  category!: string;

  @Column({ type: "jsonb", nullable: true })
  extra!: {
    country?: string;
    language?: string;
    bitrate?: number;
    resolution?: string;
  };
}