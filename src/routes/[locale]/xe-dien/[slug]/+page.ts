import type { PageLoad } from './$types';
import { getCarBySlug, allCars } from '$stores/filters';
import { error } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
	const car = getCarBySlug(params.slug);

	if (!car) {
		throw error(404, 'Car not found');
	}

	return { car };
};

export const entries = () => {
	// Generate entries for all locales and all car slugs
	const locales = ['vi', 'en'];
	const entries = [];
	for (const locale of locales) {
		for (const car of allCars) {
			entries.push({ locale, slug: car.slug });
		}
	}
	return entries;
};
