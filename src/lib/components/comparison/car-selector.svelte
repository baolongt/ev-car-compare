<script lang="ts">
	import { t } from 'svelte-i18n';
	import type { Car } from '$types/car';
	import { allCars } from '$stores/filters';
	import { comparisonIds, addToComparison, MAX_COMPARE_CARS } from '$stores/comparison';
	import { formatVNDCompact } from '$utils/format';

	interface Props {
		slot?: number;
		onselect?: (car: Car) => void;
	}

	let { slot = 1, onselect }: Props = $props();

	let searchQuery = $state('');
	let isOpen = $state(false);

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

	function selectCar(car: Car) {
		addToComparison(car.id);
		searchQuery = '';
		isOpen = false;
		onselect?.(car);
	}

	function handleFocus() {
		isOpen = true;
	}

	function handleBlur() {
		// Delay to allow click on dropdown items
		setTimeout(() => {
			isOpen = false;
		}, 200);
	}
</script>

<div class="relative">
	<div class="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
		<p class="mb-2 text-sm font-medium text-gray-500">{$t('comparison.selectCar')} {slot}</p>
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
				type="text"
				bind:value={searchQuery}
				onfocus={handleFocus}
				onblur={handleBlur}
				placeholder={$t('comparison.searchPlaceholder')}
				class="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
			/>
		</div>

		{#if isOpen && filteredCars.length > 0}
			<div class="absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
				{#each filteredCars as car (car.id)}
					{@const isSelected = $comparisonIds.includes(car.id)}
					<button
						type="button"
						onclick={() => selectCar(car)}
						disabled={isSelected}
						class="flex w-full items-center gap-3 p-3 text-left transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
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
						{#if isSelected}
							<span class="text-xs text-primary-600">{$t('common.select')}ed</span>
						{/if}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
