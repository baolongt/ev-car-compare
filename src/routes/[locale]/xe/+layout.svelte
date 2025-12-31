<script lang="ts">
	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	// Determine active vehicle type from URL
	const vehicleType = $derived(
		$page.url.pathname.includes('/xe-may') ? 'motorbike' : 'car'
	);
</script>

<!-- Vehicle type tabs -->
<div class="border-b border-gray-200 bg-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<nav class="-mb-px flex gap-6">
			<a
				href="/{$page.params.locale}/xe/oto"
				class="border-b-2 py-4 text-sm font-medium transition"
				class:border-primary-500={vehicleType === 'car'}
				class:text-primary-600={vehicleType === 'car'}
				class:border-transparent={vehicleType !== 'car'}
				class:text-gray-500={vehicleType !== 'car'}
			>
				{$t('vehicle.cars')}
			</a>
			<a
				href="/{$page.params.locale}/xe/xe-may"
				class="border-b-2 py-4 text-sm font-medium transition"
				class:border-primary-500={vehicleType === 'motorbike'}
				class:text-primary-600={vehicleType === 'motorbike'}
				class:border-transparent={vehicleType !== 'motorbike'}
				class:text-gray-500={vehicleType !== 'motorbike'}
			>
				{$t('vehicle.motorbikes')}
			</a>
		</nav>
	</div>
</div>

{@render children()}
