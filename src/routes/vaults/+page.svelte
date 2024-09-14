<script lang="ts">
  import type { PageServerData } from './$types';
  import userSettings from '$lib/stores/userSettings';
  import Button from '$lib/components/ui/button/button.svelte';
  import { goto } from '$app/navigation';
  import { enhance } from '$app/forms';

  export let data: PageServerData;

  function selectVault(vault: Awaited<PageServerData['vaults']>[number]) {
    $userSettings.selectedVault = vault;
    goto('/posts');
  }
</script>

<h1>Vaults</h1>
{#await data.vaults}
  <p>Loading...</p>
{:then vaults}
  {#each vaults as vault (vault.id)}
    {@const vaultIsSelected = vault.id === $userSettings.selectedVault?.id}

    <form method="POST" action="?/selectVault" use:enhance>
      <div class="border">
        <p>{vault.id}{vaultIsSelected ? ' (Selected)' : ''}</p>
        <p>{vault.filePath}</p>
        <Button type="submit">Select Vault</Button>
        <!-- <Button disabled={vaultIsSelected} on:click={() => selectVault(vault)}>Select Vault</Button> -->
      </div>
    </form>
  {/each}
{/await}
