<script lang="ts">
	import { t } from 'svelte-i18n';
	import Hero from '$lib/components/home/hero.svelte';
	import FeaturedCars from '$lib/components/home/featured-cars.svelte';
	import Stats from '$lib/components/home/stats.svelte';
	import BrandLogos from '$lib/components/home/brand-logos.svelte';
</script>

<svelte:head>
	<title>{$t('seo.homeTitle')}</title>
	<meta name="description" content={$t('seo.homeDescription')} />
</svelte:head>

<Hero />
<FeaturedCars />
<Stats />
<BrandLogos />
