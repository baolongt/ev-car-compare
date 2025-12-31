<script lang="ts">
	import type { FeeItem } from '$utils/calculator';
	import { formatVND } from '$utils/format';

	interface Props {
		item: FeeItem;
	}

	let { item }: Props = $props();
</script>

<div class="flex items-start justify-between py-3 {item.isExempt ? 'bg-green-50 -mx-4 px-4 rounded-lg' : ''}">
	<div class="flex-1">
		<p class="font-medium text-gray-900">{item.label}</p>
		{#if item.note}
			<p class="text-sm text-green-600">{item.note}</p>
		{/if}
	</div>
	<div class="text-right">
		{#if item.isExempt && item.originalAmount}
			<p class="text-sm text-gray-400 line-through">{formatVND(item.originalAmount)}</p>
			<p class="font-semibold text-green-600">Miễn phí</p>
		{:else}
			<p class="font-semibold text-gray-900">{formatVND(item.amount)}</p>
		{/if}
	</div>
</div>
