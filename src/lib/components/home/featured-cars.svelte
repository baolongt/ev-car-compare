<script lang="ts">
	import { t, locale } from 'svelte-i18n';
	import type { Car } from '$types/car';
	import CarCard from '$components/car/car-card.svelte';
	import { getFeaturedCars } from '$stores/filters';

	interface Props {
		maxItems?: number;
	}

	let { maxItems = 6 }: Props = $props();

	const featuredCars = $derived(getFeaturedCars().slice(0, maxItems));
</script>

<section class="py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-end justify-between">
			<div>
				<h2 class="text-3xl font-bold text-gray-900">{$t('home.featuredCars')}</h2>
				<p class="mt-2 text-gray-600">{$t('home.featuredCarsSubtitle')}</p>
			</div>
			<a href="/{$locale}/xe-dien" class="hidden text-primary-600 hover:text-primary-700 sm:block">
				{$t('common.allCars')} &rarr;
			</a>
		</div>

		<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each featuredCars as car (car.id)}
				<CarCard {car} />
			{/each}
		</div>

		<div class="mt-8 text-center sm:hidden">
			<a href="/{$locale}/xe-dien" class="btn-primary">{$t('common.allCars')}</a>
		</div>
	</div>
</section>
