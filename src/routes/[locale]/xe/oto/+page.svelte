<script lang="ts">
	import { t } from 'svelte-i18n';
	import { filters, filteredCars, toggleBrand, setPriceRange, setRangeKm, setBatteryKwh, resetFilters } from '$stores/filters';
	import CarGrid from '$components/car/car-grid.svelte';
	import FilterPanel from '$components/filters/filter-panel.svelte';

	let { data } = $props();

	let currentFilters = $state($filters);
	let cars = $state($filteredCars);

	$effect(() => {
		currentFilters = $filters;
	});

	$effect(() => {
		cars = $filteredCars;
	});
</script>

<svelte:head>
	<title>{$t('seo.carsTitle', { default: 'Electric Cars | EV Compare' })}</title>
	<meta
		name="description"
		content={$t('seo.carsDescription', { default: 'Browse and compare electric vehicles in Vietnam' })}
	/>
	<meta name="keywords" content="xe điện Việt Nam, VinFast, BYD, Tesla, so sánh xe điện, giá xe điện" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-gray-900">{$t('vehicle.cars')}</h1>
		<p class="mt-2 text-gray-600">
			{$t('pages.carsSubtitle', { default: 'Explore {count} electric cars from top brands', values: { count: data.totalCars } })}
		</p>
	</div>

	<div class="lg:grid lg:grid-cols-4 lg:gap-8">
		<div class="lg:col-span-1">
			<FilterPanel
				filters={currentFilters}
				onBrandChange={toggleBrand}
				onPriceChange={setPriceRange}
				onRangeChange={setRangeKm}
				onBatteryChange={setBatteryKwh}
				onReset={resetFilters}
			/>
		</div>

		<div class="mt-6 lg:col-span-3 lg:mt-0">
			<div class="mb-4 flex items-center justify-between">
				<p class="text-sm text-gray-600">
					{$t('pages.showing', { default: 'Showing' })} <span class="font-medium">{cars.length}</span> {$t('vehicle.cars').toLowerCase()}
				</p>
			</div>

			<CarGrid {cars} />
		</div>
	</div>
</div>
