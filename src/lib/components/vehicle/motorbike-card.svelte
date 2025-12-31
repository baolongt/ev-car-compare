<script lang="ts">
	import { t, locale } from 'svelte-i18n';
	import type { Motorbike } from '$types/vehicle';
	import { formatVNDCompact } from '$utils/format';

	interface Props {
		motorbike: Motorbike;
	}

	let { motorbike }: Props = $props();
</script>

<a
	href="/{$locale}/xe/xe-may/{motorbike.slug}"
	class="group rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-lg"
>
	<div class="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
		<img
			src={motorbike.images[0] || '/images/placeholder-motorbike.svg'}
			alt="{motorbike.brand} {motorbike.model}"
			class="h-full w-full object-cover transition group-hover:scale-105"
		/>
	</div>

	<div class="mt-4">
		<div class="flex items-start justify-between">
			<div>
				<h3 class="font-semibold text-gray-900">{motorbike.brand} {motorbike.model}</h3>
				<p class="text-lg font-bold text-primary-600">{formatVNDCompact(motorbike.price)}</p>
			</div>
			{#if motorbike.featured}
				<span class="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
					{$t('car.featured')}
				</span>
			{/if}
		</div>

		<div class="mt-3 flex gap-4 text-sm text-gray-600">
			<div>
				<span class="font-medium">{motorbike.specs.range}</span> km
			</div>
			<div>
				<span class="font-medium">{motorbike.specs.battery}</span> kWh
			</div>
			<div>
				<span class="font-medium">{motorbike.specs.topSpeed}</span> km/h
			</div>
		</div>
	</div>
</a>
