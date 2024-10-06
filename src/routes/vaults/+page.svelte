<script lang="ts">
import type { PageServerData } from './$types';
export let data: PageServerData;
</script>

<h1>Vaults</h1>
{#await data.vaults}
  <p>Loading...</p>
{:then vaults}
  {#each vaults as vault (vault.id)}
    <p>{vault.id}</p>
  {/each}
{/await}
