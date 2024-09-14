import { writable } from 'svelte/store';

type UserSettingsStore = {
  selectedVault?: {
    id: number;
    filePath: string;
  };
};

const userSettings = writable<UserSettingsStore>({});

export default userSettings;
