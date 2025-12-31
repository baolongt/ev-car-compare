export interface CarSpecs {
	battery: number; // kWh
	range: number; // km (WLTP/NEDC)
	power: number; // hp
	torque: number; // Nm
	acceleration: number; // 0-100 km/h seconds
	topSpeed: number; // km/h
	chargeTime: {
		dc: string; // "30 phut (10-80%)"
		ac: string; // "8 gio"
	};
	dimensions: {
		length: number;
		width: number;
		height: number;
		wheelbase: number;
	};
	weight: number; // kg
	seats: number;
	driveType: 'FWD' | 'RWD' | 'AWD';
	warranty: string;
}

export interface Car {
	type?: 'car'; // Optional for backward compatibility
	id: string;
	slug: string;
	brand: string;
	model: string;
	variant?: string;
	year: number;
	price: number; // VND
	specs: CarSpecs;
	images: string[];
	features: string[];
	description: string;
	featured?: boolean;
}

export interface Brand {
	id: string;
	name: string;
	logo: string;
	country: string;
	website?: string;
}

export interface VietnamFees {
	registrationFeePercent: number; // % of car price
	licensePlateFee: number; // fixed VND
	roadMaintenanceFee: number; // annual VND
	inspectionFee: number; // VND
	insurance: number; // minimum required VND/year
}

export interface Province {
	id: string;
	name: string;
	fees: VietnamFees;
}

export interface FilterState {
	brands: string[];
	priceRange: [number, number];
	rangeKm: [number, number];
	batteryKwh: [number, number];
}

export interface ComparisonState {
	carIds: string[];
	maxCars: number;
}
