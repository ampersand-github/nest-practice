import { Injectable } from '@nestjs/common/decorators/core';
import { IUserRepository } from 'src/domain/user/__interface__/user-repository-interface';
import { User } from 'src/domain/user/user';
import { UserId } from 'src/domain/user/user-id';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()

/* eslint-disable */
export class UserRepository implements IUserRepository {
  public constructor(readonly prismaService: PrismaService) {}

  delete(user: User): Promise<void> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve([]);
  }

  findById(userId: UserId): Promise<User | null> {
    return Promise.resolve(undefined);
  }

  register(user: User): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(user: User): Promise<void> {
    return Promise.resolve(undefined);
  }
}
