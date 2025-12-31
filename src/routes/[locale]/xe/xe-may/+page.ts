import type { PageLoad } from './$types';
import { allMotorbikes } from '$stores/motorbikes';

export const load: PageLoad = () => {
	return {
		totalMotorbikes: allMotorbikes.length,
		vehicleType: 'motorbike' as const
	};
};

export const prerender = true;
