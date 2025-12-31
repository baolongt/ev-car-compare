<script lang="ts">
	import { t } from 'svelte-i18n';
	import type { PriceBreakdown } from '$utils/calculator';
	import { getFeeItems, getSavingsMessage } from '$utils/calculator';
	import { formatVND } from '$utils/format';
	import FeeItem from './fee-item.svelte';

	interface Props {
		breakdown: PriceBreakdown;
	}

	let { breakdown }: Props = $props();

	const feeItems = $derived(getFeeItems(breakdown));
	const savingsMessage = $derived(getSavingsMessage(breakdown));
</script>

<div class="space-y-4">
	<!-- Savings Banner -->
	{#if savingsMessage}
		<div class="rounded-lg bg-green-100 p-4">
			<div class="flex items-start gap-3">
				<svg class="h-6 w-6 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<div>
					<p class="font-medium text-green-800">{savingsMessage}</p>
					<p class="mt-1 text-sm text-green-700">{breakdown.evExemptionNote}</p>
				</div>
			</div>
		</div>
	{/if}

	<!-- Fee Items -->
	<div class="divide-y divide-gray-100">
		{#each feeItems as item}
			<FeeItem {item} />
		{/each}
	</div>

	<!-- Total -->
	<div class="border-t-2 border-gray-200 pt-4">
		<div class="flex items-center justify-between">
			<p class="text-lg font-semibold text-gray-900">{$t('calculator.totalOnRoadPrice')}</p>
			<p class="text-2xl font-bold text-primary-600">{formatVND(breakdown.totalOnRoadPrice)}</p>
		</div>
		<p class="mt-1 text-sm text-gray-500">
			{$t('calculator.totalOnRoadPriceNote')}
		</p>
	</div>

	<!-- Summary Cards -->
	<div class="grid grid-cols-2 gap-4">
		<div class="rounded-lg bg-gray-50 p-4 text-center">
			<p class="text-sm text-gray-500">{$t('calculator.basePriceSummary')}</p>
			<p class="text-lg font-bold text-gray-900">{formatVND(breakdown.basePrice)}</p>
		</div>
		<div class="rounded-lg bg-gray-50 p-4 text-center">
			<p class="text-sm text-gray-500">{$t('calculator.feesSummary')}</p>
			<p class="text-lg font-bold text-gray-900">{formatVND(breakdown.totalFixedFees)}</p>
		</div>
	</div>
</div>
