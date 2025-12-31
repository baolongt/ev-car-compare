import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import {
	filters,
	filteredCars,
	allCars,
	resetFilters,
	toggleBrand,
	setPriceRange,
	setRangeKm,
	setBatteryKwh,
	getCarBySlug,
	getFeaturedCars,
	getCarsByBrand
} from './filters';

describe('filters store', () => {
	beforeEach(() => {
		resetFilters();
	});

	it('has 20 cars in allCars', () => {
		expect(allCars.length).toBe(20);
	});

	it('returns all cars when no filters applied', () => {
		const cars = get(filteredCars);
		expect(cars.length).toBe(20);
	});

	it('filters by brand', () => {
		toggleBrand('vinfast');
		const cars = get(filteredCars);
		expect(cars.every((c) => c.brand === 'vinfast')).toBe(true);
		expect(cars.length).toBe(6); // VF3, VF5, VF6, VF7, VF8, VF9
	});

	it('filters by multiple brands', () => {
		toggleBrand('vinfast');
		toggleBrand('byd');
		const cars = get(filteredCars);
		expect(cars.every((c) => ['vinfast', 'byd'].includes(c.brand))).toBe(true);
	});

	it('toggles brand off', () => {
		toggleBrand('vinfast');
		toggleBrand('vinfast');
		const currentFilters = get(filters);
		expect(currentFilters.brands).not.toContain('vinfast');
	});

	it('filters by price range', () => {
		setPriceRange([500000000, 1000000000]);
		const cars = get(filteredCars);
		expect(cars.every((c) => c.price >= 500000000 && c.price <= 1000000000)).toBe(true);
	});

	it('filters by range km', () => {
		setRangeKm([400, 600]);
		const cars = get(filteredCars);
		expect(cars.every((c) => c.specs.range >= 400 && c.specs.range <= 600)).toBe(true);
	});

	it('filters by battery kWh', () => {
		setBatteryKwh([60, 90]);
		const cars = get(filteredCars);
		expect(cars.every((c) => c.specs.battery >= 60 && c.specs.battery <= 90)).toBe(true);
	});

	it('resets filters', () => {
		toggleBrand('vinfast');
		setPriceRange([500000000, 1000000000]);
		resetFilters();
		const cars = get(filteredCars);
		expect(cars.length).toBe(20);
	});
});

describe('getCarBySlug', () => {
	it('finds car by slug', () => {
		const car = getCarBySlug('vinfast-vf8');
		expect(car).toBeDefined();
		expect(car?.model).toBe('VF8');
	});

	it('returns undefined for unknown slug', () => {
		const car = getCarBySlug('unknown-car');
		expect(car).toBeUndefined();
	});
});

describe('getFeaturedCars', () => {
	it('returns featured cars', () => {
		const featured = getFeaturedCars();
		expect(featured.length).toBeGreaterThan(0);
		expect(featured.every((c) => c.featured === true)).toBe(true);
	});
});

describe('getCarsByBrand', () => {
	it('returns cars by brand', () => {
		const vinfast = getCarsByBrand('vinfast');
		expect(vinfast.length).toBe(6);
		expect(vinfast.every((c) => c.brand === 'vinfast')).toBe(true);
	});
});
