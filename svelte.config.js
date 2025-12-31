import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		alias: {
			$components: 'src/lib/components',
			$stores: 'src/lib/stores',
			$types: 'src/lib/types',
			$utils: 'src/lib/utils',
			$data: 'src/lib/data'
		},
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Ignore missing images during prerender
				if (path.startsWith('/images/')) {
					console.warn(`Missing image: ${path}`);
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
