import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { getArrayLikeFromPrismaField } from './utils';

const handlesSchema = z.array(z.string());

export const prismaClient = new PrismaClient().$extends({
  result: {
    postAuthor: {
      handles: {
        needs: { handlesArrayLike: true },
        compute(data) {
          return getArrayLikeFromPrismaField(data.handlesArrayLike, handlesSchema);
        },
      },
    },
  },
});
