<script lang="ts">
	import { t } from 'svelte-i18n';
	import type { Brand } from '$types/car';
	import Checkbox from '$components/ui/checkbox.svelte';
	import brandsData from '$data/brands.json';

	interface Props {
		selected: string[];
		onchange: (brandId: string) => void;
	}

	let { selected, onchange }: Props = $props();

	const brands: Brand[] = brandsData as Brand[];
</script>

<div class="space-y-2">
	<h3 class="text-sm font-medium text-gray-900">{$t('filters.brand')}</h3>
	<div class="space-y-1">
		{#each brands as brand}
			<Checkbox
				label={brand.name}
				checked={selected.includes(brand.id)}
				onchange={() => onchange(brand.id)}
			/>
		{/each}
	</div>
</div>
