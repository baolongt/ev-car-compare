<script lang="ts">
	import type { Car } from '$types/car';
	import CarCard from './car-card.svelte';

	interface Props {
		cars: Car[];
	}

	let { cars }: Props = $props();
</script>

{#if cars.length === 0}
	<div class="py-12 text-center">
		<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
		<h3 class="mt-2 text-lg font-medium text-gray-900">Không tìm thấy xe</h3>
		<p class="mt-1 text-gray-500">Thử điều chỉnh bộ lọc để xem thêm kết quả.</p>
	</div>
{:else}
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each cars as car (car.id)}
			<CarCard {car} />
		{/each}
	</div>
{/if}
