/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Be Vietnam Pro', 'system-ui', 'sans-serif']
			},
			colors: {
				primary: {
					50: '#eef9ff',
					100: '#d9f1ff',
					200: '#bce7ff',
					300: '#8edaff',
					400: '#59c3ff',
					500: '#33a6ff',
					600: '#1a88f5',
					700: '#1470e1',
					800: '#175ab6',
					900: '#194d8f',
					950: '#142f57'
				},
				accent: {
					50: '#f0fdf4',
					100: '#dcfce7',
					200: '#bbf7d0',
					300: '#86efac',
					400: '#4ade80',
					500: '#22c55e',
					600: '#16a34a',
					700: '#15803d',
					800: '#166534',
					900: '#14532d',
					950: '#052e16'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
