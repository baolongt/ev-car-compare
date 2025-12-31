import { writable, derived } from 'svelte/store';
import type { Car, FilterState } from '$types/car';
import carsData from '$data/cars.json';

const cars: Car[] = carsData as Car[];

const defaultFilters: FilterState = {
	brands: [],
	priceRange: [0, 5000000000],
	rangeKm: [0, 700],
	batteryKwh: [0, 150]
};

export const filters = writable<FilterState>(defaultFilters);

export const filteredCars = derived(filters, ($filters) => {
	return cars.filter((car) => {
		// Brand filter
		if ($filters.brands.length > 0 && !$filters.brands.includes(car.brand)) {
			return false;
		}

		// Price filter
		if (car.price < $filters.priceRange[0] || car.price > $filters.priceRange[1]) {
			return false;
		}

		// Range filter
		if (car.specs.range < $filters.rangeKm[0] || car.specs.range > $filters.rangeKm[1]) {
			return false;
		}

		// Battery filter
		if (car.specs.battery < $filters.batteryKwh[0] || car.specs.battery > $filters.batteryKwh[1]) {
			return false;
		}

		return true;
	});
});

export const allCars = cars;

export function resetFilters() {
	filters.set(defaultFilters);
}

export function toggleBrand(brandId: string) {
	filters.update((f) => {
		const brands = f.brands.includes(brandId)
			? f.brands.filter((b) => b !== brandId)
			: [...f.brands, brandId];
		return { ...f, brands };
	});
}

export function setPriceRange(range: [number, number]) {
	filters.update((f) => ({ ...f, priceRange: range }));
}

export function setRangeKm(range: [number, number]) {
	filters.update((f) => ({ ...f, rangeKm: range }));
}

export function setBatteryKwh(range: [number, number]) {
	filters.update((f) => ({ ...f, batteryKwh: range }));
}

export function getCarBySlug(slug: string): Car | undefined {
	return cars.find((car) => car.slug === slug);
}

export function getFeaturedCars(): Car[] {
	return cars.filter((car) => car.featured);
}

export function getCarsByBrand(brandId: string): Car[] {
	return cars.filter((car) => car.brand === brandId);
}
