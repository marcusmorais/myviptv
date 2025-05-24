import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './entities/Channel.entity';
import { CreateChannelDto } from './dto/create.channel.dto';

@Injectable()
export class ChannelService {
  constructor(
      @InjectRepository(Channel)
      private channelRepository: Repository<Channel>
    ) {}

  async create(CreateChannelDto: CreateChannelDto) {
    try {
        const channel = this.channelRepository.create(CreateChannelDto);
        return await this.channelRepository.save(channel);

    } catch (error) {
      //if (error.code === '23505') { // Violação de constraint única (email duplicado)
      //  throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
     // }
      //throw new HttpException(
        //'Erro ao criar usuário', 
        //HttpStatus.INTERNAL_SERVER_ERROR
      //);
      console.log('Erro ao gravar registro service.')
    }
  }

  async list(): Promise<Channel[]> {
    return this.channelRepository.find();
  }
}