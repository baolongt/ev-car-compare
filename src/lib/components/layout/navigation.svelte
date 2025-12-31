<script lang="ts">
	import { t, locale } from 'svelte-i18n';
	import { page } from '$app/stores';

	interface Props {
		class?: string;
		mobile?: boolean;
	}

	let { class: className = '', mobile = false }: Props = $props();

	const navItems = $derived([
		{ href: `/${$locale}`, label: $t('nav.home'), key: 'home' },
		{ href: `/${$locale}/xe-dien`, label: $t('nav.cars'), key: 'cars' },
		{ href: `/${$locale}/so-sanh`, label: $t('nav.compare'), key: 'compare' },
		{ href: `/${$locale}/tinh-gia`, label: $t('nav.calculator'), key: 'calculator' }
	]);

	function isActive(href: string, currentPath: string): boolean {
		// Exact match for home
		if (href.endsWith(`/${$locale}`) || href === `/${$locale}`) {
			return currentPath === href || currentPath === `/${$locale}/`;
		}
		// Prefix match for other pages
		return currentPath.startsWith(href);
	}
</script>

<nav class={className}>
	{#each navItems as item (item.key)}
		<a
			href={item.href}
			class={[
				'text-sm font-medium transition-colors',
				mobile ? 'block rounded-lg px-3 py-2' : 'px-3 py-2',
				isActive(item.href, $page.url.pathname)
					? 'text-primary-600'
					: 'text-gray-600 hover:text-gray-900'
			].join(' ')}
		>
			{item.label}
		</a>
	{/each}
</nav>
