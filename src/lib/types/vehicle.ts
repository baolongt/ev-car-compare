// Base vehicle type
export type VehicleType = 'car' | 'motorbike';

// Common specs shared by all vehicles
interface BaseSpecs {
	battery: number;
	range: number;
	power: number;
	topSpeed: number;
	weight: number;
	warranty: string;
}

// Car-specific specs
export interface CarSpecs extends BaseSpecs {
	torque: number;
	acceleration: number;
	chargeTime: { dc: string; ac: string };
	dimensions: { length: number; width: number; height: number; wheelbase: number };
	seats: number;
	driveType: 'FWD' | 'RWD' | 'AWD';
}

// Motorbike-specific specs
export interface MotorbikeSpecs extends BaseSpecs {
	chargeTime: string;
	maxLoad: number;
}

// Base vehicle interface
interface BaseVehicle {
	id: string;
	slug: string;
	brand: string;
	model: string;
	variant?: string;
	year: number;
	price: number;
	images: string[];
	features: string[];
	description: string;
	featured?: boolean;
}

export interface Car extends BaseVehicle {
	type: 'car';
	specs: CarSpecs;
}

export interface Motorbike extends BaseVehicle {
	type: 'motorbike';
	specs: MotorbikeSpecs;
}

export type Vehicle = Car | Motorbike;

// Re-export existing types for backward compatibility
export type { Brand, VietnamFees, Province, FilterState, ComparisonState } from './car';
