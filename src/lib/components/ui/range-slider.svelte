<script lang="ts">
	interface Props {
		min: number;
		max: number;
		value: [number, number];
		step?: number;
		formatValue?: (v: number) => string;
		onchange: (value: [number, number]) => void;
	}

	let { min, max, value, step = 1, formatValue = (v) => String(v), onchange }: Props = $props();

	let minValue = $derived(value[0]);
	let maxValue = $derived(value[1]);

	function handleMinChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const newMin = Math.min(Number(target.value), value[1] - step);
		onchange([newMin, value[1]]);
	}

	function handleMaxChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const newMax = Math.max(Number(target.value), value[0] + step);
		onchange([value[0], newMax]);
	}
</script>

<div class="space-y-2">
	<div class="flex justify-between text-sm text-gray-600">
		<span>{formatValue(minValue)}</span>
		<span>{formatValue(maxValue)}</span>
	</div>
	<div class="relative h-2">
		<div class="absolute inset-0 rounded-full bg-gray-200"></div>
		<div
			class="absolute h-full rounded-full bg-primary-500"
			style="left: {((minValue - min) / (max - min)) * 100}%; right: {100 - ((maxValue - min) / (max - min)) * 100}%"
		></div>
		<input
			type="range"
			{min}
			{max}
			{step}
			value={minValue}
			oninput={handleMinChange}
			class="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600 [&::-webkit-slider-thumb]:shadow"
		/>
		<input
			type="range"
			{min}
			{max}
			{step}
			value={maxValue}
			oninput={handleMaxChange}
			class="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600 [&::-webkit-slider-thumb]:shadow"
		/>
	</div>
</div>
