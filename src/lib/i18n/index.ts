import { browser } from '$app/environment';
import { init, register, locale, waitLocale, getLocaleFromNavigator } from 'svelte-i18n';

// Import translations directly for SSR
import viTranslations from './vi.json';
import enTranslations from './en.json';

const defaultLocale = 'vi';

// Register with both sync (for SSR) and async (for code splitting)
register('vi', () => Promise.resolve(viTranslations));
register('en', () => Promise.resolve(enTranslations));

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
