<script lang="ts">
	import { page } from '$app/stores';

	interface Props {
		class?: string;
		mobile?: boolean;
	}

	let { class: className = '', mobile = false }: Props = $props();

	const navItems = [
		{ href: '/', label: 'Trang chủ' },
		{ href: '/xe-dien', label: 'Xe điện' },
		{ href: '/so-sanh', label: 'So sánh' },
		{ href: '/tinh-gia', label: 'Tính giá' }
	];

	function isActive(href: string, currentPath: string): boolean {
		if (href === '/') return currentPath === '/';
		return currentPath.startsWith(href);
	}
</script>

<nav class={className}>
	{#each navItems as item}
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
