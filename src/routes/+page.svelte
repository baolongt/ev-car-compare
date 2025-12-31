<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const userLang = navigator.language.split('-')[0];
		const locale = ['vi', 'en'].includes(userLang) ? userLang : 'vi';
		goto(`/${locale}`, { replaceState: true });
	});
</script>

<p>Redirecting...</p>
