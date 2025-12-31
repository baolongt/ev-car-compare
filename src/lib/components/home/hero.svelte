<script lang="ts">
	import { t, locale } from 'svelte-i18n';

	let searchQuery = $state('');

	function handleSearch(e: SubmitEvent) {
		e.preventDefault();
		if (searchQuery.trim()) {
			window.location.href = `/${$locale}/xe-dien?q=${encodeURIComponent(searchQuery.trim())}`;
		}
	}

	// Parse hero title with highlight tag
	const heroTitle = $derived.by(() => {
		const title = $t('hero.title');
		const parts = title.split('{highlight}');
		if (parts.length === 1) return { before: title, highlight: '', after: '' };

		const [before, rest] = parts;
		const [highlight, after] = rest.split('{/highlight}');
		return { before, highlight, after };
	});
</script>

<section class="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 py-20 lg:py-32">
	<!-- Background Pattern -->
	<div class="absolute inset-0 opacity-10">
		<svg class="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
			<defs>
				<pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
					<path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5" />
				</pattern>
			</defs>
			<rect width="100" height="100" fill="url(#grid)" />
		</svg>
	</div>

	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
				{heroTitle.before}<span class="text-accent-400">{heroTitle.highlight}</span>{heroTitle.after}
			</h1>
			<p class="mx-auto mt-6 max-w-2xl text-lg text-primary-100">
				{$t('hero.subtitle')}
			</p>

			<!-- Search Box -->
			<form onsubmit={handleSearch} class="mx-auto mt-10 max-w-xl">
				<div class="flex gap-2">
					<div class="relative flex-1">
						<svg
							class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
						<input
							type="text"
							bind:value={searchQuery}
							placeholder={$t('hero.searchPlaceholder')}
							class="w-full rounded-lg border-0 py-4 pl-12 pr-4 text-gray-900 shadow-lg placeholder:text-gray-400 focus:ring-2 focus:ring-accent-500"
						/>
					</div>
					<button type="submit" class="rounded-lg bg-accent-500 px-6 py-4 font-semibold text-white shadow-lg transition hover:bg-accent-600">
						{$t('hero.searchButton')}
					</button>
				</div>
			</form>

			<!-- Quick Links -->
			<div class="mt-8 flex flex-wrap justify-center gap-4">
				<a href="/{$locale}/xe/oto" class="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20">
					{$t('vehicle.cars')}
				</a>
				<a href="/{$locale}/xe/xe-may" class="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20">
					{$t('vehicle.motorbikes')}
				</a>
				<a href="/{$locale}/so-sanh" class="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20">
					{$t('hero.compareCars')}
				</a>
				<a href="/{$locale}/tinh-gia" class="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20">
					{$t('hero.priceCalculator')}
				</a>
			</div>
		</div>
	</div>
</section>
