import type { Prisma, Vault } from '@prisma/client';
import { prismaClient } from './prisma';

type Id = Vault['id'];

export async function getVaults() {
  return prismaClient.vault.findMany();
}

export async function getVaultById(id: Id) {
  return prismaClient.vault.findFirst({
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

export async function deleteVaultById(id: Id) {
  return prismaClient.vault.delete({
    where: {
      id,
    },
  });
}
