import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User mail / Email do usuário' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'Marcos Silva', description: 'User name / Nome do usuário', minLength: 3, maxLength: 100 })
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  name!: string;
}