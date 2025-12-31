<script lang="ts">
	import { t, locale } from 'svelte-i18n';
	import type { Brand } from '$types/car';
	import brands from '$data/brands.json';

	const allBrands = brands as Brand[];
</script>

<section class="py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="text-center text-lg font-medium text-gray-500">{$t('home.brandsTitle')}</h2>
		<div class="mt-8 grid grid-cols-3 gap-8 sm:grid-cols-6">
			{#each allBrands as brand}
				<a
					href="/{$locale}/xe-dien?brand={brand.id}"
					class="group flex flex-col items-center justify-center rounded-lg p-4 transition hover:bg-gray-50"
				>
					<div class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white p-2 transition group-hover:bg-primary-50">
						<img
							src={brand.logo}
							alt="{brand.name} logo"
							class="h-full w-full object-contain"
						/>
					</div>
					<span class="mt-2 text-sm font-medium text-gray-600 group-hover:text-primary-600">
						{brand.name}
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>
