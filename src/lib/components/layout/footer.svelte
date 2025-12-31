<script lang="ts">
	const currentYear = new Date().getFullYear();

	const footerLinks = [
		{
			title: 'Khám phá',
			links: [
				{ href: '/xe-dien', label: 'Tất cả xe điện' },
				{ href: '/so-sanh', label: 'So sánh xe' },
				{ href: '/tinh-gia', label: 'Tính giá lăn bánh' }
			]
		},
		{
			title: 'Thương hiệu',
			links: [
				{ href: '/xe-dien?brand=vinfast', label: 'VinFast' },
				{ href: '/xe-dien?brand=byd', label: 'BYD' },
				{ href: '/xe-dien?brand=tesla', label: 'Tesla' },
				{ href: '/xe-dien?brand=hyundai', label: 'Hyundai' }
			]
		}
	];
</script>

<footer class="mt-auto border-t border-gray-200 bg-white">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
			<div class="col-span-2 md:col-span-1">
				<a href="/" class="flex items-center gap-2">
					<span class="text-2xl font-bold text-primary-600">EV</span>
					<span class="text-lg font-medium text-gray-900">So Sánh</span>
				</a>
				<p class="mt-4 text-sm text-gray-500">
					Nền tảng so sánh xe điện hàng đầu Việt Nam. Giúp bạn tìm chiếc xe điện phù hợp nhất.
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
				&copy; {currentYear} EV So Sánh. Tất cả thông tin chỉ mang tính tham khảo.
			</p>
		</div>
	</div>
</footer>
