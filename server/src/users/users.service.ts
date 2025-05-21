import { Injectable, ConflictException, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

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

    if (!user)    {
       throw new NotFoundException('Users not found');
    }

    //const user = await this.userRepository.findOne({ where: { id } });
   // if (!user) {
    //  throw new NotFoundException(`User with ID ${id} not found`);
   // }
    return user;
  }
}