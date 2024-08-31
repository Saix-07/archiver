import { getVaults } from '$lib/server/prisma/vaults';
import type { PageServerLoad } from './$types';

export const load = (() => {
  return {
    vaults: getVaults(),
  };
}) satisfies PageServerLoad;
