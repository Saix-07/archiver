import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const [vault1, vault2] = await prisma.vault.createManyAndReturn({
  data: [
    {
      filePath: './test-vaults/test-1',
    },
    {
      filePath: './test-vaults/test-2',
    },
  ],
});

const [author1, author2, author3] = await prisma.postAuthor.createManyAndReturn({
  data: [
    {
      name: 'Test Author 1',
      vaultId: vault1.id,
    },
    {
      name: 'Test Author 2',
      vaultId: vault1.id,
    },
    {
      name: 'Test Author 3',
      vaultId: vault2.id,
    },
  ],
});

await prisma.post.createMany({
  data: [
    {
      vaultId: vault1.id,
      postAuthorId: author1.id,
    },
    {
      vaultId: vault1.id,
      postAuthorId: author1.id,
    },
    {
      vaultId: vault1.id,
      postAuthorId: author2.id,
    },
    {
      vaultId: vault2.id,
      postAuthorId: author3.id,
    },
  ],
});
