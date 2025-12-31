<script lang="ts">
	import { t, locale } from 'svelte-i18n';
	import { page } from '$app/stores';

	interface Props {
		class?: string;
		mobile?: boolean;
	}

	let { class: className = '', mobile = false }: Props = $props();

	let vehicleDropdownOpen = $state(false);

	const navItems = $derived([
		{ href: `/${$locale}`, label: $t('nav.home'), key: 'home' },
		{ href: `/${$locale}/so-sanh`, label: $t('nav.compare'), key: 'compare' },
		{ href: `/${$locale}/tinh-gia`, label: $t('nav.calculator'), key: 'calculator' }
	]);

	const vehicleLinks = $derived([
		{ href: `/${$locale}/xe/oto`, label: $t('vehicle.cars'), key: 'cars' },
		{ href: `/${$locale}/xe/xe-may`, label: $t('vehicle.motorbikes'), key: 'motorbikes' }
	]);

	function isActive(href: string, currentPath: string): boolean {
		// Exact match for home
		if (href.endsWith(`/${$locale}`) || href === `/${$locale}`) {
			return currentPath === href || currentPath === `/${$locale}/`;
		}
		// Prefix match for other pages
		return currentPath.startsWith(href);
	}

	function isVehicleActive(currentPath: string): boolean {
		return currentPath.includes('/xe/oto') || currentPath.includes('/xe/xe-may') || currentPath.includes('/xe-dien');
	}
</script>

<nav class={className}>
	{#if mobile}
		<!-- Mobile Menu -->
		<a
			href={`/${$locale}`}
			class={[
				'text-sm font-medium transition-colors block rounded-lg px-3 py-2',
				isActive(`/${$locale}`, $page.url.pathname)
					? 'text-primary-600'
					: 'text-gray-600 hover:text-gray-900'
			].join(' ')}
		>
			{$t('nav.home')}
		</a>

		<!-- Vehicle links - expanded on mobile -->
		<div class="ml-3 space-y-1 border-l-2 border-gray-200 pl-3">
			{#each vehicleLinks as item (item.key)}
				<a
					href={item.href}
					class={[
						'text-sm font-medium transition-colors block rounded-lg px-3 py-2',
						isActive(item.href, $page.url.pathname)
							? 'text-primary-600'
							: 'text-gray-600 hover:text-gray-900'
					].join(' ')}
				>
					{item.label}
				</a>
			{/each}
		</div>

		{#each navItems as item (item.key)}
			<a
				href={item.href}
				class={[
					'text-sm font-medium transition-colors block rounded-lg px-3 py-2',
					isActive(item.href, $page.url.pathname)
						? 'text-primary-600'
						: 'text-gray-600 hover:text-gray-900'
				].join(' ')}
			>
				{item.label}
			</a>
		{/each}
	{:else}
		<!-- Desktop Menu -->
		<a
			href={`/${$locale}`}
			class={[
				'text-sm font-medium transition-colors px-3 py-2',
				isActive(`/${$locale}`, $page.url.pathname)
					? 'text-primary-600'
					: 'text-gray-600 hover:text-gray-900'
			].join(' ')}
		>
			{$t('nav.home')}
		</a>

		<!-- Vehicle Dropdown -->
		<div class="relative" role="group" onmouseenter={() => vehicleDropdownOpen = true} onmouseleave={() => vehicleDropdownOpen = false}>
			<button
				type="button"
				class={[
					'text-sm font-medium transition-colors px-3 py-2 flex items-center gap-1',
					isVehicleActive($page.url.pathname)
						? 'text-primary-600'
						: 'text-gray-600 hover:text-gray-900'
				].join(' ')}
			>
				{$t('nav.vehicles', { default: 'Vehicles' })}
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>
			{#if vehicleDropdownOpen}
				<div class="absolute left-0 mt-1 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
					<div class="py-1">
						{#each vehicleLinks as item (item.key)}
							<a
								href={item.href}
								class={[
									'block px-4 py-2 text-sm transition-colors',
									isActive(item.href, $page.url.pathname)
										? 'bg-primary-50 text-primary-600'
										: 'text-gray-700 hover:bg-gray-50'
								].join(' ')}
							>
								{item.label}
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		{#each navItems as item (item.key)}
			<a
				href={item.href}
				class={[
					'text-sm font-medium transition-colors px-3 py-2',
					isActive(item.href, $page.url.pathname)
						? 'text-primary-600'
						: 'text-gray-600 hover:text-gray-900'
				].join(' ')}
			>
				{item.label}
			</a>
		{/each}
	{/if}
</nav>
