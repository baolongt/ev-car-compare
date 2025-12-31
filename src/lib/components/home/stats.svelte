<script lang="ts">
	import type { Car } from '$types/car';
	import cars from '$data/cars.json';
	import brands from '$data/brands.json';
	import { formatVNDCompact } from '$utils/format';

	const allCars = cars as Car[];

	const stats = $derived([
		{
			label: 'Mẫu xe điện',
			value: allCars.length.toString(),
			icon: 'car'
		},
		{
			label: 'Thương hiệu',
			value: brands.length.toString(),
			icon: 'brand'
		},
		{
			label: 'Giá từ',
			value: formatVNDCompact(Math.min(...allCars.map((c) => c.price))),
			icon: 'price'
		},
		{
			label: 'Tầm xa tối đa',
			value: `${Math.max(...allCars.map((c) => c.specs.range))} km`,
			icon: 'range'
		}
	]);
</script>

<section class="bg-gray-50 py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 gap-6 lg:grid-cols-4">
			{#each stats as stat}
				<div class="text-center">
					<div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
						{#if stat.icon === 'car'}
							<svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h8m-8 5h8m-4 7H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-3" />
							</svg>
						{:else if stat.icon === 'brand'}
							<svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
							</svg>
						{:else if stat.icon === 'price'}
							<svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						{:else}
							<svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
						{/if}
					</div>
					<p class="text-2xl font-bold text-gray-900 lg:text-3xl">{stat.value}</p>
					<p class="mt-1 text-sm text-gray-500">{stat.label}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
