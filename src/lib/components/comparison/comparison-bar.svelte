<script lang="ts">
	import { t } from 'svelte-i18n';
	import { comparisonCars, removeFromComparison, clearComparison } from '$stores/comparison';
</script>

{#if $comparisonCars.length > 0}
	<div class="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-lg">
		<div class="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between gap-4">
				<!-- Selected cars -->
				<div class="flex items-center gap-3 overflow-x-auto">
					<span class="shrink-0 text-sm font-medium text-gray-600">
						{$t('comparison.title')} ({$comparisonCars.length}/3):
					</span>
					{#each $comparisonCars as car (car.id)}
						<div class="flex shrink-0 items-center gap-2 rounded-lg bg-gray-100 py-1 pl-1 pr-2">
							<img
								src={car.images[0] || '/images/placeholder-car.svg'}
								alt={`${car.brand} ${car.model}`}
								class="h-8 w-10 rounded object-cover"
							/>
							<span class="text-sm font-medium text-gray-700">{car.brand} {car.model}</span>
							<button
								onclick={() => removeFromComparison(car.id)}
								class="rounded-full p-0.5 text-gray-400 transition hover:bg-gray-200 hover:text-gray-600"
								aria-label={$t('common.remove') + ' ' + car.brand + ' ' + car.model}
							>
								<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					{/each}
				</div>

				<!-- Actions -->
				<div class="flex shrink-0 items-center gap-2">
					<button
						onclick={clearComparison}
						class="rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100"
					>
						{$t('common.clearAll')}
					</button>
					<a
						href="/so-sanh"
						class="btn-primary text-sm"
					>
						{$t('comparison.title')}
					</a>
				</div>
			</div>
		</div>
	</div>
	<!-- Spacer to prevent content from being hidden behind the bar -->
	<div class="h-16"></div>
{/if}
