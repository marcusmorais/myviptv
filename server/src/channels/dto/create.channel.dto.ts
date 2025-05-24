import { IsString, IsUrl, IsOptional, IsBoolean } from "class-validator";
import {  ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto {
  @IsString()
  @ApiProperty({
    example: 'HBO HD',
    description: 'Nome do canal',
    required: true
  })
  name!: string;

  @IsUrl()
  @ApiProperty({
    example: 'https://exemplo.com/stream.m3u8',
    description: 'URL do stream do canal',
    required: true
  })
  url!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'hbo_hd',
    description: 'ID do canal na EPG',
    required: false
  })
  tvgId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'https://exemplo.com/logo.png',
    description: 'URL do logo do canal',
    required: false
  })
  tvgLogo?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Se o canal é favorito',
    required: false,
    default: false
  })
  isFavorite?: boolean;
}