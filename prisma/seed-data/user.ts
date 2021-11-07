import { PrismaClient } from '@prisma/client';
import { postSeed1, postSeed2, postSeed3 } from './post';

export const userSeed1 = {
  id: '494785a7-b841-443f-ac2b-4ecd22cb438c', // uuid().toString(),
  email: 'alice@prisma.io',
  name: 'Alice',
  posts: { create: postSeed1 },
};

export const userSeed2 = {
  id: '5a08092f-d50f-4cb1-ba86-27438e17f601', // uuid().toString(),
  email: 'bob@prisma.io',
  name: 'Bob',
  posts: { createMany: { data: [postSeed2, postSeed3] } },
};
