<script lang="ts">
	import { t } from 'svelte-i18n';
	import type { Motorbike } from '$types/vehicle';
	import MotorbikeCard from './motorbike-card.svelte';

	interface Props {
		motorbikes: Motorbike[];
	}

	let { motorbikes }: Props = $props();
</script>

{#if motorbikes.length === 0}
	<div class="py-12 text-center">
		<p class="text-gray-500">{$t('car.noResults')}</p>
	</div>
{:else}
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each motorbikes as motorbike (motorbike.id)}
			<MotorbikeCard {motorbike} />
		{/each}
	</div>
{/if}
