import { UserId } from 'src/domain/user/user-id';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { PrismaUserAggregate, UserRepository } from '../user-repository';
import { User } from 'src/domain/user/user';
import { truncateAllTable } from './__shared__/truncate-all-table';
import { registerSeed } from 'prisma/seed';
import { userSeed1 } from 'prisma/seed-data/user';
import { IUserDomain } from '../../../domain/user/__interface__/user-domain-interface';

const userDummyData: PrismaUserAggregate = {
  id: '40bfaf83-c306-4b6e-bda4-a74f2f8b9002',
  email: 'taro@prisma.io',
  name: 'Taro',
  posts: [
    {
      id: '69188d70-3f9d-4919-bcb8-d0016bcfc435',
      title: 'Check out Prisma with Next.js',
      content: 'https://www.prisma.io/nextjs',
      published: true,
      authorId: '40bfaf83-c306-4b6e-bda4-a74f2f8b9002',
    },
  ],
};

describe('UserRepository', () => {
  const prismaService = new PrismaService();
  const userRepository = new UserRepository(prismaService);

  beforeAll(async () => {
    await truncateAllTable(prismaService);
  });

  beforeEach(async () => {
    await truncateAllTable(prismaService);
    await registerSeed(prismaService);
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });

  describe('findById', () => {
    it('IDが一致するユーザーを取得できること', async () => {
      const oneUser = await prismaService.user.findFirst();
      const userId = UserId.restore(oneUser.id.toString());
      const actual: User = await userRepository.findById(userId);
      expect(actual).toEqual(expect.any(User));
    });
    it('IDが一致するユーザーがいなければNULLを返すこと', async () => {
      // 初期データはuuidでつくっているので、uuidにならないidは存在しない。ので適当な値を使って存在しないIdクラスを作り出す
      const userId = UserId.restore('aaa');
      const actual = await userRepository.findById(userId);
      expect(actual).toBeNull();
    });
  });

  describe('findAll', () => {
    it('ユーザーを全件取得できること', async () => {
      const count = await prismaService.user.count();
      const actual: User[] = await userRepository.findAll();
      expect(actual.length).toEqual(count);
    });
  });

  describe('register', () => {
    it('ユーザーを作成できること', async () => {
      const user: User = await userRepository['userConverter'](userDummyData);
      const beforeCount = await prismaService.user.count();
      await userRepository.register(user);
      const afterCount = await prismaService.user.count();
      const actual = await prismaService.user.findUnique({
        where: { id: user.id.toString() },
      });
      expect(beforeCount).toEqual(afterCount - 1); // 1件増えているはず
      expect(actual.id).toEqual(user.id.toString());
      expect(actual.name).toEqual(user.name);
      expect(actual.email).toEqual(user.email);
    });
    it('既にIDがあるので新規作成できないこと', async () => {
      const alreadyExistUser = await userRepository['userConverter']({
        ...userDummyData,
        id: userSeed1.id,
      });
      const resister = async () => {
        await userRepository.register(alreadyExistUser);
      };
      await expect(resister).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('ユーザーを更新できること', async () => {
      // userSeed1の名前を変更して更新
      const updatedName = 'update';
      const updateId: UserId = UserId.restore(userSeed1.id);
      const updateProps: IUserDomain = {
        name: updatedName,
        email: userSeed1.email,
      };
      const updatedUser = User.restore(updateProps, updateId);

      await userRepository.update(updatedUser);
      const actual = await prismaService.user.findUnique({
        where: { id: updatedUser.id.toString() },
      });

      expect(actual.name).toEqual(updatedName);
      expect(actual.name).not.toEqual(userSeed1.name);
    });
    it('idが一致しない場合更新できないこと', async () => {
      // userSeed1の名前を変更して更新
      const updatedName = 'update';
      const updateId: UserId = UserId.restore('aaa');
      const updateProps: IUserDomain = {
        name: updatedName,
        email: userSeed1.email,
      };
      const updatedUser = User.restore(updateProps, updateId);
      const update = async () => {
        await userRepository.update(updatedUser);
      };
      await expect(update).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('ユーザーを削除できること', async () => {
      const targetUser: User = await userRepository['userConverter'](
        userDummyData,
      );
      await prismaService.user.create({
        data: {
          id: targetUser.id.toString(),
          name: targetUser.name,
          email: targetUser.email,
        },
      });
      const beforeCount = await prismaService.user.count();
      await userRepository.delete(targetUser);
      const afterCount = await prismaService.user.count();
      expect(beforeCount).toEqual(afterCount + 1);
    });
    it('idが一致しない場合は削除できないこと', async () => {
      const targetUser: User = await userRepository['userConverter'](
        userDummyData,
      );
      const deleted = async () => {
        await userRepository.delete(targetUser);
      };
      await expect(deleted).rejects.toThrowError();
    });
  });

  describe('userConverter', () => {
    it('変換できること', async () => {
      const user: User = await userRepository['userConverter'](userDummyData);
      expect(user.id.toString()).toEqual(userDummyData.id);
      expect(user.email).toEqual(userDummyData.email);
      expect(user.name).toEqual(userDummyData.name);
      expect(user.posts[0].id.toString()).toEqual(userDummyData.posts[0].id);
      expect(user.posts[0].title).toEqual(userDummyData.posts[0].title);
      expect(user.posts[0].content).toEqual(userDummyData.posts[0].content);
      expect(user.posts[0].published).toEqual(userDummyData.posts[0].published);
    });
  });
});
