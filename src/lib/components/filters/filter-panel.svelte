<script lang="ts">
	import { t } from 'svelte-i18n';
	import type { FilterState } from '$types/car';
	import BrandFilter from './brand-filter.svelte';
	import PriceFilter from './price-filter.svelte';
	import RangeFilter from './range-filter.svelte';
	import BatteryFilter from './battery-filter.svelte';

	interface Props {
		filters: FilterState;
		onBrandChange: (brandId: string) => void;
		onPriceChange: (value: [number, number]) => void;
		onRangeChange: (value: [number, number]) => void;
		onBatteryChange: (value: [number, number]) => void;
		onReset: () => void;
	}

	let { filters, onBrandChange, onPriceChange, onRangeChange, onBatteryChange, onReset }: Props = $props();

	let showMobileFilters = $state(false);
</script>

<!-- Mobile filter toggle -->
<div class="mb-4 lg:hidden">
	<button
		type="button"
		onclick={() => (showMobileFilters = !showMobileFilters)}
		class="btn-secondary w-full"
	>
		<svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
		</svg>
		{$t('filters.toggleFilters')}
	</button>
</div>

<!-- Filter panel -->
<aside class={[
	'space-y-6 rounded-xl bg-white p-6 shadow-sm',
	showMobileFilters ? 'block' : 'hidden lg:block'
].join(' ')}>
	<div class="flex items-center justify-between">
		<h2 class="text-lg font-semibold text-gray-900">{$t('filters.title')}</h2>
		<button
			type="button"
			onclick={onReset}
			class="text-sm text-primary-600 hover:text-primary-700"
		>
			{$t('filters.reset')}
		</button>
	</div>

	<BrandFilter selected={filters.brands} onchange={onBrandChange} />
	<PriceFilter value={filters.priceRange} onchange={onPriceChange} />
	<RangeFilter value={filters.rangeKm} onchange={onRangeChange} />
	<BatteryFilter value={filters.batteryKwh} onchange={onBatteryChange} />
</aside>
