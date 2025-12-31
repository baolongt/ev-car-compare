<script lang="ts">
	import RangeSlider from '$components/ui/range-slider.svelte';

	interface Props {
		value: [number, number];
		onchange: (value: [number, number]) => void;
	}

	let { value, onchange }: Props = $props();

	function formatKwh(v: number): string {
		return `${v} kWh`;
	}
</script>

<div class="space-y-2">
	<h3 class="text-sm font-medium text-gray-900">Dung lượng pin</h3>
	<RangeSlider
		min={0}
		max={150}
		step={10}
		{value}
		formatValue={formatKwh}
		{onchange}
	/>
</div>
