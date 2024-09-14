<script lang="ts">
  import type { PageServerData } from './$types';

  export let data: PageServerData;
</script>

<p>Posts</p>
{data.hello}
<p>{data.selectedVault}</p>
