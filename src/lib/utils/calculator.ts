import type { Car } from '$types/car';
import feesData from '$data/fees.json';

export interface Province {
	id: string;
	name: string;
	registrationRate: number;
	licensePlateFee: number;
}

export interface FixedFees {
	roadMaintenance: number;
	vehicleInspection: number;
	civilLiabilityInsurance: number;
	registrationCertificate: number;
	tempLicensePlate: number;
}

export interface PriceBreakdown {
	basePrice: number;
	registrationFee: number;
	registrationFeeBeforeExemption: number;
	licensePlateFee: number;
	roadMaintenance: number;
	vehicleInspection: number;
	civilLiabilityInsurance: number;
	registrationCertificate: number;
	tempLicensePlate: number;
	totalFixedFees: number;
	totalOnRoadPrice: number;
	evExemptionApplied: boolean;
	evExemptionNote: string;
}

export interface FeeItem {
	label: string;
	amount: number;
	note?: string;
	isExempt?: boolean;
	originalAmount?: number;
}

// Get all provinces
export function getProvinces(): Province[] {
	return feesData.provinces as Province[];
}

// Get province by ID
export function getProvinceById(provinceId: string): Province | undefined {
	return feesData.provinces.find((p) => p.id === provinceId) as Province | undefined;
}

// Get fixed fees
export function getFixedFees(): FixedFees {
	return feesData.fixedFees as FixedFees;
}

// Check if EV registration fee exemption is active
export function isEvExemptionActive(): boolean {
	const endDate = new Date(feesData.evIncentives.registrationFeeExemptionEndDate);
	return feesData.evIncentives.registrationFeeExemption && new Date() < endDate;
}

// Calculate on-road price for a car
export function calculateOnRoadPrice(car: Car, provinceId: string): PriceBreakdown {
	const province = getProvinceById(provinceId);
	if (!province) {
		throw new Error(`Province not found: ${provinceId}`);
	}

	const fixedFees = getFixedFees();
	const basePrice = car.price;
	const evExemptionApplied = isEvExemptionActive();

	// Registration fee (phí trước bạ) - exempt for EVs until 2027
	const registrationFeeBeforeExemption = Math.round(basePrice * province.registrationRate);
	const registrationFee = evExemptionApplied ? 0 : registrationFeeBeforeExemption;

	// License plate fee (phí cấp biển số)
	const licensePlateFee = province.licensePlateFee;

	// Fixed fees
	const roadMaintenance = fixedFees.roadMaintenance;
	const vehicleInspection = fixedFees.vehicleInspection;
	const civilLiabilityInsurance = fixedFees.civilLiabilityInsurance;
	const registrationCertificate = fixedFees.registrationCertificate;
	const tempLicensePlate = fixedFees.tempLicensePlate;

	// Total fixed fees
	const totalFixedFees =
		registrationFee +
		licensePlateFee +
		roadMaintenance +
		vehicleInspection +
		civilLiabilityInsurance +
		registrationCertificate +
		tempLicensePlate;

	// Total on-road price
	const totalOnRoadPrice = basePrice + totalFixedFees;

	return {
		basePrice,
		registrationFee,
		registrationFeeBeforeExemption,
		licensePlateFee,
		roadMaintenance,
		vehicleInspection,
		civilLiabilityInsurance,
		registrationCertificate,
		tempLicensePlate,
		totalFixedFees,
		totalOnRoadPrice,
		evExemptionApplied,
		evExemptionNote: evExemptionApplied ? feesData.evIncentives.note : ''
	};
}

// Get fee items for display
export function getFeeItems(breakdown: PriceBreakdown): FeeItem[] {
	const items: FeeItem[] = [
		{
			label: 'Giá xe niêm yết',
			amount: breakdown.basePrice
		},
		{
			label: 'Phí trước bạ',
			amount: breakdown.registrationFee,
			isExempt: breakdown.evExemptionApplied,
			originalAmount: breakdown.registrationFeeBeforeExemption,
			note: breakdown.evExemptionApplied ? 'Miễn phí cho xe điện' : undefined
		},
		{
			label: 'Phí cấp biển số',
			amount: breakdown.licensePlateFee
		},
		{
			label: 'Phí bảo trì đường bộ (năm đầu)',
			amount: breakdown.roadMaintenance
		},
		{
			label: 'Phí đăng kiểm',
			amount: breakdown.vehicleInspection
		},
		{
			label: 'Bảo hiểm TNDS',
			amount: breakdown.civilLiabilityInsurance
		},
		{
			label: 'Phí cấp giấy đăng ký',
			amount: breakdown.registrationCertificate
		},
		{
			label: 'Phí biển số tạm',
			amount: breakdown.tempLicensePlate
		}
	];

	return items;
}

// Format savings message
export function getSavingsMessage(breakdown: PriceBreakdown): string | null {
	if (!breakdown.evExemptionApplied) return null;

	const savings = breakdown.registrationFeeBeforeExemption;
	const formatted = new Intl.NumberFormat('vi-VN').format(savings);
	return `Bạn tiết kiệm ${formatted} VND nhờ chính sách miễn phí trước bạ cho xe điện!`;
}
