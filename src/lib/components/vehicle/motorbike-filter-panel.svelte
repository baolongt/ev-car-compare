<script lang="ts">
	import { t } from 'svelte-i18n';
	import {
		motorbikeFilters,
		allMotorbikeBrands,
		toggleMotorbikeBrand,
		setMotorbikePriceRange,
		setMotorbikeRange,
		resetMotorbikeFilters
	} from '$stores/motorbikes';

	let filters = $state($motorbikeFilters);

	$effect(() => {
		filters = $motorbikeFilters;
	});
</script>

<div class="rounded-xl border border-gray-200 bg-white p-4">
	<div class="flex items-center justify-between">
		<h3 class="font-semibold text-gray-900">{$t('filters.title')}</h3>
		<button onclick={resetMotorbikeFilters} class="text-sm text-primary-600 hover:underline">
			{$t('filters.reset')}
		</button>
	</div>

	<!-- Brand Filter -->
	<div class="mt-4">
		<h4 class="text-sm font-medium text-gray-700">{$t('filters.brand')}</h4>
		<div class="mt-2 space-y-2">
			{#each allMotorbikeBrands as brand}
				<label class="flex items-center gap-2">
					<input
						type="checkbox"
						checked={filters.brands.includes(brand.id)}
						onchange={() => toggleMotorbikeBrand(brand.id)}
						class="rounded text-primary-600"
					/>
					<span class="text-sm text-gray-600">{brand.name}</span>
				</label>
			{/each}
		</div>
	</div>

	<!-- Price Range -->
	<div class="mt-4">
		<h4 class="text-sm font-medium text-gray-700">{$t('filters.priceRange')}</h4>
		<input
			type="range"
			min="0"
			max="100000000"
			step="5000000"
			value={filters.priceRange[1]}
			oninput={(e) => setMotorbikePriceRange([0, Number(e.currentTarget.value)])}
			class="mt-2 w-full"
		/>
		<p class="text-sm text-gray-500">Tối đa: {(filters.priceRange[1] / 1000000).toFixed(0)}M</p>
	</div>

	<!-- Range Filter -->
	<div class="mt-4">
		<h4 class="text-sm font-medium text-gray-700">{$t('filters.rangeKm')}</h4>
		<input
			type="range"
			min="0"
			max="250"
			step="10"
			value={filters.rangeKm[1]}
			oninput={(e) => setMotorbikeRange([0, Number(e.currentTarget.value)])}
			class="mt-2 w-full"
		/>
		<p class="text-sm text-gray-500">Tối đa: {filters.rangeKm[1]} km</p>
	</div>
</div>
