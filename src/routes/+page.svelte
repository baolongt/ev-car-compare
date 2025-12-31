<script lang="ts">
	import { pageTitle } from '$utils/seo';
</script>

<svelte:head>
	<title>{pageTitle()}</title>
	<meta
		name="description"
		content="So sánh xe điện tại Việt Nam. Tìm kiếm, so sánh giá và thông số kỹ thuật của VinFast, BYD, Tesla, Hyundai và các hãng xe điện khác."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="text-center">
		<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
			So sánh <span class="text-primary-600">Xe Điện</span> Việt Nam
		</h1>
		<p class="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
			Tìm chiếc xe điện phù hợp với bạn. So sánh thông số kỹ thuật, giá cả và tính năng của các mẫu
			xe điện phổ biến tại Việt Nam.
		</p>
		<div class="mt-10 flex justify-center gap-4">
			<a href="/xe-dien" class="btn-primary">Xem tất cả xe điện</a>
			<a href="/so-sanh" class="btn-secondary">So sánh xe</a>
		</div>
	</div>
</div>
