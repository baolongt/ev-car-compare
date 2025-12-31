<script lang="ts">
	import { t } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { allCars } from '$stores/filters';
	import { calculateOnRoadPrice, type PriceBreakdown } from '$utils/calculator';
	import { formatVNDCompact } from '$utils/format';
	import type { Car } from '$types/car';
	import ProvinceSelector from '$components/calculator/province-selector.svelte';
	import PriceBreakdownComponent from '$components/calculator/price-breakdown.svelte';

	let selectedCarId = $state('');
	let selectedProvince = $state('hanoi');
	let searchQuery = $state('');
	let isDropdownOpen = $state(false);

	const selectedCar = $derived(allCars.find((c) => c.id === selectedCarId));
	const breakdown = $derived.by(() => {
		if (!selectedCar) return null;
		try {
			return calculateOnRoadPrice(selectedCar, selectedProvince);
		} catch {
			return null;
		}
	});

	const filteredCars = $derived.by(() => {
		if (!searchQuery.trim()) return allCars.slice(0, 10);
		const query = searchQuery.toLowerCase();
		return allCars.filter(
			(car) =>
				car.brand.toLowerCase().includes(query) ||
				car.model.toLowerCase().includes(query) ||
				`${car.brand} ${car.model}`.toLowerCase().includes(query)
		);
	});

	onMount(() => {
		// Initialize from URL params if present
		const carParam = $page.url.searchParams.get('car');
		if (carParam && allCars.some((c) => c.id === carParam)) {
			selectedCarId = carParam;
		}
	});

	function selectCar(car: Car) {
		selectedCarId = car.id;
		searchQuery = '';
		isDropdownOpen = false;
	}

	function handleSearchFocus() {
		isDropdownOpen = true;
	}

	function handleSearchBlur() {
		setTimeout(() => {
			isDropdownOpen = false;
		}, 200);
	}

	function handleProvinceChange(provinceId: string) {
		selectedProvince = provinceId;
	}
</script>

<svelte:head>
	<title>{$t('calculator.title')} {$t('seo.titleSuffix')}</title>
	<meta
		name="description"
		content={$t('calculator.subtitle')}
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Header -->
	<div class="text-center">
		<h1 class="text-3xl font-bold text-gray-900">{$t('calculator.title')}</h1>
		<p class="mt-2 text-gray-500">
			{$t('calculator.subtitle')}
		</p>
	</div>

	<div class="mt-8 grid gap-8 lg:grid-cols-2">
		<!-- Left: Selection Form -->
		<div class="space-y-6">
			<!-- Car Selector -->
			<div>
				<label for="car-search" class="block text-sm font-medium text-gray-700">
					{$t('calculator.selectCar')}
				</label>
				<div class="relative mt-1">
					{#if selectedCar}
						<div class="flex items-center gap-3 rounded-lg border border-gray-300 p-3">
							<img
								src={selectedCar.images[0] || '/images/placeholder-car.svg'}
								alt={`${selectedCar.brand} ${selectedCar.model}`}
								class="h-12 w-16 rounded object-cover"
							/>
							<div class="flex-1">
								<p class="font-medium text-gray-900">{selectedCar.brand} {selectedCar.model}</p>
								<p class="text-sm text-primary-600">{formatVNDCompact(selectedCar.price)}</p>
							</div>
							<button
								onclick={() => { selectedCarId = ''; }}
								class="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
								aria-label={$t('calculator.clearSelection')}
							>
								<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					{:else}
						<div class="relative">
							<svg
								class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
							<input
								id="car-search"
								type="text"
								bind:value={searchQuery}
								onfocus={handleSearchFocus}
								onblur={handleSearchBlur}
								placeholder={$t('calculator.searchPlaceholder')}
								class="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
							/>
						</div>

						{#if isDropdownOpen && filteredCars.length > 0}
							<div class="absolute left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
								{#each filteredCars as car (car.id)}
									<button
										type="button"
										onclick={() => selectCar(car)}
										class="flex w-full items-center gap-3 p-3 text-left transition hover:bg-gray-50"
									>
										<img
											src={car.images[0] || '/images/placeholder-car.svg'}
											alt={`${car.brand} ${car.model}`}
											class="h-10 w-14 rounded object-cover"
										/>
										<div class="flex-1">
											<p class="font-medium text-gray-900">{car.brand} {car.model}</p>
											<p class="text-sm text-gray-500">{formatVNDCompact(car.price)}</p>
										</div>
									</button>
								{/each}
							</div>
						{/if}
					{/if}
				</div>
			</div>

			<!-- Province Selector -->
			<ProvinceSelector value={selectedProvince} onchange={handleProvinceChange} />

			<!-- Quick Links -->
			{#if !selectedCar}
				<div class="rounded-lg bg-gray-50 p-4">
					<p class="text-sm font-medium text-gray-700">{$t('calculator.popularCars')}</p>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each allCars.filter((c) => c.featured).slice(0, 4) as car}
							<button
								onclick={() => selectCar(car)}
								class="rounded-full bg-white px-3 py-1 text-sm text-gray-600 shadow-sm transition hover:bg-primary-50 hover:text-primary-600"
							>
								{car.brand} {car.model}
							</button>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<!-- Right: Price Breakdown -->
		<div>
			{#if breakdown}
				<div class="rounded-xl border border-gray-200 bg-white p-6">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">{$t('calculator.priceBreakdown')}</h2>
					<PriceBreakdownComponent {breakdown} />
				</div>
			{:else}
				<div class="flex h-full items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-8">
					<div class="text-center">
						<svg class="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
						</svg>
						<p class="mt-2 font-medium text-gray-500">{$t('calculator.priceBreakdownEmpty')}</p>
						<p class="mt-1 text-sm text-gray-400">{$t('calculator.priceBreakdownEmptySubtitle')}</p>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Info Section -->
	<div class="mt-12 rounded-xl bg-blue-50 p-6">
		<h3 class="font-semibold text-blue-900">{$t('calculator.evIncentives.title')}</h3>
		<ul class="mt-3 space-y-2 text-sm text-blue-800">
			<li class="flex items-start gap-2">
				<svg class="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
				</svg>
				<span>{$t('calculator.evIncentives.exemption100')}</span>
			</li>
			<li class="flex items-start gap-2">
				<svg class="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
				</svg>
				<span>{$t('calculator.evIncentives.licensePlateFee')}</span>
			</li>
			<li class="flex items-start gap-2">
				<svg class="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
				</svg>
				<span>{$t('calculator.evIncentives.disclaimer')}</span>
			</li>
		</ul>
	</div>
</div>
