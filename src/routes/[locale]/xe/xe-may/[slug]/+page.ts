import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getMotorbikeBySlug, allMotorbikes } from '$stores/motorbikes';

export const load: PageLoad = ({ params }) => {
	const motorbike = getMotorbikeBySlug(params.slug);

	if (!motorbike) {
		throw error(404, 'Motorbike not found');
	}

	return { motorbike };
};

export const entries = () => {
	const locales = ['vi', 'en'];
	const result = [];
	for (const locale of locales) {
		for (const bike of allMotorbikes) {
			result.push({ locale, slug: bike.slug });
		}
	}
	return result;
};

export const prerender = true;
