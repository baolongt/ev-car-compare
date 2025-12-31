import { browser } from '$app/environment';
import { init, register, locale, waitLocale } from 'svelte-i18n';

const defaultLocale = 'vi';

register('vi', () => import('./vi.json'));
register('en', () => import('./en.json'));

// Get locale from URL path on browser, default to 'vi'
function getInitialLocale(): string {
	if (browser) {
		const pathLocale = window.location.pathname.split('/')[1];
		if (pathLocale === 'vi' || pathLocale === 'en') {
			return pathLocale;
		}
	}
	return defaultLocale;
}

init({
	fallbackLocale: defaultLocale,
	initialLocale: getInitialLocale(),
});

export { locale, waitLocale };
export const locales = ['vi', 'en'] as const;
export type Locale = (typeof locales)[number];
