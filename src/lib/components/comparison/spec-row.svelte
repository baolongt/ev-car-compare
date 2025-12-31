<script lang="ts">
	interface Props {
		label: string;
		values: (string | number)[];
		highlight?: boolean;
	}

	let { label, values, highlight = false }: Props = $props();

	// Check if values differ (for highlighting)
	const hasDifference = $derived.by(() => {
		if (values.length <= 1) return false;
		const firstVal = String(values[0]);
		return values.some((v) => String(v) !== firstVal);
	});
</script>

<tr class={highlight && hasDifference ? 'bg-yellow-50' : ''}>
	<td class="whitespace-nowrap py-3 pr-4 text-sm font-medium text-gray-600">{label}</td>
	{#each values as value, i}
		<td
			class="py-3 text-center text-sm {highlight && hasDifference
				? 'font-semibold text-gray-900'
				: 'text-gray-700'}"
		>
			{value}
		</td>
	{/each}
</tr>
