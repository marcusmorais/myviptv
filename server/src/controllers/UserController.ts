import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  @Post()
  @ApiOperation({ summary: 'Cria novo user' })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuario criado com sucesso',
    type: User 
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })

  async create(req: Request, res: Response) {
    try {
        const { email, name } = req.body;
        const user = await AppDataSource.getRepository(User).save({
        email,
        name
      });
      res.statusCode = 201;
      res.json(user);

    } catch (error) {
      res.statusCode = 400;
      console.error("Falha ao inserir novo user.");
      res.json([]);
    }
  }
  

 @Get()
 @ApiOperation({ summary: 'Lista todos os users' })
  @ApiResponse({
    status: 200,
    description: 'Lista de users retornada',
    type: [User]
  })
  async list(req: Request, res: Response) {
    const users = await AppDataSource.getRepository(User).find({});
    res.statusCode = 200;
    res.json(users);
  }
}


