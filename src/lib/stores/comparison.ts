import { writable, derived, get } from 'svelte/store';
import type { Car } from '$types/car';
import carsData from '$data/cars.json';

const cars: Car[] = carsData as Car[];
const MAX_COMPARE_CARS = 3;

// Store for selected car IDs
export const comparisonIds = writable<string[]>([]);

// Derived store for selected car objects
export const comparisonCars = derived(comparisonIds, ($ids) => {
	return $ids.map((id) => cars.find((car) => car.id === id)).filter((car): car is Car => !!car);
});

// Check if a car is in comparison
export function isInComparison(carId: string): boolean {
	return get(comparisonIds).includes(carId);
}

// Add car to comparison
export function addToComparison(carId: string): boolean {
	let added = false;
	comparisonIds.update((ids) => {
		if (ids.length >= MAX_COMPARE_CARS) {
			return ids;
		}
		if (ids.includes(carId)) {
			return ids;
		}
		added = true;
		return [...ids, carId];
	});
	return added;
}

// Remove car from comparison
export function removeFromComparison(carId: string) {
	comparisonIds.update((ids) => ids.filter((id) => id !== carId));
}

// Toggle car in comparison
export function toggleComparison(carId: string): boolean {
	let isNowInComparison = false;
	comparisonIds.update((ids) => {
		if (ids.includes(carId)) {
			return ids.filter((id) => id !== carId);
		}
		if (ids.length >= MAX_COMPARE_CARS) {
			return ids;
		}
		isNowInComparison = true;
		return [...ids, carId];
	});
	return isNowInComparison;
}

// Clear all comparison
export function clearComparison() {
	comparisonIds.set([]);
}

// Get car by ID
export function getCarById(carId: string): Car | undefined {
	return cars.find((car) => car.id === carId);
}

// Initialize comparison from URL params
export function initFromUrl(carIds: string[]) {
	const validIds = carIds.filter((id) => cars.some((car) => car.id === id)).slice(0, MAX_COMPARE_CARS);
	comparisonIds.set(validIds);
}

// Generate shareable URL params
export function getShareUrl(): string {
	const ids = get(comparisonIds);
	return ids.length > 0 ? `?cars=${ids.join(',')}` : '';
}

export { MAX_COMPARE_CARS };
