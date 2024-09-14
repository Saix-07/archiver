import type { Handle } from '@sveltejs/kit';
import { getVaultById } from './lib/server/prisma/vaults';

export const handle: Handle = async ({ event, resolve }) => {
  const vault = event.cookies.get('selectedVault');
  if (vault) {
    event.locals.selectedVault = (await getVaultById(+vault)) ?? undefined;
  }

  return resolve(event);
};
