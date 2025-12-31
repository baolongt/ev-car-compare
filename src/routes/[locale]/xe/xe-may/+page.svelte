<script lang="ts">
	import { t } from 'svelte-i18n';
	import {
		filteredMotorbikes,
		motorbikeFilters,
		resetMotorbikeFilters
	} from '$stores/motorbikes';
	import MotorbikeGrid from '$components/vehicle/motorbike-grid.svelte';
	import MotorbikeFilterPanel from '$components/vehicle/motorbike-filter-panel.svelte';

	let { data } = $props();

	let motorbikes = $state($filteredMotorbikes);

	$effect(() => {
		motorbikes = $filteredMotorbikes;
	});
</script>

<svelte:head>
	<title>{$t('seo.motorbikesTitle', { default: 'Electric Motorbikes | EV Compare' })}</title>
	<meta
		name="description"
		content={$t('seo.motorbikesDescription', { default: 'Browse and compare electric motorbikes in Vietnam' })}
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-gray-900">{$t('vehicle.motorbikes')}</h1>
		<p class="mt-2 text-gray-600">
			{$t('motorbike.listingSubtitle', { default: 'Explore {count} electric motorbikes from top brands', values: { count: data.totalMotorbikes } })}
		</p>
	</div>

	<div class="lg:grid lg:grid-cols-4 lg:gap-8">
		<div class="lg:col-span-1">
			<MotorbikeFilterPanel />
		</div>
		<div class="mt-6 lg:col-span-3 lg:mt-0">
			<div class="mb-4 flex items-center justify-between">
				<p class="text-sm text-gray-600">
					{$t('pages.showing', { default: 'Showing' })} <span class="font-medium">{motorbikes.length}</span> {$t('vehicle.motorbikes').toLowerCase()}
				</p>
			</div>
			<MotorbikeGrid {motorbikes} />
		</div>
	</div>
</div>
