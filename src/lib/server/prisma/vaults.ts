import type { Prisma, Vault } from '@prisma/client';
import { prismaClient } from './prisma';
import { deletePostsByVault } from './posts';

export type VaultId = Vault['id'];

export async function getVaults() {
  return prismaClient.vault.findMany();
}

export async function getVaultById(id: VaultId) {
  return prismaClient.vault.findUnique({
    where: {
      id,
    },
  });
}

export async function createVault(args: Prisma.VaultCreateInput) {
  return prismaClient.vault.create({
    data: args,
  });
}

export async function deleteVaultById(id: VaultId) {
  const vault = await prismaClient.vault.findUnique({
    where: {
      id,
    },
  });

  if (!vault) {
    throw new Error(`Can't find vault with vaultId ${id}`);
  }

  await deletePostsByVault(id);

  await prismaClient.tag.deleteMany({
    where: {
      vaultId: id,
    },
  });

  await prismaClient.postAuthor.deleteMany({
    where: {
      vaultId: id,
    },
  });

  return prismaClient.vault.delete({
    where: {
      id,
    },
  });
}
