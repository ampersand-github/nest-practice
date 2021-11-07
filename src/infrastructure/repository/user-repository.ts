import { Injectable } from '@nestjs/common/decorators/core';
import { IUserRepository } from 'src/domain/user/interface/user-repository-interface';
import { User } from 'src/domain/user/user';
import { UserId } from 'src/domain/user/user-id';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '../../domain/post/post';
import { PostId } from 'src/domain/post/Post-id';
import { User as PrismaUser, Post as PrismaPost } from '@prisma/client';

export type PrismaUserAggregate = PrismaUser & { posts: PrismaPost[] };

@Injectable()
export class UserRepository implements IUserRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findById(userId: UserId): Promise<User | null> {
    const id: string = userId.toString();
    const data: PrismaUserAggregate = await this.prismaService.user.findUnique({
      where: { id: id },
      include: {
        posts: true,
      },
    });

    if (!data) {
      return null;
    }
    return this.userConverter(data);
  }

  public async findAll(): Promise<User[]> {
    const data: PrismaUserAggregate[] = await this.prismaService.user.findMany({
      include: { posts: true },
    });
    return data.map((one) => this.userConverter(one));
  }
  public async register(user: User): Promise<void> {
    try {
      await this.prismaService.user.create({
        data: {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      /*
      エラー周りの処理を必要に応じて記述していく
      https://www.prisma.io/docs/concepts/components/prisma-client/handling-exceptions-and-errors
      */
      throw error;
    }
  }
  public async update(user: User): Promise<void> {
    try {
      await this.prismaService.user.update({
        where: { id: user.id.toString() },
        data: {
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      /*
      エラー周りの処理を必要に応じて記述していく
      https://www.prisma.io/docs/concepts/components/prisma-client/handling-exceptions-and-errors
      */
      throw error;
    }
  }
  public async delete(user: User): Promise<void> {
    try {
      await this.prismaService.user.delete({
        where: { id: user.id.toString() },
      });
    } catch (error) {
      /*
      エラー周りの処理を必要に応じて記述していく
      https://www.prisma.io/docs/concepts/components/prisma-client/handling-exceptions-and-errors
      */
      throw error;
    }
  }

  private userConverter = (data: PrismaUserAggregate): User => {
    return User.restore(
      {
        name: data.name,
        email: data.email,
        posts: data.posts.map((one) => {
          return Post.restore(
            {
              title: one.title,
              content: one.content,
              published: one.published,
            },
            PostId.restore(one.id),
          );
        }),
      },
      UserId.restore(data.id),
    );
  };
}
