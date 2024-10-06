import { prismaClient } from './prisma';

export async function getPostAuthorIdFromHandle(handle: string) {
  return prismaClient.postAuthor.findFirst({
    where: {
      handlesArrayLike: {
        contains: handle,
      },
    },
    select: {
      id: true,
    },
  });
}
