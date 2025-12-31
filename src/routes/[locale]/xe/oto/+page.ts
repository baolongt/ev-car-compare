import type { PageLoad } from './$types';
import { allCars } from '$stores/filters';

export const load: PageLoad = () => {
	return {
		totalCars: allCars.length,
		vehicleType: 'car' as const
	};
};

export const prerender = true;
