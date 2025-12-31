<script lang="ts">
	import { t } from 'svelte-i18n';
	import type { Car } from '$types/car';
	import CarCard from './car-card.svelte';
	import cars from '$data/cars.json';

	interface Props {
		currentCar: Car;
		maxItems?: number;
	}

	let { currentCar, maxItems = 4 }: Props = $props();

	// Find similar cars based on: same brand OR similar price range (±20%)
	const similarCars = $derived.by(() => {
		const priceMin = currentCar.price * 0.8;
		const priceMax = currentCar.price * 1.2;

		return (cars as Car[])
			.filter((car) => {
				if (car.id === currentCar.id) return false;
				// Same brand OR similar price range
				return car.brand === currentCar.brand || (car.price >= priceMin && car.price <= priceMax);
			})
			.sort((a, b) => {
				// Prioritize same brand
				if (a.brand === currentCar.brand && b.brand !== currentCar.brand) return -1;
				if (b.brand === currentCar.brand && a.brand !== currentCar.brand) return 1;
				// Then sort by price proximity
				return Math.abs(a.price - currentCar.price) - Math.abs(b.price - currentCar.price);
			})
			.slice(0, maxItems);
	});
</script>

{#if similarCars.length > 0}
	<section>
		<h2 class="mb-6 text-2xl font-bold text-gray-900">{$t('car.similar')}</h2>
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each similarCars as car (car.id)}
				<CarCard {car} />
			{/each}
		</div>
	</section>
{/if}
