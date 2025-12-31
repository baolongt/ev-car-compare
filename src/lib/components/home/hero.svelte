<script lang="ts">
	let searchQuery = $state('');

	function handleSearch(e: SubmitEvent) {
		e.preventDefault();
		if (searchQuery.trim()) {
			window.location.href = `/xe-dien?q=${encodeURIComponent(searchQuery.trim())}`;
		}
	}
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
				So sánh <span class="text-accent-400">Xe Điện</span>
				<br class="hidden sm:block" />
				tại Việt Nam
			</h1>
			<p class="mx-auto mt-6 max-w-2xl text-lg text-primary-100">
				Tìm chiếc xe điện phù hợp với bạn. So sánh thông số kỹ thuật, giá cả và tính năng của các
				mẫu xe điện phổ biến nhất tại thị trường Việt Nam.
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
							placeholder="Tìm xe theo tên, hãng..."
							class="w-full rounded-lg border-0 py-4 pl-12 pr-4 text-gray-900 shadow-lg placeholder:text-gray-400 focus:ring-2 focus:ring-accent-500"
						/>
					</div>
					<button type="submit" class="rounded-lg bg-accent-500 px-6 py-4 font-semibold text-white shadow-lg transition hover:bg-accent-600">
						Tìm kiếm
					</button>
				</div>
			</form>

			<!-- Quick Links -->
			<div class="mt-8 flex flex-wrap justify-center gap-4">
				<a href="/xe-dien" class="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20">
					Xem tất cả xe điện
				</a>
				<a href="/so-sanh" class="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20">
					So sánh xe
				</a>
				<a href="/tinh-gia" class="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20">
					Tính giá lăn bánh
				</a>
			</div>
		</div>
	</div>
</section>
