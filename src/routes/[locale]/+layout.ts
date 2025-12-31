import { locales } from '$lib/i18n';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => {
	const { locale } = params;

	if (!locales.includes(locale as any)) {
		throw error(404, 'Locale not found');
	}

	return { locale };
};
