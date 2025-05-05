import { IsString, IsUrl, IsOptional, IsBoolean } from "class-validator";

export class CreateChannelDto {
  @IsString()
  name!: string;

  @IsUrl()
  url!: string;

  @IsOptional()
  @IsString()
  tvgId?: string;

  @IsOptional()
  @IsString()
  tvgLogo?: string;

  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;
}