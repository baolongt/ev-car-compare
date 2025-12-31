import type { PageLoad } from './$types';
import { allCars } from '$stores/filters';

export const load: PageLoad = () => {
	return {
		cars: allCars,
		totalCars: allCars.length
	};
};
