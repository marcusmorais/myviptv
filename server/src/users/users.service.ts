import { Injectable, ConflictException, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { ValidatorError} from '../common/validates';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  validador = new ValidatorError;

  async create(createUserDto: CreateUserDto): Promise<User> {

    try {
      // Verifica se usuário já existe
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      console.log('email: ' + createUserDto.email)

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);

    } catch (error) {
      //if (error.code === '23505') { // PostgreSQL duplicate key
      throw new ConflictException('User with this email already exists.');
      // }
      //  throw error;
    }

  }


  async list(): Promise<User[]> {

    const user = await this.userRepository.find();

    if (!user) {
      throw new NotFoundException('Users not found');
    }

    return user;
  }

  async findOneById(userId: string): Promise<User> {
   
    try {

      if (!this.validador.isValidUUID(userId)) {
              throw new BadRequestException('Invalid UUID format');
            }

      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException(`No user found for id ${userId}`);
      }

      return user;

    } catch (error) {

      // Já tratados anteriormente
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      // Verificação segura do tipo
      if (error instanceof Error && error.message.includes('invalid input syntax for type uuid')) {
        throw new BadRequestException('Invalid user ID format');
      }

      // Qualquer outro erro → 500
      console.error('Unexpected error:', error);
      throw new InternalServerErrorException('Failed to retrieve playlists');

    }
    

  }
}