import type { Car } from '$types/car';

const SITE_NAME = 'So Sánh Xe Điện Việt Nam';
const SITE_URL = 'https://xedien.vn'; // Placeholder URL

export interface WebsiteSchema {
	'@context': string;
	'@type': string;
	name: string;
	url: string;
	description: string;
	inLanguage: string;
}

export interface ProductSchema {
	'@context': string;
	'@type': string;
	name: string;
	description: string;
	brand: {
		'@type': string;
		name: string;
	};
	image: string[];
	offers: {
		'@type': string;
		price: number;
		priceCurrency: string;
		availability: string;
		url: string;
	};
	aggregateRating?: {
		'@type': string;
		ratingValue: number;
		reviewCount: number;
	};
	vehicleConfiguration?: string;
	fuelType: string;
	vehicleEngine?: {
		'@type': string;
		enginePower: {
			'@type': string;
			value: number;
			unitCode: string;
		};
	};
}

export interface BreadcrumbSchema {
	'@context': string;
	'@type': string;
	itemListElement: Array<{
		'@type': string;
		position: number;
		name: string;
		item?: string;
	}>;
}

export function generateWebsiteSchema(): WebsiteSchema {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE_NAME,
		url: SITE_URL,
		description:
			'So sánh xe điện tại Việt Nam. Tìm kiếm, so sánh giá và thông số kỹ thuật của các mẫu xe điện phổ biến.',
		inLanguage: 'vi-VN'
	};
}

export function generateCarSchema(car: Car): ProductSchema {
	const schema: ProductSchema = {
		'@context': 'https://schema.org',
		'@type': 'Car',
		name: `${car.brand} ${car.model}${car.variant ? ` ${car.variant}` : ''}`,
		description: car.description,
		brand: {
			'@type': 'Brand',
			name: car.brand
		},
		image: car.images.length > 0 ? car.images : [`${SITE_URL}/images/placeholder-car.svg`],
		offers: {
			'@type': 'Offer',
			price: car.price,
			priceCurrency: 'VND',
			availability: 'https://schema.org/InStock',
			url: `${SITE_URL}/xe-dien/${car.slug}`
		},
		fuelType: 'Electric',
		vehicleEngine: {
			'@type': 'EngineSpecification',
			enginePower: {
				'@type': 'QuantitativeValue',
				value: car.specs.power,
				unitCode: 'HPS' // Horsepower
			}
		}
	};

	if (car.variant) {
		schema.vehicleConfiguration = car.variant;
	}

	return schema;
}

export function generateBreadcrumbSchema(
	items: Array<{ name: string; url?: string }>
): BreadcrumbSchema {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			...(item.url && { item: `${SITE_URL}${item.url}` })
		}))
	};
}

export function generateCarListSchema(cars: Car[]): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Danh sách xe điện tại Việt Nam',
		numberOfItems: cars.length,
		itemListElement: cars.map((car, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@type': 'Car',
				name: `${car.brand} ${car.model}`,
				url: `${SITE_URL}/xe-dien/${car.slug}`,
				image: car.images[0] || `${SITE_URL}/images/placeholder-car.svg`,
				offers: {
					'@type': 'Offer',
					price: car.price,
					priceCurrency: 'VND'
				}
			}
		}))
	};
}

export function schemaToScript(schema: object): string {
	return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}
