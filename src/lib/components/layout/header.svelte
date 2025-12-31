<script lang="ts">
	import { t, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import Navigation from './navigation.svelte';

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function switchLocale(newLocale: string) {
		const currentPath = $page.url.pathname;
		const newPath = currentPath.replace(/^\/(vi|en)/, `/${newLocale}`);
		window.location.href = newPath;
	}
</script>

<header class="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<a href="/{$locale}" class="flex items-center gap-2">
				<span class="text-2xl font-bold text-primary-600">{$t('header.siteNameShort')}</span>
				<span class="text-lg font-medium text-gray-900">{$t('header.siteName').replace($t('header.siteNameShort') + ' ', '')}</span>
			</a>

			<div class="flex items-center gap-4">
				<Navigation class="hidden md:flex" />

				<!-- Language Switcher -->
				<div class="hidden items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1 md:flex">
					<button
						type="button"
						onclick={() => switchLocale('vi')}
						class={[
							'rounded px-2 py-1 text-xs font-medium transition',
							$locale === 'vi'
								? 'bg-white text-primary-600 shadow-sm'
								: 'text-gray-600 hover:text-gray-900'
						].join(' ')}
					>
						VI
					</button>
					<button
						type="button"
						onclick={() => switchLocale('en')}
						class={[
							'rounded px-2 py-1 text-xs font-medium transition',
							$locale === 'en'
								? 'bg-white text-primary-600 shadow-sm'
								: 'text-gray-600 hover:text-gray-900'
						].join(' ')}
					>
						EN
					</button>
				</div>
			</div>

			<button
				type="button"
				class="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 md:hidden"
				aria-label={$t('common.menu')}
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

			<!-- Mobile Language Switcher -->
			<div class="border-t border-gray-200 px-4 py-3">
				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={() => switchLocale('vi')}
						class={[
							'flex-1 rounded-lg px-3 py-2 text-sm font-medium transition',
							$locale === 'vi'
								? 'bg-primary-100 text-primary-600'
								: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
						].join(' ')}
					>
						Tiếng Việt
					</button>
					<button
						type="button"
						onclick={() => switchLocale('en')}
						class={[
							'flex-1 rounded-lg px-3 py-2 text-sm font-medium transition',
							$locale === 'en'
								? 'bg-primary-100 text-primary-600'
								: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
						].join(' ')}
					>
						English
					</button>
				</div>
			</div>
		</div>
	{/if}
</header>
