<script lang="ts">
	import type { Car } from '$types/car';
	import { formatVNDCompact, formatRange, formatBattery } from '$utils/format';

	interface Props {
		car: Car;
	}

	let { car }: Props = $props();
</script>

<a href="/xe-dien/{car.slug}" class="group block">
	<article class="card h-full transition-shadow hover:shadow-md">
		<div class="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
			<img
				src={car.images[0] || '/images/placeholder-car.svg'}
				alt={`${car.brand} ${car.model}`}
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				loading="lazy"
			/>
			{#if car.featured}
				<span class="absolute left-2 top-2 rounded bg-accent-500 px-2 py-0.5 text-xs font-medium text-white">
					Nổi bật
				</span>
			{/if}
		</div>

		<div class="mt-4">
			<div class="flex items-start justify-between gap-2">
				<div>
					<p class="text-sm font-medium uppercase tracking-wide text-gray-500">{car.brand}</p>
					<h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600">
						{car.model}
					</h3>
				</div>
				<p class="whitespace-nowrap text-lg font-bold text-primary-600">
					{formatVNDCompact(car.price)}
				</p>
			</div>

			<div class="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
				<div class="flex items-center gap-1">
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
					<span>{formatRange(car.specs.range)}</span>
				</div>
				<div class="flex items-center gap-1">
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
					</svg>
					<span>{formatBattery(car.specs.battery)}</span>
				</div>
				<div class="flex items-center gap-1">
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>{car.specs.acceleration}s</span>
				</div>
			</div>
		</div>
	</article>
</a>
