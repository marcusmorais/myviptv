import { Controller, Get, Post, Body, Param, UseFilters, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@Controller('users')
@ApiTags('Users')
@UseFilters(HttpExceptionFilter)
export class UserController {

  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Cria um novo usuário / Create new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso / User created successfully',
    type: CreateUserDto
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error / Erro interno do servidor'
  })
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
  async list() {
    return this.userService.list();
  }

  @ApiOperation({ summary: 'Find unique user by Id / Lista user unico por Id' })
  @Get(':userId')
  @ApiParam({ name: 'userId', type: String, description: 'ID do usuário' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User returned / User retornado',
    type: [CreateUserDto]
  })
  async listById(@Param('userId') userId: string) {
    return this.userService.findOneById(userId);
  }

}
