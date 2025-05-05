import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Playlist } from "./Playlist";

@Entity()
export class Channel {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ type: "text" })
  url!: string;

  // Metadados padrão M3U
  @Column({ nullable: true })
  tvgId!: string;

  @Column({ nullable: true })
  tvgName!: string;

  @Column({ nullable: true })
  tvgLogo!: string;

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