<script lang="ts">
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
			title: 'Giá & Thông tin chung',
			specs: [
				{ label: 'Giá niêm yết', values: cars.map((c) => formatVND(c.price)) },
				{ label: 'Năm sản xuất', values: cars.map((c) => c.year) },
				{ label: 'Bảo hành', values: cars.map((c) => c.specs.warranty) }
			]
		},
		{
			title: 'Hiệu suất',
			specs: [
				{ label: 'Công suất', values: cars.map((c) => formatPower(c.specs.power)) },
				{ label: 'Mô-men xoắn', values: cars.map((c) => `${formatNumber(c.specs.torque)} Nm`) },
				{ label: '0-100 km/h', values: cars.map((c) => `${c.specs.acceleration}s`) },
				{ label: 'Tốc độ tối đa', values: cars.map((c) => `${c.specs.topSpeed} km/h`) },
				{ label: 'Hệ dẫn động', values: cars.map((c) => c.specs.driveType) }
			]
		},
		{
			title: 'Pin & Sạc',
			specs: [
				{ label: 'Dung lượng pin', values: cars.map((c) => formatBattery(c.specs.battery)) },
				{ label: 'Tầm xa', values: cars.map((c) => formatRange(c.specs.range)) },
				{ label: 'Sạc nhanh DC', values: cars.map((c) => c.specs.chargeTime.dc) },
				{ label: 'Sạc AC', values: cars.map((c) => c.specs.chargeTime.ac) }
			]
		},
		{
			title: 'Kích thước',
			specs: [
				{ label: 'Chiều dài', values: cars.map((c) => `${formatNumber(c.specs.dimensions.length)} mm`) },
				{ label: 'Chiều rộng', values: cars.map((c) => `${formatNumber(c.specs.dimensions.width)} mm`) },
				{ label: 'Chiều cao', values: cars.map((c) => `${formatNumber(c.specs.dimensions.height)} mm`) },
				{ label: 'Chiều dài cơ sở', values: cars.map((c) => `${formatNumber(c.specs.dimensions.wheelbase)} mm`) },
				{ label: 'Trọng lượng', values: cars.map((c) => `${formatNumber(c.specs.weight)} kg`) },
				{ label: 'Số chỗ ngồi', values: cars.map((c) => `${c.specs.seats} chỗ`) }
			]
		}
	]);
</script>

{#if cars.length === 0}
	<div class="py-12 text-center">
		<p class="text-gray-500">Chưa có xe nào được chọn để so sánh.</p>
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
									aria-label="Xóa khỏi so sánh"
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
