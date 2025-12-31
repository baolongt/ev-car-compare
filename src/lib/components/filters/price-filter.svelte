<script lang="ts">
	import RangeSlider from '$components/ui/range-slider.svelte';
	import { formatVNDCompact } from '$utils/format';

	interface Props {
		value: [number, number];
		onchange: (value: [number, number]) => void;
	}

	let { value, onchange }: Props = $props();
</script>

<div class="space-y-2">
	<h3 class="text-sm font-medium text-gray-900">Giá (VND)</h3>
	<RangeSlider
		min={0}
		max={5000000000}
		step={100000000}
		{value}
		formatValue={formatVNDCompact}
		{onchange}
	/>
</div>
