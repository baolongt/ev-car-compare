<script lang="ts">
	import { pageTitle } from '$utils/seo';
	import Hero from '$components/home/hero.svelte';
	import FeaturedCars from '$components/home/featured-cars.svelte';
	import Stats from '$components/home/stats.svelte';
	import BrandLogos from '$components/home/brand-logos.svelte';
</script>

<svelte:head>
	<title>{pageTitle()}</title>
	<meta
		name="description"
		content="So sánh xe điện tại Việt Nam. Tìm kiếm, so sánh giá và thông số kỹ thuật của VinFast, BYD, Tesla, Hyundai và các hãng xe điện khác."
	/>
	<meta property="og:title" content="So Sánh Xe Điện Việt Nam" />
	<meta
		property="og:description"
		content="Tìm chiếc xe điện phù hợp với bạn. So sánh thông số kỹ thuật, giá cả và tính năng của các mẫu xe điện phổ biến tại Việt Nam."
	/>
</svelte:head>

<Hero />
<Stats />
<FeaturedCars />
<BrandLogos />

<!-- CTA Section -->
<section class="bg-primary-600 py-16">
	<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="text-3xl font-bold text-white">Sẵn sàng tìm xe điện của bạn?</h2>
		<p class="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
			So sánh các mẫu xe điện phổ biến nhất và tính toán chi phí lăn bánh ngay hôm nay.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a href="/so-sanh" class="btn-secondary">So sánh xe ngay</a>
			<a
				href="/tinh-gia"
				class="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-primary-600"
			>
				Tính giá lăn bánh
			</a>
		</div>
	</div>
</section>
