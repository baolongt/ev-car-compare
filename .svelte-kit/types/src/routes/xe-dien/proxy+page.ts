// @ts-nocheck
import type { PageLoad } from './$types';
import { allCars } from '$stores/filters';

export const load = () => {
	return {
		cars: allCars,
		totalCars: allCars.length
	};
};
;null as any as PageLoad;