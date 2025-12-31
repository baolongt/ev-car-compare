<script lang="ts">
	import { t } from 'svelte-i18n';
	import { formatVND } from '$utils/format';
	import { generateCarSchema, generateBreadcrumbSchema } from '$utils/structured-data';
	import ImageGallery from '$components/car/image-gallery.svelte';
	import SpecTable from '$components/car/spec-table.svelte';
	import FeatureList from '$components/car/feature-list.svelte';
	import SimilarCars from '$components/car/similar-cars.svelte';

	let { data } = $props();
	let car = $derived(data.car);

	const carSchema = $derived(generateCarSchema(car));
	const breadcrumbSchema = $derived(
		generateBreadcrumbSchema([
			{ name: $t('nav.home'), url: '/' },
			{ name: $t('nav.cars'), url: '/xe-dien' },
			{ name: `${car.brand} ${car.model}` }
		])
	);
</script>

<svelte:head>
	<title>{car.brand} {car.model} {$t('seo.titleSuffix')}</title>
	<meta name="description" content={car.description} />
	<meta property="og:title" content={`${car.brand} ${car.model} - ${$t('header.siteName')}`} />
	<meta property="og:description" content={car.description} />
	{#if car.images[0]}
		<meta property="og:image" content={car.images[0]} />
	{/if}
	{@html `<script type="application/ld+json">${JSON.stringify(carSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`}
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Breadcrumb -->
	<nav class="mb-6 text-sm" aria-label="Breadcrumb">
		<ol class="flex items-center gap-2">
			<li><a href="/" class="text-gray-500 hover:text-gray-700">{$t('nav.home')}</a></li>
			<li class="text-gray-400">/</li>
			<li><a href="/xe-dien" class="text-gray-500 hover:text-gray-700">{$t('nav.cars')}</a></li>
			<li class="text-gray-400">/</li>
			<li class="font-medium text-gray-900">{car.brand} {car.model}</li>
		</ol>
	</nav>

	<div class="lg:grid lg:grid-cols-2 lg:gap-12">
		<!-- Image Gallery -->
		<div class="mb-8 lg:mb-0">
			<ImageGallery images={car.images} alt={`${car.brand} ${car.model}`} />
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

			<!-- Key Specs Quick View -->
			<div class="mt-8 grid grid-cols-3 gap-4">
				<div class="rounded-lg bg-gray-50 p-4 text-center">
					<p class="text-2xl font-bold text-gray-900">{car.specs.range}</p>
					<p class="text-sm text-gray-500">{$t('units.km')} {$t('common.range').toLowerCase()}</p>
				</div>
				<div class="rounded-lg bg-gray-50 p-4 text-center">
					<p class="text-2xl font-bold text-gray-900">{car.specs.battery}</p>
					<p class="text-sm text-gray-500">{$t('units.kwh')} {$t('common.battery').toLowerCase()}</p>
				</div>
				<div class="rounded-lg bg-gray-50 p-4 text-center">
					<p class="text-2xl font-bold text-gray-900">{car.specs.acceleration}s</p>
					<p class="text-sm text-gray-500">{$t('car.specs.acceleration')}</p>
				</div>
			</div>

			<!-- CTA Buttons -->
			<div class="mt-8 flex gap-4">
				<a href="/so-sanh?cars={car.id}" class="btn-primary flex-1 text-center">{$t('car.addToCompare')}</a>
				<a href="/tinh-gia?car={car.id}" class="btn-secondary flex-1 text-center">{$t('nav.calculator')}</a>
			</div>
		</div>
	</div>

	<!-- Specifications Table -->
	<div class="mt-12">
		<h2 class="text-2xl font-bold text-gray-900">{$t('car.specs')}</h2>
		<div class="mt-6">
			<SpecTable specs={car.specs} />
		</div>

		<!-- Warranty Info -->
		<div class="mt-6 rounded-lg border border-gray-200 p-4">
			<div class="flex items-center justify-between">
				<div>
					<h4 class="font-semibold text-gray-900">{$t('car.specs.warranty', { default: 'Warranty' })}</h4>
					<p class="text-gray-600">{car.specs.warranty}</p>
				</div>
				<div class="text-right">
					<h4 class="font-semibold text-gray-900">{$t('car.specs.year', { default: 'Year' })}</h4>
					<p class="text-gray-600">{car.year}</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Features -->
	{#if car.features.length > 0}
		<div class="mt-12">
			<h2 class="text-2xl font-bold text-gray-900">{$t('car.features')}</h2>
			<div class="mt-6">
				<FeatureList features={car.features} columns={4} />
			</div>
		</div>
	{/if}

	<!-- Similar Cars -->
	<div class="mt-12">
		<SimilarCars currentCar={car} />
	</div>
</div>
