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
	const locales = ['vi', 'en'];
	const result = [];
	for (const locale of locales) {
		for (const car of allCars) {
			result.push({ locale, slug: car.slug });
		}
	}
	return result;
};

export const prerender = true;
