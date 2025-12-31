<script lang="ts">
	import { t } from 'svelte-i18n';
	import type { CarSpecs } from '$types/car';
	import { formatNumber, formatRange, formatBattery, formatPower } from '$utils/format';

	interface Props {
		specs: CarSpecs;
		variant?: 'full' | 'compact';
	}

	let { specs, variant = 'full' }: Props = $props();

	const performanceSpecs = $derived([
		{ label: $t('car.specs.power'), value: formatPower(specs.power) },
		{ label: $t('car.specs.torque'), value: `${formatNumber(specs.torque)} ${$t('units.nm')}` },
		{ label: $t('car.specs.topSpeed'), value: `${specs.topSpeed} ${$t('units.kmh')}` },
		{ label: $t('car.specs.acceleration'), value: `${specs.acceleration}${$t('units.seconds')}` },
		{ label: $t('car.specs.driveType'), value: specs.driveType }
	]);

	const batterySpecs = $derived([
		{ label: $t('car.specs.batteryCapacity'), value: formatBattery(specs.battery) },
		{ label: $t('car.specs.range'), value: formatRange(specs.range) },
		{ label: $t('car.specs.chargingDC'), value: specs.chargeTime.dc },
		{ label: $t('car.specs.chargingAC'), value: specs.chargeTime.ac }
	]);

	const dimensionSpecs = $derived([
		{
			label: $t('car.specs.dimensionsLWH'),
			value: `${formatNumber(specs.dimensions.length)} x ${formatNumber(specs.dimensions.width)} x ${formatNumber(specs.dimensions.height)} ${$t('units.mm')}`
		},
		{ label: $t('car.specs.wheelbase'), value: `${formatNumber(specs.dimensions.wheelbase)} ${$t('units.mm')}` },
		{ label: $t('car.specs.weight'), value: `${formatNumber(specs.weight)} ${$t('units.kg')}` },
		{ label: $t('car.specs.seats'), value: `${specs.seats} ${$t('common.seats')}` }
	]);
</script>

{#if variant === 'compact'}
	<dl class="grid grid-cols-2 gap-4">
		{#each [...performanceSpecs.slice(0, 2), ...batterySpecs.slice(0, 2)] as spec}
			<div>
				<dt class="text-sm text-gray-500">{spec.label}</dt>
				<dd class="font-medium text-gray-900">{spec.value}</dd>
			</div>
		{/each}
	</dl>
{:else}
	<div class="grid gap-6 md:grid-cols-3">
		<div class="rounded-lg border border-gray-200 p-4">
			<h4 class="mb-3 font-semibold text-gray-900">{$t('car.specs.performance')}</h4>
			<dl class="space-y-2">
				{#each performanceSpecs as spec}
					<div class="flex justify-between text-sm">
						<dt class="text-gray-500">{spec.label}</dt>
						<dd class="font-medium text-gray-900">{spec.value}</dd>
					</div>
				{/each}
			</dl>
		</div>

		<div class="rounded-lg border border-gray-200 p-4">
			<h4 class="mb-3 font-semibold text-gray-900">{$t('car.specs.batteryCharging')}</h4>
			<dl class="space-y-2">
				{#each batterySpecs as spec}
					<div class="flex justify-between text-sm">
						<dt class="text-gray-500">{spec.label}</dt>
						<dd class="font-medium text-gray-900">{spec.value}</dd>
					</div>
				{/each}
			</dl>
		</div>

		<div class="rounded-lg border border-gray-200 p-4">
			<h4 class="mb-3 font-semibold text-gray-900">{$t('car.specs.dimensions')}</h4>
			<dl class="space-y-2">
				{#each dimensionSpecs as spec}
					<div class="flex justify-between text-sm">
						<dt class="text-gray-500">{spec.label}</dt>
						<dd class="font-medium text-gray-900">{spec.value}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
{/if}
