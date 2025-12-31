<script lang="ts">
	import type { Province } from '$utils/calculator';
	import { getProvinces } from '$utils/calculator';

	interface Props {
		value: string;
		onchange: (provinceId: string) => void;
	}

	let { value, onchange }: Props = $props();

	const provinces = getProvinces();
</script>

<div>
	<label for="province" class="block text-sm font-medium text-gray-700">
		Tỉnh/Thành phố đăng ký
	</label>
	<select
		id="province"
		{value}
		onchange={(e) => onchange(e.currentTarget.value)}
		class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
	>
		{#each provinces as province}
			<option value={province.id}>{province.name}</option>
		{/each}
	</select>
	<p class="mt-1 text-xs text-gray-500">
		Phí trước bạ và biển số khác nhau theo từng tỉnh/thành
	</p>
</div>
