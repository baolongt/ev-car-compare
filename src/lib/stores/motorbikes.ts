import { writable, derived } from 'svelte/store';
import type { Motorbike, Brand } from '$types/vehicle';
import motorbikesData from '$data/motorbikes.json';
import motorbikeBrandsData from '$data/motorbike-brands.json';

const motorbikes: Motorbike[] = motorbikesData as Motorbike[];
const motorbikeBrands: Brand[] = motorbikeBrandsData as Brand[];

interface MotorbikeFilterState {
	brands: string[];
	priceRange: [number, number];
	rangeKm: [number, number];
}

const defaultFilters: MotorbikeFilterState = {
	brands: [],
	priceRange: [0, 100000000], // 0-100M for motorbikes
	rangeKm: [0, 250]
};

export const motorbikeFilters = writable<MotorbikeFilterState>(defaultFilters);

export const filteredMotorbikes = derived(motorbikeFilters, ($filters) => {
	return motorbikes.filter((bike) => {
		if ($filters.brands.length > 0 && !$filters.brands.includes(bike.brand)) {
			return false;
		}
		if (bike.price < $filters.priceRange[0] || bike.price > $filters.priceRange[1]) {
			return false;
		}
		if (bike.specs.range < $filters.rangeKm[0] || bike.specs.range > $filters.rangeKm[1]) {
			return false;
		}
		return true;
	});
});

export const allMotorbikes = motorbikes;
export const allMotorbikeBrands = motorbikeBrands;

export function resetMotorbikeFilters() {
	motorbikeFilters.set(defaultFilters);
}

export function toggleMotorbikeBrand(brandId: string) {
	motorbikeFilters.update((f) => {
		const brands = f.brands.includes(brandId)
			? f.brands.filter((b) => b !== brandId)
			: [...f.brands, brandId];
		return { ...f, brands };
	});
}

export function setMotorbikePriceRange(range: [number, number]) {
	motorbikeFilters.update((f) => ({ ...f, priceRange: range }));
}

export function setMotorbikeRange(range: [number, number]) {
	motorbikeFilters.update((f) => ({ ...f, rangeKm: range }));
}

export function getMotorbikeBySlug(slug: string): Motorbike | undefined {
	return motorbikes.find((bike) => bike.slug === slug);
}

export function getFeaturedMotorbikes(): Motorbike[] {
	return motorbikes.filter((bike) => bike.featured);
}
