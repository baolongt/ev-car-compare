<script lang="ts">
	import { t } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { comparisonCars, comparisonIds, initFromUrl, clearComparison, getShareUrl, MAX_COMPARE_CARS } from '$stores/comparison';
	import CarSelector from '$components/comparison/car-selector.svelte';
	import ComparisonTable from '$components/comparison/comparison-table.svelte';

	let highlightDifferences = $state(true);
	let showCopySuccess = $state(false);

	onMount(() => {
		// Initialize from URL params if present
		const carsParam = $page.url.searchParams.get('cars');
		if (carsParam) {
			const carIds = carsParam.split(',').filter(Boolean);
			if (carIds.length > 0) {
				initFromUrl(carIds);
			}
		}
	});

	function copyShareLink() {
		const shareUrl = `${window.location.origin}/so-sanh${getShareUrl()}`;
		navigator.clipboard.writeText(shareUrl).then(() => {
			showCopySuccess = true;
			setTimeout(() => {
				showCopySuccess = false;
			}, 2000);
		});
	}

	// Generate selector slots based on current selection
	const selectorSlots = $derived.by(() => {
		const slots = [];
		const selectedCount = $comparisonCars.length;
		// Show empty slots up to MAX_COMPARE_CARS
		for (let i = selectedCount; i < MAX_COMPARE_CARS; i++) {
			slots.push(i + 1);
		}
		return slots;
	});
</script>

<svelte:head>
	<title>{$t('comparison.title')} {$t('seo.titleSuffix')}</title>
	<meta
		name="description"
		content={$t('comparison.subtitle', { values: { max: MAX_COMPARE_CARS } })}
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Header -->
	<div class="flex flex-wrap items-start justify-between gap-4">
		<div>
			<h1 class="text-3xl font-bold text-gray-900">{$t('comparison.title')}</h1>
			<p class="mt-2 text-gray-500">
				{$t('comparison.subtitle', { values: { max: MAX_COMPARE_CARS } })}
			</p>
		</div>

		{#if $comparisonCars.length >= 2}
			<div class="flex items-center gap-3">
				<label class="flex items-center gap-2 text-sm">
					<input type="checkbox" bind:checked={highlightDifferences} class="rounded text-primary-600" />
					<span class="text-gray-600">{$t('comparison.highlightDifferences')}</span>
				</label>
				<button
					onclick={copyShareLink}
					class="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
				>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
					</svg>
					{showCopySuccess ? $t('comparison.copied') : $t('comparison.share')}
				</button>
				<button
					onclick={clearComparison}
					class="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
				>
					{$t('comparison.clearAll')}
				</button>
			</div>
		{/if}
	</div>

	<!-- Car Selectors -->
	{#if selectorSlots.length > 0}
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each selectorSlots as slot}
				<CarSelector {slot} />
			{/each}
		</div>
	{/if}

	<!-- Comparison Table -->
	{#if $comparisonCars.length >= 1}
		<div class="mt-8 rounded-xl border border-gray-200 bg-white p-6">
			<ComparisonTable cars={$comparisonCars} {highlightDifferences} />
		</div>
	{:else}
		<div class="mt-12 text-center">
			<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
				<svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
				</svg>
			</div>
			<h3 class="text-lg font-medium text-gray-900">{$t('comparison.noSelection')}</h3>
			<p class="mt-1 text-gray-500">{$t('comparison.noSelectionSubtitle')}</p>
			<a href="/xe-dien" class="btn-primary mt-4 inline-block">
				{$t('comparison.viewCarList')}
			</a>
		</div>
	{/if}

	<!-- Helpful tips -->
	{#if $comparisonCars.length === 1}
		<div class="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
			<p>{$t('comparison.addOneMore')}</p>
		</div>
	{/if}
</div>
