<script lang="ts">
import { cn } from '$lib/utils.js';
import { Button as ButtonPrimitive } from 'bits-ui';
import type { Snippet } from 'svelte';
import { type Props as ButtonProps, type Events, buttonVariants } from './index.js';

interface Props {
  class?: ButtonProps['class'];
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  builders?: ButtonProps['builders'];
  children?: Snippet;
  // [key: string]: any
}

let {
  class: className = undefined,
  variant = 'default',
  size = 'default',
  builders = [],
  children,
  ...rest
}: Props = $props();
</script>

<ButtonPrimitive.Root
  {builders}
  class={cn(buttonVariants({ variant, size, className }))}
  type="button"
  {...rest}
  on:click
  on:keydown
>
  {@render children?.()}
</ButtonPrimitive.Root>
