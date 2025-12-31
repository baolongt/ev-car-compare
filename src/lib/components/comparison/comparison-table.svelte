<script lang="ts">
	import { t } from 'svelte-i18n';
	import type { Car } from '$types/car';
	import { formatVND, formatRange, formatBattery, formatPower, formatNumber } from '$utils/format';
	import { removeFromComparison } from '$stores/comparison';
	import SpecRow from './spec-row.svelte';

	interface Props {
		cars: Car[];
		highlightDifferences?: boolean;
	}

	let { cars, highlightDifferences = true }: Props = $props();

	// Generate spec rows data
	const specSections = $derived.by(() => [
		{
			title: $t('common.price') + ' & ' + $t('car.specs'),
			specs: [
				{ label: $t('calculator.basePrice'), values: cars.map((c) => formatVND(c.price)) },
				{ label: $t('car.specs.year', { default: 'Year' }), values: cars.map((c) => c.year) },
				{ label: $t('car.specs.warranty', { default: 'Warranty' }), values: cars.map((c) => c.specs.warranty) }
			]
		},
		{
			title: $t('car.specs.performance'),
			specs: [
				{ label: $t('car.specs.power'), values: cars.map((c) => formatPower(c.specs.power)) },
				{ label: $t('car.specs.torque'), values: cars.map((c) => `${formatNumber(c.specs.torque)} ${$t('units.nm')}`) },
				{ label: $t('car.specs.acceleration'), values: cars.map((c) => `${c.specs.acceleration}${$t('units.seconds')}`) },
				{ label: $t('car.specs.topSpeed'), values: cars.map((c) => `${c.specs.topSpeed} ${$t('units.kmh')}`) },
				{ label: $t('car.specs.driveType'), values: cars.map((c) => c.specs.driveType) }
			]
		},
		{
			title: $t('car.specs.batteryCharging'),
			specs: [
				{ label: $t('car.specs.batteryCapacity'), values: cars.map((c) => formatBattery(c.specs.battery)) },
				{ label: $t('car.specs.range'), values: cars.map((c) => formatRange(c.specs.range)) },
				{ label: $t('car.specs.chargingDC'), values: cars.map((c) => c.specs.chargeTime.dc) },
				{ label: $t('car.specs.chargingAC'), values: cars.map((c) => c.specs.chargeTime.ac) }
			]
		},
		{
			title: $t('car.specs.dimensions'),
			specs: [
				{ label: $t('car.specs.length', { default: 'Length' }), values: cars.map((c) => `${formatNumber(c.specs.dimensions.length)} ${$t('units.mm')}`) },
				{ label: $t('car.specs.width', { default: 'Width' }), values: cars.map((c) => `${formatNumber(c.specs.dimensions.width)} ${$t('units.mm')}`) },
				{ label: $t('car.specs.height', { default: 'Height' }), values: cars.map((c) => `${formatNumber(c.specs.dimensions.height)} ${$t('units.mm')}`) },
				{ label: $t('car.specs.wheelbase'), values: cars.map((c) => `${formatNumber(c.specs.dimensions.wheelbase)} ${$t('units.mm')}`) },
				{ label: $t('car.specs.weight'), values: cars.map((c) => `${formatNumber(c.specs.weight)} ${$t('units.kg')}`) },
				{ label: $t('car.specs.seats'), values: cars.map((c) => `${c.specs.seats} ${$t('common.seats')}`) }
			]
		}
	]);
</script>

{#if cars.length === 0}
	<div class="py-12 text-center">
		<p class="text-gray-500">{$t('comparison.noSelection')}</p>
	</div>
{:else}
	<div class="overflow-x-auto">
		<table class="w-full min-w-[600px]">
			<!-- Header with car images and names -->
			<thead>
				<tr>
					<th class="w-40 pb-4"></th>
					{#each cars as car (car.id)}
						<th class="pb-4 text-center">
							<div class="relative mx-auto w-48">
								<button
									onclick={() => removeFromComparison(car.id)}
									class="absolute -right-2 -top-2 rounded-full bg-red-100 p-1 text-red-600 transition hover:bg-red-200"
									aria-label={$t('comparison.removeCar')}
								>
									<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
								<img
									src={car.images[0] || '/images/placeholder-car.svg'}
									alt={`${car.brand} ${car.model}`}
									class="mx-auto h-28 w-full rounded-lg object-cover"
								/>
								<a href="/xe-dien/{car.slug}" class="mt-2 block text-center hover:text-primary-600">
									<p class="text-xs font-medium uppercase text-gray-500">{car.brand}</p>
									<p class="font-semibold text-gray-900">{car.model}</p>
								</a>
							</div>
						</th>
					{/each}
				</tr>
			</thead>

			<!-- Spec sections -->
			<tbody>
				{#each specSections as section}
					<tr>
						<td
							colspan={cars.length + 1}
							class="border-t border-gray-200 bg-gray-50 py-2 text-sm font-semibold text-gray-700"
						>
							{section.title}
						</td>
					</tr>
					{#each section.specs as spec}
						<SpecRow label={spec.label} values={spec.values} highlight={highlightDifferences} />
					{/each}
				{/each}
			</tbody>
		</table>
	</div>
{/if}
