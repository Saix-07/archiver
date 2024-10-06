import { PrismaClient } from '@prisma/client';
import { getArrayLikeFromPrismaField } from './utils';
import { z } from 'zod';

const handlesSchema = z.array(z.string())

export const prismaClient = new PrismaClient().$extends({
  result: {
    postAuthor: {
      handles: {
        needs: { handlesArrayLike: true },
        compute(data) {
          return getArrayLikeFromPrismaField(data.handlesArrayLike, handlesSchema)
        },
      }
    }
  }
});
