import { type Schema } from 'zod';

export function getArrayLikeFromPrismaField<T extends string | number>(
  prismaValue: string | null | undefined,
  zodSchema: Schema<T[]>,
): T[] {
  if (!prismaValue) {
    return [];
  }

  return zodSchema.parse(JSON.parse(prismaValue));
}
