<script lang="ts">
	import { t } from 'svelte-i18n';
	import RangeSlider from '$components/ui/range-slider.svelte';

	interface Props {
		value: [number, number];
		onchange: (value: [number, number]) => void;
	}

	let { value, onchange }: Props = $props();

	function formatKwh(v: number): string {
		return `${v} ${$t('units.kwh')}`;
	}
</script>

<div class="space-y-2">
	<h3 class="text-sm font-medium text-gray-900">{$t('filters.batteryKwh')}</h3>
	<RangeSlider
		min={0}
		max={150}
		step={10}
		{value}
		formatValue={formatKwh}
		{onchange}
	/>
</div>
