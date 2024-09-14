import { getVaults } from '$lib/server/prisma/vaults';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (() => {
  return {
    vaults: getVaults(),
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  selectVault: ({ cookies }) => {
    console.log('action!');

    cookies.set('selectedVault', '0', {
      path: '/',
    });

    return redirect(301, '/posts');
  },
};
