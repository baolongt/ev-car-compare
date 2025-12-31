export interface SEOData {
	title: string;
	description: string;
	keywords?: string[];
	image?: string;
	url?: string;
	type?: 'website' | 'article' | 'product';
}

const SITE_NAME = 'So Sánh Xe Điện Việt Nam';
const BASE_URL = 'https://xedien.vn';

/**
 * Generate page title with site name
 */
export function pageTitle(title?: string): string {
	if (!title) return SITE_NAME;
	return `${title} | ${SITE_NAME}`;
}

/**
 * Generate meta description (max 160 chars)
 */
export function metaDescription(text: string): string {
	if (text.length <= 160) return text;
	return text.slice(0, 157) + '...';
}

/**
 * Generate Open Graph meta tags
 */
export function ogMeta(data: SEOData): Record<string, string> {
	return {
		'og:title': data.title,
		'og:description': metaDescription(data.description),
		'og:type': data.type || 'website',
		'og:url': data.url || BASE_URL,
		'og:site_name': SITE_NAME,
		'og:locale': 'vi_VN',
		...(data.image && { 'og:image': data.image })
	};
}

/**
 * Generate car product structured data (JSON-LD)
 */
export function carStructuredData(car: {
	name: string;
	brand: string;
	model: string;
	description: string;
	price: number;
	image?: string;
	url: string;
}): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'Car',
		name: car.name,
		brand: {
			'@type': 'Brand',
			name: car.brand
		},
		model: car.model,
		description: car.description,
		vehicleTransmission: 'Electric',
		fuelType: 'Electric',
		offers: {
			'@type': 'Offer',
			priceCurrency: 'VND',
			price: car.price,
			availability: 'https://schema.org/InStock'
		},
		...(car.image && { image: car.image }),
		url: car.url
	};
}

/**
 * Generate website structured data (JSON-LD)
 */
export function websiteStructuredData(): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE_NAME,
		url: BASE_URL,
		description: 'So sánh và tìm kiếm xe điện phù hợp tại Việt Nam',
		inLanguage: 'vi-VN',
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${BASE_URL}/xe-dien?q={search_term_string}`
			},
			'query-input': 'required name=search_term_string'
		}
	};
}
