<script lang="ts">
	import { t, locale } from 'svelte-i18n';
	import CarCard from '$components/car/car-card.svelte';
	import MotorbikeCard from '$components/vehicle/motorbike-card.svelte';
	import { getFeaturedCars } from '$stores/filters';
	import { getFeaturedMotorbikes } from '$stores/motorbikes';

	interface Props {
		maxItems?: number;
	}

	let { maxItems = 3 }: Props = $props();

	const featuredCars = $derived(getFeaturedCars().slice(0, maxItems));
	const featuredMotorbikes = $derived(getFeaturedMotorbikes().slice(0, maxItems));
</script>

<section class="py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Featured Cars -->
		<div class="mb-12">
			<div class="flex items-end justify-between">
				<div>
					<h2 class="text-3xl font-bold text-gray-900">{$t('home.featuredCars')}</h2>
					<p class="mt-2 text-gray-600">{$t('home.featuredCarsSubtitle')}</p>
				</div>
				<a href="/{$locale}/xe/oto" class="hidden text-primary-600 hover:text-primary-700 sm:block">
					{$t('vehicle.allCars')} &rarr;
				</a>
			</div>

			<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each featuredCars as car (car.id)}
					<CarCard {car} />
				{/each}
			</div>

			<div class="mt-8 text-center sm:hidden">
				<a href="/{$locale}/xe/oto" class="btn-primary">{$t('vehicle.allCars')}</a>
			</div>
		</div>

		<!-- Featured Motorbikes -->
		<div>
			<div class="flex items-end justify-between">
				<div>
					<h2 class="text-3xl font-bold text-gray-900">{$t('home.featuredMotorbikes')}</h2>
					<p class="mt-2 text-gray-600">{$t('home.featuredMotorbikesSubtitle')}</p>
				</div>
				<a href="/{$locale}/xe/xe-may" class="hidden text-primary-600 hover:text-primary-700 sm:block">
					{$t('vehicle.allMotorbikes')} &rarr;
				</a>
			</div>

			<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each featuredMotorbikes as motorbike (motorbike.id)}
					<MotorbikeCard {motorbike} />
				{/each}
			</div>

			<div class="mt-8 text-center sm:hidden">
				<a href="/{$locale}/xe/xe-may" class="btn-primary">{$t('vehicle.allMotorbikes')}</a>
			</div>
		</div>
	</div>
</section>
