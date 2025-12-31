/**
 * Format number as Vietnamese currency (VND)
 */
export function formatVND(amount: number): string {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
		maximumFractionDigits: 0
	}).format(amount);
}

/**
 * Format number as Vietnamese compact currency (e.g., 1.2 tỷ)
 */
export function formatVNDCompact(amount: number): string {
	if (amount >= 1_000_000_000) {
		return `${(amount / 1_000_000_000).toFixed(1).replace(/\.0$/, '')} tỷ`;
	}
	if (amount >= 1_000_000) {
		return `${(amount / 1_000_000).toFixed(0)} triệu`;
	}
	return formatVND(amount);
}

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number): string {
	return new Intl.NumberFormat('vi-VN').format(num);
}

/**
 * Format range in km
 */
export function formatRange(km: number): string {
	return `${formatNumber(km)} km`;
}

/**
 * Format battery capacity
 */
export function formatBattery(kwh: number): string {
	return `${kwh} kWh`;
}

/**
 * Format power in horsepower
 */
export function formatPower(hp: number): string {
	return `${formatNumber(hp)} HP`;
}

/**
 * Format acceleration time
 */
export function formatAcceleration(seconds: number): string {
	return `${seconds}s`;
}

/**
 * Format dimensions in mm
 */
export function formatDimension(mm: number): string {
	return `${formatNumber(mm)} mm`;
}

/**
 * Generate slug from Vietnamese string
 */
export function slugify(text: string): string {
	const vietnameseMap: Record<string, string> = {
		à: 'a', á: 'a', ả: 'a', ã: 'a', ạ: 'a',
		ă: 'a', ằ: 'a', ắ: 'a', ẳ: 'a', ẵ: 'a', ặ: 'a',
		â: 'a', ầ: 'a', ấ: 'a', ẩ: 'a', ẫ: 'a', ậ: 'a',
		đ: 'd',
		è: 'e', é: 'e', ẻ: 'e', ẽ: 'e', ẹ: 'e',
		ê: 'e', ề: 'e', ế: 'e', ể: 'e', ễ: 'e', ệ: 'e',
		ì: 'i', í: 'i', ỉ: 'i', ĩ: 'i', ị: 'i',
		ò: 'o', ó: 'o', ỏ: 'o', õ: 'o', ọ: 'o',
		ô: 'o', ồ: 'o', ố: 'o', ổ: 'o', ỗ: 'o', ộ: 'o',
		ơ: 'o', ờ: 'o', ớ: 'o', ở: 'o', ỡ: 'o', ợ: 'o',
		ù: 'u', ú: 'u', ủ: 'u', ũ: 'u', ụ: 'u',
		ư: 'u', ừ: 'u', ứ: 'u', ử: 'u', ữ: 'u', ự: 'u',
		ỳ: 'y', ý: 'y', ỷ: 'y', ỹ: 'y', ỵ: 'y'
	};

	return text
		.toLowerCase()
		.split('')
		.map((char) => vietnameseMap[char] || char)
		.join('')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}
