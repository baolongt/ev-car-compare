<script lang="ts">
	import { t } from 'svelte-i18n';

	interface Props {
		features: string[];
		columns?: 2 | 3 | 4;
	}

	let { features, columns = 2 }: Props = $props();

	const gridCols = $derived({
		2: 'sm:grid-cols-2',
		3: 'sm:grid-cols-2 lg:grid-cols-3',
		4: 'sm:grid-cols-2 lg:grid-cols-4'
	}[columns]);
</script>

{#if features.length > 0}
	<ul class="grid gap-3 {gridCols}">
		{#each features as feature}
			<li class="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
				<svg class="h-5 w-5 flex-shrink-0 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
				<span class="text-gray-700">{feature}</span>
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-gray-500">{$t('car.noFeatures')}</p>
{/if}
