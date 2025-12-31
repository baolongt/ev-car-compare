<script lang="ts">
	import { t } from 'svelte-i18n';
	import RangeSlider from '$components/ui/range-slider.svelte';

	interface Props {
		value: [number, number];
		onchange: (value: [number, number]) => void;
	}

	let { value, onchange }: Props = $props();

	function formatKm(v: number): string {
		return `${v} ${$t('units.km')}`;
	}
</script>

<div class="space-y-2">
	<h3 class="text-sm font-medium text-gray-900">{$t('filters.rangeKm')}</h3>
	<RangeSlider
		min={0}
		max={700}
		step={50}
		{value}
		formatValue={formatKm}
		{onchange}
	/>
</div>
