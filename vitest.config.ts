import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
	resolve: {
		alias: {
			$components: resolve(__dirname, 'src/lib/components'),
			$stores: resolve(__dirname, 'src/lib/stores'),
			$types: resolve(__dirname, 'src/lib/types'),
			$utils: resolve(__dirname, 'src/lib/utils'),
			$data: resolve(__dirname, 'src/lib/data')
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
