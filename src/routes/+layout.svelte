<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
  import { page } from '$app/state';
  console.log(page.route.id)
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<div class=" text-white p-2 absolute top-0 left-0 bg-[#1a1a1a] border-r border-b">{page.route.id} <span class="ml-3"><a class="underline" href="/">Home</a></span></div>

{@render children?.()}
