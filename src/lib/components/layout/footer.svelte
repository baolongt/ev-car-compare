<script lang="ts">
	import { t, locale } from 'svelte-i18n';

	const currentYear = new Date().getFullYear();

	const footerLinks = $derived([
		{
			title: $t('footer.explore'),
			links: [
				{ href: `/${$locale}/xe/oto`, label: $t('footer.allCars') },
				{ href: `/${$locale}/xe/xe-may`, label: $t('vehicle.motorbikes') },
				{ href: `/${$locale}/so-sanh`, label: $t('footer.compareCars') },
				{ href: `/${$locale}/tinh-gia`, label: $t('footer.priceCalculator') }
			]
		},
		{
			title: $t('footer.brands'),
			links: [
				{ href: `/${$locale}/xe/oto?brand=vinfast`, label: 'VinFast' },
				{ href: `/${$locale}/xe/oto?brand=byd`, label: 'BYD' },
				{ href: `/${$locale}/xe/oto?brand=tesla`, label: 'Tesla' },
				{ href: `/${$locale}/xe/oto?brand=hyundai`, label: 'Hyundai' }
			]
		}
	]);
</script>

<footer class="mt-auto border-t border-gray-200 bg-white">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
			<div class="col-span-2 md:col-span-1">
				<a href="/{$locale}" class="flex items-center gap-2">
					<span class="text-2xl font-bold text-primary-600">{$t('header.siteNameShort')}</span>
					<span class="text-lg font-medium text-gray-900">{$t('header.siteName').replace($t('header.siteNameShort') + ' ', '')}</span>
				</a>
				<p class="mt-4 text-sm text-gray-500">
					{$t('footer.about')}
				</p>
			</div>

			{#each footerLinks as section}
				<div>
					<h3 class="text-sm font-semibold text-gray-900">{section.title}</h3>
					<ul class="mt-4 space-y-2">
						{#each section.links as link}
							<li>
								<a href={link.href} class="text-sm text-gray-500 hover:text-gray-900">
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="mt-8 border-t border-gray-200 pt-8">
			<p class="text-center text-sm text-gray-500">
				{$t('footer.copyright', { values: { year: currentYear } })}
			</p>
		</div>
	</div>
</footer>
