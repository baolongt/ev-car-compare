<script lang="ts">
	import { locale } from '$lib/i18n';
	import { page } from '$app/stores';
	import '../../app.css';
	import Header from '$components/layout/header.svelte';
	import Footer from '$components/layout/footer.svelte';
	import ComparisonBar from '$components/comparison/comparison-bar.svelte';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const basePath = $derived($page.url.pathname.replace(/^\/(vi|en)/, ''));

	// Set locale synchronously from route params
	$effect(() => {
		const pageLocale = $page.params.locale;
		if (pageLocale && (pageLocale === 'vi' || pageLocale === 'en')) {
			locale.set(pageLocale);
		}
	});
</script>

<svelte:head>
	<meta name="robots" content="index, follow" />
	<meta name="language" content={$page.params.locale === 'vi' ? 'Vietnamese' : 'English'} />
	<meta name="author" content="EV So Sánh" />
	<link rel="alternate" hreflang="vi" href="/vi{basePath}" />
	<link rel="alternate" hreflang="en" href="/en{basePath}" />
	<link rel="alternate" hreflang="x-default" href="/vi{basePath}" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
	<ComparisonBar />
</div>
