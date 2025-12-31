<script lang="ts">
	interface Props {
		checked: boolean;
		label: string;
		onchange: (checked: boolean) => void;
	}

	let { checked, label, onchange }: Props = $props();
</script>

<label class="flex cursor-pointer items-center gap-2">
	<input
		type="checkbox"
		{checked}
		onchange={(e) => onchange(e.currentTarget.checked)}
		class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
	/>
	<span class="text-sm text-gray-700">{label}</span>
</label>
