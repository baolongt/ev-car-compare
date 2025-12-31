<script lang="ts">
	import Navigation from './navigation.svelte';

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<header class="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<a href="/" class="flex items-center gap-2">
				<span class="text-2xl font-bold text-primary-600">EV</span>
				<span class="text-lg font-medium text-gray-900">So Sánh</span>
			</a>

			<Navigation class="hidden md:flex" />

			<button
				type="button"
				class="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 md:hidden"
				aria-label="Menu"
				onclick={toggleMobileMenu}
			>
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					{#if mobileMenuOpen}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					{:else}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					{/if}
				</svg>
			</button>
		</div>
	</div>

	{#if mobileMenuOpen}
		<div class="border-t border-gray-200 bg-white md:hidden">
			<Navigation class="flex flex-col space-y-1 px-4 py-3" mobile />
		</div>
	{/if}
</header>
