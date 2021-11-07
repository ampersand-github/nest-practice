import { PrismaService } from '../src/infrastructure/prisma/prisma.service';
import { userSeed1, userSeed2 } from './seed-data/user';

export const registerSeed = async (prisma: PrismaService) => {
  await prisma.user.upsert({
    where: { email: userSeed1.email },
    update: {},
    create: userSeed1,
  });
  await prisma.user.upsert({
    where: { email: userSeed2.email },
    update: {},
    create: userSeed2,
  });
};

const prisma = new PrismaService();

registerSeed(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
