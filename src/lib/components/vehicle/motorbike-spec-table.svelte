<script lang="ts">
	import { t } from 'svelte-i18n';
	import type { Motorbike } from '$types/vehicle';

	interface Props {
		motorbike: Motorbike;
	}

	let { motorbike }: Props = $props();
	const specs = $derived(motorbike.specs);
</script>

<div class="rounded-xl border border-gray-200 bg-white">
	<div class="border-b border-gray-200 px-6 py-4">
		<h2 class="text-lg font-semibold text-gray-900">{$t('car.specs')}</h2>
	</div>

	<div class="divide-y divide-gray-100">
		<div class="grid grid-cols-2 gap-4 px-6 py-3">
			<span class="text-gray-600">{$t('motorbike.specs.battery')}</span>
			<span class="font-medium text-gray-900">{specs.battery} kWh</span>
		</div>
		<div class="grid grid-cols-2 gap-4 px-6 py-3">
			<span class="text-gray-600">{$t('motorbike.specs.range')}</span>
			<span class="font-medium text-gray-900">{specs.range} km</span>
		</div>
		<div class="grid grid-cols-2 gap-4 px-6 py-3">
			<span class="text-gray-600">{$t('motorbike.specs.power')}</span>
			<span class="font-medium text-gray-900">{specs.power} kW</span>
		</div>
		<div class="grid grid-cols-2 gap-4 px-6 py-3">
			<span class="text-gray-600">{$t('motorbike.specs.topSpeed')}</span>
			<span class="font-medium text-gray-900">{specs.topSpeed} km/h</span>
		</div>
		<div class="grid grid-cols-2 gap-4 px-6 py-3">
			<span class="text-gray-600">{$t('motorbike.specs.chargeTime')}</span>
			<span class="font-medium text-gray-900">{specs.chargeTime}</span>
		</div>
		<div class="grid grid-cols-2 gap-4 px-6 py-3">
			<span class="text-gray-600">{$t('motorbike.specs.weight')}</span>
			<span class="font-medium text-gray-900">{specs.weight} kg</span>
		</div>
		<div class="grid grid-cols-2 gap-4 px-6 py-3">
			<span class="text-gray-600">{$t('motorbike.specs.maxLoad')}</span>
			<span class="font-medium text-gray-900">{specs.maxLoad} kg</span>
		</div>
		<div class="grid grid-cols-2 gap-4 px-6 py-3">
			<span class="text-gray-600">{$t('motorbike.specs.warranty')}</span>
			<span class="font-medium text-gray-900">{specs.warranty}</span>
		</div>
	</div>
</div>
