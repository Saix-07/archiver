import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
  return {
    hello: 1,
    selectedVault: locals.selectedVault,
  };
};
