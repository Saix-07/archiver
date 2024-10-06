import type { Post, Prisma } from '@prisma/client';
import { prismaClient } from './prisma';
import type { VaultId } from './vaults';

export type PostId = Post['id'];

export async function getPostsForVault(vaultId: VaultId) {
  return prismaClient.post.findMany({
    where: {
      vaultId,
    },
  });
}

export async function getPostById(postId: PostId) {
  return prismaClient.post.findUnique({
    where: {
      id: postId,
    },
  });
}

export async function createPost(args: Prisma.PostCreateInput) {
  return prismaClient.post.create({
    data: args,
  });
}

export async function deletePostsByVault(vaultId: VaultId) {
  return prismaClient.post.deleteMany({
    where: {
      vaultId,
    },
  });
}

export async function deletePost(postId: PostId) {
  return prismaClient.post.delete({
    where: {
      id: postId,
    },
  });
}
