<script lang="ts">
	import '../app.css';
	import Header from '$components/layout/header.svelte';
	import Footer from '$components/layout/footer.svelte';
	import ComparisonBar from '$components/comparison/comparison-bar.svelte';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<meta name="robots" content="index, follow" />
	<meta name="language" content="Vietnamese" />
	<meta name="author" content="EV So Sánh" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
	<ComparisonBar />
</div>
