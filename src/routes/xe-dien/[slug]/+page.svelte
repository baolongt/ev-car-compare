<script lang="ts">
	import { pageTitle } from '$utils/seo';
	import { formatVND, formatRange, formatBattery, formatPower, formatNumber } from '$utils/format';

	let { data } = $props();
	let car = $derived(data.car);
</script>

<svelte:head>
	<title>{pageTitle(`${car.brand} ${car.model}`)}</title>
	<meta name="description" content={car.description} />
	<meta property="og:title" content={`${car.brand} ${car.model} - So Sánh Xe Điện Việt Nam`} />
	<meta property="og:description" content={car.description} />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Breadcrumb -->
	<nav class="mb-6 text-sm">
		<ol class="flex items-center gap-2">
			<li><a href="/" class="text-gray-500 hover:text-gray-700">Trang chủ</a></li>
			<li class="text-gray-400">/</li>
			<li><a href="/xe-dien" class="text-gray-500 hover:text-gray-700">Xe điện</a></li>
			<li class="text-gray-400">/</li>
			<li class="font-medium text-gray-900">{car.brand} {car.model}</li>
		</ol>
	</nav>

	<div class="lg:grid lg:grid-cols-2 lg:gap-12">
		<!-- Image -->
		<div class="mb-8 lg:mb-0">
			<div class="aspect-video overflow-hidden rounded-xl bg-gray-100">
				<img
					src={car.images[0] || '/images/placeholder-car.svg'}
					alt={`${car.brand} ${car.model}`}
					class="h-full w-full object-cover"
				/>
			</div>
		</div>

		<!-- Details -->
		<div>
			<p class="text-sm font-medium uppercase tracking-wide text-primary-600">{car.brand}</p>
			<h1 class="mt-1 text-3xl font-bold text-gray-900">{car.model}</h1>
			{#if car.variant}
				<p class="text-lg text-gray-600">{car.variant}</p>
			{/if}

			<p class="mt-4 text-3xl font-bold text-primary-600">{formatVND(car.price)}</p>

			<p class="mt-6 text-gray-600">{car.description}</p>

			<!-- Key Specs -->
			<div class="mt-8 grid grid-cols-3 gap-4">
				<div class="rounded-lg bg-gray-50 p-4 text-center">
					<p class="text-2xl font-bold text-gray-900">{formatRange(car.specs.range)}</p>
					<p class="text-sm text-gray-500">Tầm xa</p>
				</div>
				<div class="rounded-lg bg-gray-50 p-4 text-center">
					<p class="text-2xl font-bold text-gray-900">{formatBattery(car.specs.battery)}</p>
					<p class="text-sm text-gray-500">Dung lượng pin</p>
				</div>
				<div class="rounded-lg bg-gray-50 p-4 text-center">
					<p class="text-2xl font-bold text-gray-900">{car.specs.acceleration}s</p>
					<p class="text-sm text-gray-500">0-100 km/h</p>
				</div>
			</div>

			<!-- CTA Buttons -->
			<div class="mt-8 flex gap-4">
				<a href="/so-sanh?cars={car.id}" class="btn-primary flex-1 text-center">So sánh xe này</a>
				<a href="/tinh-gia?car={car.id}" class="btn-secondary flex-1 text-center">Tính giá lăn bánh</a>
			</div>
		</div>
	</div>

	<!-- Specifications Table -->
	<div class="mt-12">
		<h2 class="text-2xl font-bold text-gray-900">Thông số kỹ thuật</h2>

		<div class="mt-6 grid gap-8 md:grid-cols-2">
			<!-- Performance -->
			<div class="card">
				<h3 class="mb-4 text-lg font-semibold text-gray-900">Hiệu suất</h3>
				<dl class="space-y-3">
					<div class="flex justify-between">
						<dt class="text-gray-600">Công suất</dt>
						<dd class="font-medium">{formatPower(car.specs.power)}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-gray-600">Mô-men xoắn</dt>
						<dd class="font-medium">{formatNumber(car.specs.torque)} Nm</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-gray-600">Tốc độ tối đa</dt>
						<dd class="font-medium">{car.specs.topSpeed} km/h</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-gray-600">Hệ dẫn động</dt>
						<dd class="font-medium">{car.specs.driveType}</dd>
					</div>
				</dl>
			</div>

			<!-- Battery & Charging -->
			<div class="card">
				<h3 class="mb-4 text-lg font-semibold text-gray-900">Pin & Sạc</h3>
				<dl class="space-y-3">
					<div class="flex justify-between">
						<dt class="text-gray-600">Dung lượng pin</dt>
						<dd class="font-medium">{formatBattery(car.specs.battery)}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-gray-600">Tầm xa</dt>
						<dd class="font-medium">{formatRange(car.specs.range)}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-gray-600">Sạc nhanh DC</dt>
						<dd class="font-medium">{car.specs.chargeTime.dc}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-gray-600">Sạc AC</dt>
						<dd class="font-medium">{car.specs.chargeTime.ac}</dd>
					</div>
				</dl>
			</div>

			<!-- Dimensions -->
			<div class="card">
				<h3 class="mb-4 text-lg font-semibold text-gray-900">Kích thước</h3>
				<dl class="space-y-3">
					<div class="flex justify-between">
						<dt class="text-gray-600">Dài x Rộng x Cao</dt>
						<dd class="font-medium">{formatNumber(car.specs.dimensions.length)} x {formatNumber(car.specs.dimensions.width)} x {formatNumber(car.specs.dimensions.height)} mm</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-gray-600">Chiều dài cơ sở</dt>
						<dd class="font-medium">{formatNumber(car.specs.dimensions.wheelbase)} mm</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-gray-600">Trọng lượng</dt>
						<dd class="font-medium">{formatNumber(car.specs.weight)} kg</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-gray-600">Số chỗ ngồi</dt>
						<dd class="font-medium">{car.specs.seats} chỗ</dd>
					</div>
				</dl>
			</div>

			<!-- Warranty -->
			<div class="card">
				<h3 class="mb-4 text-lg font-semibold text-gray-900">Bảo hành</h3>
				<dl class="space-y-3">
					<div class="flex justify-between">
						<dt class="text-gray-600">Bảo hành pin</dt>
						<dd class="font-medium">{car.specs.warranty}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-gray-600">Năm sản xuất</dt>
						<dd class="font-medium">{car.year}</dd>
					</div>
				</dl>
			</div>
		</div>
	</div>

	<!-- Features -->
	{#if car.features.length > 0}
		<div class="mt-12">
			<h2 class="text-2xl font-bold text-gray-900">Tính năng nổi bật</h2>
			<ul class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{#each car.features as feature}
					<li class="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3">
						<svg class="h-5 w-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
						<span class="text-gray-700">{feature}</span>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
