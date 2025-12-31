<script lang="ts">
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
				<h2 class="text-3xl font-bold text-gray-900">Xe điện nổi bật</h2>
				<p class="mt-2 text-gray-600">Những mẫu xe điện được quan tâm nhất tại Việt Nam</p>
			</div>
			<a href="/xe-dien" class="hidden text-primary-600 hover:text-primary-700 sm:block">
				Xem tất cả &rarr;
			</a>
		</div>

		<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each featuredCars as car (car.id)}
				<CarCard {car} />
			{/each}
		</div>

		<div class="mt-8 text-center sm:hidden">
			<a href="/xe-dien" class="btn-primary">Xem tất cả xe điện</a>
		</div>
	</div>
</section>
