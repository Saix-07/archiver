import type { Vault } from '@prisma/client';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      selectedVault?: Vault;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
