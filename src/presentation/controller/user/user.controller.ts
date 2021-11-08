import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IUserRepository } from 'src/domain/user/__interface__/user-repository-interface';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { UserRepository } from 'src/infrastructure/repository/user-repository';
import { FindAllUserUsecase } from 'src/usecase/user/find-all-user-usecase';
import { FindByIdUsecase } from 'src/usecase/user/find-by-id-usecase';
import { ResisterUserUsecase } from 'src/usecase/user/resister-user-usecase';
import { ResisterUserInputDto } from './__dto__/resister-user-input-dto';
import { UpdateUserInputDto } from './__dto__/update-user-input-dto';
import { UpdateUserUsecase } from '../../../usecase/user/update-user-usecase';
import { DeleteUserUsecase } from '../../../usecase/user/delete-user-usecase';

@Controller('user')
export class UserController {
  private prismaService: PrismaService = new PrismaService();
  private userRepository: IUserRepository = new UserRepository(
    this.prismaService,
  );

  // curl http://localhost:3001/user
  @Get()
  public async findAll() {
    try {
      const findAllUsecase = new FindAllUserUsecase(this.userRepository);
      return await findAllUsecase.do();
    } catch (error) {
      // 必要に応じてエラーケースをつくる
      Logger.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // curl http://localhost:3001/user/:id
  // curl http://localhost:3001/user/494785a7-b841-443f-ac2b-4ecd22cb438c
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    try {
      const findByIdUsecase = new FindByIdUsecase(this.userRepository);
      return await findByIdUsecase.do(id);
    } catch (error) {
      // 必要に応じてエラーケースをつくる
      Logger.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // curl http://localhost:3001/user -X POST -d "name=名前&email=aaa@gmail.com"
  @Post()
  public async resister(@Body() dto: ResisterUserInputDto) {
    try {
      const resisterUserUsecase = new ResisterUserUsecase(this.userRepository);
      await resisterUserUsecase.do(dto);
    } catch (error) {
      // 必要に応じてエラーケースをつくる
      Logger.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // curl http://localhost:3001/user/494785a7-b841-443f-ac2b-4ecd22cb438c -X PUT -d "name=Alice2&email=xxx5@gmail.com"
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserInputDto,
  ) {
    try {
      const updateUserUsecase = new UpdateUserUsecase(this.userRepository);
      await updateUserUsecase.do(dto, id);
    } catch (error) {
      // 必要に応じてエラーケースをつくる
      Logger.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // curl http://localhost:3001/user/5a08092f-d50f-4cb1-ba86-27438e17f601 -X DELETE
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    try {
      const deleteUserUsecase = new DeleteUserUsecase(this.userRepository);
      await deleteUserUsecase.do(id);
    } catch (error) {
      // 必要に応じてエラーケースをつくる
      Logger.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
