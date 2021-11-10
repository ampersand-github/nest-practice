import { PrismaClient } from "@prisma/client";

export const main = async (prisma: PrismaClient) => {
};

const prisma = new PrismaClient()

main(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
