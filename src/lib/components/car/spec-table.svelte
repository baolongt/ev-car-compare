<script lang="ts">
	import type { CarSpecs } from '$types/car';
	import { formatNumber, formatRange, formatBattery, formatPower } from '$utils/format';

	interface Props {
		specs: CarSpecs;
		variant?: 'full' | 'compact';
	}

	let { specs, variant = 'full' }: Props = $props();

	const performanceSpecs = $derived([
		{ label: 'Công suất', value: formatPower(specs.power) },
		{ label: 'Mô-men xoắn', value: `${formatNumber(specs.torque)} Nm` },
		{ label: 'Tốc độ tối đa', value: `${specs.topSpeed} km/h` },
		{ label: '0-100 km/h', value: `${specs.acceleration}s` },
		{ label: 'Hệ dẫn động', value: specs.driveType }
	]);

	const batterySpecs = $derived([
		{ label: 'Dung lượng pin', value: formatBattery(specs.battery) },
		{ label: 'Tầm xa', value: formatRange(specs.range) },
		{ label: 'Sạc nhanh DC', value: specs.chargeTime.dc },
		{ label: 'Sạc AC', value: specs.chargeTime.ac }
	]);

	const dimensionSpecs = $derived([
		{
			label: 'Kích thước (DxRxC)',
			value: `${formatNumber(specs.dimensions.length)} x ${formatNumber(specs.dimensions.width)} x ${formatNumber(specs.dimensions.height)} mm`
		},
		{ label: 'Chiều dài cơ sở', value: `${formatNumber(specs.dimensions.wheelbase)} mm` },
		{ label: 'Trọng lượng', value: `${formatNumber(specs.weight)} kg` },
		{ label: 'Số chỗ ngồi', value: `${specs.seats} chỗ` }
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
			<h4 class="mb-3 font-semibold text-gray-900">Hiệu suất</h4>
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
			<h4 class="mb-3 font-semibold text-gray-900">Pin & Sạc</h4>
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
			<h4 class="mb-3 font-semibold text-gray-900">Kích thước</h4>
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
