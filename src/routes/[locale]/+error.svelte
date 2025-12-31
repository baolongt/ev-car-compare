<script lang="ts">
	import { t } from 'svelte-i18n';
	import { page } from '$app/stores';
</script>

<div class="flex min-h-[60vh] items-center justify-center px-4">
	<div class="text-center">
		<h1 class="text-6xl font-bold text-gray-300">{$page.status}</h1>
		<h2 class="mt-4 text-2xl font-semibold text-gray-900">
			{#if $page.status === 404}
				{$t('errors.pageNotFound')}
			{:else}
				{$t('errors.serverError')}
			{/if}
		</h2>
		<p class="mt-2 text-gray-500">
			{#if $page.status === 404}
				{$t('errors.pageNotFoundDescription')}
			{:else}
				{$t('errors.serverErrorDescription')}
			{/if}
		</p>
		<a
			href="/{$page.params.locale}"
			class="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition hover:bg-primary-700"
		>
			<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
			</svg>
			{$t('errors.backHome')}
		</a>
	</div>
</div>
