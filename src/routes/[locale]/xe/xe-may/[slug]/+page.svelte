<script lang="ts">
	import { t, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { formatVND } from '$utils/format';
	import MotorbikeSpecTable from '$components/vehicle/motorbike-spec-table.svelte';
	import FeatureList from '$components/car/feature-list.svelte';

	let { data } = $props();
	let motorbike = $derived(data.motorbike);
</script>

<svelte:head>
	<title>{motorbike.brand} {motorbike.model} | {$t('header.siteName')}</title>
	<meta name="description" content={motorbike.description} />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Breadcrumb -->
	<nav class="mb-6 text-sm" aria-label="Breadcrumb">
		<ol class="flex items-center gap-2">
			<li><a href="/{$page.params.locale}" class="text-gray-500 hover:text-gray-700">{$t('nav.home')}</a></li>
			<li class="text-gray-400">/</li>
			<li><a href="/{$page.params.locale}/xe/xe-may" class="text-gray-500 hover:text-gray-700">{$t('vehicle.motorbikes')}</a></li>
			<li class="text-gray-400">/</li>
			<li class="font-medium text-gray-900">{motorbike.brand} {motorbike.model}</li>
		</ol>
	</nav>

	<div class="lg:grid lg:grid-cols-2 lg:gap-12">
		<!-- Image Gallery -->
		<div class="mb-8 lg:mb-0">
			<div class="aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
				<img
					src={motorbike.images[0] || '/images/placeholder-motorbike.svg'}
					alt="{motorbike.brand} {motorbike.model}"
					class="h-full w-full object-cover"
				/>
			</div>
			{#if motorbike.images.length > 1}
				<div class="mt-4 grid grid-cols-4 gap-2">
					{#each motorbike.images.slice(0, 4) as image, i}
						<div class="aspect-square overflow-hidden rounded-lg bg-gray-100">
							<img
								src={image}
								alt="{motorbike.brand} {motorbike.model} - Image {i + 1}"
								class="h-full w-full object-cover"
							/>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Details -->
		<div>
			<p class="text-sm font-medium uppercase tracking-wide text-primary-600">{motorbike.brand}</p>
			<h1 class="mt-1 text-3xl font-bold text-gray-900">{motorbike.model}</h1>
			{#if motorbike.variant}
				<p class="text-lg text-gray-600">{motorbike.variant}</p>
			{/if}

			<p class="mt-4 text-3xl font-bold text-primary-600">{formatVND(motorbike.price)}</p>

			<p class="mt-6 text-gray-600">{motorbike.description}</p>

			<!-- Key Specs Quick View -->
			<div class="mt-8 grid grid-cols-3 gap-4">
				<div class="rounded-lg bg-gray-50 p-4 text-center">
					<p class="text-2xl font-bold text-gray-900">{motorbike.specs.range}</p>
					<p class="text-sm text-gray-500">{$t('units.km')} {$t('common.range').toLowerCase()}</p>
				</div>
				<div class="rounded-lg bg-gray-50 p-4 text-center">
					<p class="text-2xl font-bold text-gray-900">{motorbike.specs.battery}</p>
					<p class="text-sm text-gray-500">{$t('units.kwh')}</p>
				</div>
				<div class="rounded-lg bg-gray-50 p-4 text-center">
					<p class="text-2xl font-bold text-gray-900">{motorbike.specs.topSpeed}</p>
					<p class="text-sm text-gray-500">{$t('units.kmh')}</p>
				</div>
			</div>

			{#if motorbike.featured}
				<div class="mt-6">
					<span class="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
						{$t('car.featured')}
					</span>
				</div>
			{/if}
		</div>
	</div>

	<!-- Specifications Table -->
	<div class="mt-12">
		<MotorbikeSpecTable {motorbike} />
	</div>

	<!-- Features -->
	{#if motorbike.features.length > 0}
		<div class="mt-12">
			<h2 class="text-2xl font-bold text-gray-900">{$t('car.features')}</h2>
			<div class="mt-6">
				<FeatureList features={motorbike.features} columns={4} />
			</div>
		</div>
	{/if}
</div>
