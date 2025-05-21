import { Controller, Get, Post, Body, Param, UseFilters, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UserController {
  
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ 
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso',
    type: CreateUserDto
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @ApiOperation({ summary: 'List all users / Lista todos os users' })
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User list returned / Lista de users retornada',
    type: [CreateUserDto]
  }) 
  async list()  {
    return this.userService.list();
  }


}

/*
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

*/
