<script lang="ts">
	import { pageTitle } from '$utils/seo';
	import { filters, filteredCars, toggleBrand, setPriceRange, setRangeKm, setBatteryKwh, resetFilters } from '$stores/filters';
	import CarGrid from '$components/car/car-grid.svelte';
	import FilterPanel from '$components/filters/filter-panel.svelte';

	let { data } = $props();

	let currentFilters = $state($filters);
	let cars = $state($filteredCars);

	$effect(() => {
		currentFilters = $filters;
	});

	$effect(() => {
		cars = $filteredCars;
	});
</script>

<svelte:head>
	<title>{pageTitle('Danh sách xe điện')}</title>
	<meta
		name="description"
		content="Danh sách {data.totalCars}+ xe điện tại Việt Nam. So sánh VinFast, BYD, Tesla, Hyundai, Mercedes, BMW. Lọc theo giá, tầm xa, dung lượng pin."
	/>
	<meta name="keywords" content="xe điện Việt Nam, VinFast, BYD, Tesla, so sánh xe điện, giá xe điện" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-gray-900">Xe Điện tại Việt Nam</h1>
		<p class="mt-2 text-gray-600">
			Khám phá {data.totalCars} mẫu xe điện từ các thương hiệu hàng đầu
		</p>
	</div>

	<div class="lg:grid lg:grid-cols-4 lg:gap-8">
		<div class="lg:col-span-1">
			<FilterPanel
				filters={currentFilters}
				onBrandChange={toggleBrand}
				onPriceChange={setPriceRange}
				onRangeChange={setRangeKm}
				onBatteryChange={setBatteryKwh}
				onReset={resetFilters}
			/>
		</div>

		<div class="mt-6 lg:col-span-3 lg:mt-0">
			<div class="mb-4 flex items-center justify-between">
				<p class="text-sm text-gray-600">
					Hiển thị <span class="font-medium">{cars.length}</span> xe
				</p>
			</div>

			<CarGrid {cars} />
		</div>
	</div>
</div>
