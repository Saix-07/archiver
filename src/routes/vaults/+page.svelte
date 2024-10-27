<script lang="ts">
import type { PageServerData } from './$types';
interface Props {
  data: PageServerData;
}

let { data }: Props = $props();
</script>

<h1>Vaults</h1>
{#await data.vaults}
  <p>Loading...</p>
{:then vaults}
  {#each vaults as vault (vault.id)}
    <p>{vault.id}</p>
  {/each}
{/await}
