import { Controller, Get, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { CreateUserDto } from '../dtos/CreateUser.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
   constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new user / Criar novo usuario' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'User created succesfully / Usuario criado com sucesso',
    type: User 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid data / Dados invalidos' 
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error / Erro interno do servidor'
  })

  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);

    } catch (error) {
      //if (error.code === '23505') { // Violação de constraint única (email duplicado)
      //  throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
     // }
      throw new HttpException(
        'Erro ao criar usuário', 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  

 @Get()
 @ApiOperation({ summary: 'List all users / Lista todos os users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User list returned / Lista de users retornada',
    type: [User]
  }) 
  async list(): Promise<User[]> {
    return this.userRepository.find();
  }
}


