// @ts-nocheck
import type { PageLoad } from './$types';
import { getCarBySlug, allCars } from '$stores/filters';
import { error } from '@sveltejs/kit';

export const load = ({ params }: Parameters<PageLoad>[0]) => {
	const car = getCarBySlug(params.slug);

	if (!car) {
		throw error(404, 'Không tìm thấy xe');
	}

	return { car };
};

export const entries = () => {
	return allCars.map((car) => ({ slug: car.slug }));
};
