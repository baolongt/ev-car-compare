<script lang="ts">
	import { t } from 'svelte-i18n';

	interface Props {
		images: string[];
		alt: string;
	}

	let { images, alt }: Props = $props();
	let selectedIndex = $state(0);

	const displayImages = $derived(
		images.length > 0 ? images : ['/images/placeholder-car.svg']
	);

	function selectImage(index: number) {
		selectedIndex = index;
	}

	function nextImage() {
		selectedIndex = (selectedIndex + 1) % displayImages.length;
	}

	function prevImage() {
		selectedIndex = (selectedIndex - 1 + displayImages.length) % displayImages.length;
	}
</script>

<div class="space-y-4">
	<!-- Main Image -->
	<div class="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
		<img
			src={displayImages[selectedIndex]}
			alt={displayImages.length > 1 ? `${alt} - ${$t('car.imageAlt', { values: { index: selectedIndex + 1, total: displayImages.length } })}` : alt}
			class="h-full w-full object-cover"
		/>

		{#if displayImages.length > 1}
			<!-- Navigation Arrows -->
			<button
				onclick={prevImage}
				class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition hover:bg-white"
				aria-label={$t('car.prevImage')}
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			<button
				onclick={nextImage}
				class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition hover:bg-white"
				aria-label={$t('car.nextImage')}
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>

			<!-- Image Counter -->
			<div class="absolute bottom-2 right-2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
				{selectedIndex + 1} / {displayImages.length}
			</div>
		{/if}
	</div>

	<!-- Thumbnails -->
	{#if displayImages.length > 1}
		<div class="flex gap-2 overflow-x-auto pb-2">
			{#each displayImages as image, index}
				<button
					onclick={() => selectImage(index)}
					class="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition {selectedIndex === index
						? 'border-primary-500'
						: 'border-transparent hover:border-gray-300'}"
				>
					<img
						src={image}
						alt={`${alt} - ${$t('car.thumbnailAlt', { values: { index: index + 1 } })}`}
						class="h-full w-full object-cover"
					/>
				</button>
			{/each}
		</div>
	{/if}
</div>
