import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @ApiProperty({ example: 'Minha PLaylist', description: 'Playlist name / Nome da PLaylist', minLength: 3, maxLength: 500 })
  @IsString()
  @Length(3, 500)
  name!: string;

  @ApiProperty({ example: '0007e6ef-338c-434b-9eca-1678590c01c2', description: 'User Id / Id do Usuario' })
  @IsString()
  userId!: string;
}