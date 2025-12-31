import { describe, it, expect } from 'vitest';
import { pageTitle, metaDescription, ogMeta, carStructuredData, websiteStructuredData } from './seo';

describe('pageTitle', () => {
	it('returns site name when no title provided', () => {
		expect(pageTitle()).toBe('So Sánh Xe Điện Việt Nam');
	});

	it('appends site name to title', () => {
		expect(pageTitle('VinFast VF8')).toBe('VinFast VF8 | So Sánh Xe Điện Việt Nam');
	});
});

describe('metaDescription', () => {
	it('returns short text as-is', () => {
		const text = 'Short description';
		expect(metaDescription(text)).toBe(text);
	});

	it('truncates long text to 160 chars', () => {
		const longText = 'A'.repeat(200);
		const result = metaDescription(longText);
		expect(result.length).toBe(160);
		expect(result.endsWith('...')).toBe(true);
	});
});

describe('ogMeta', () => {
	it('generates Open Graph meta tags', () => {
		const meta = ogMeta({
			title: 'Test Title',
			description: 'Test description',
			type: 'product'
		});

		expect(meta['og:title']).toBe('Test Title');
		expect(meta['og:type']).toBe('product');
		expect(meta['og:locale']).toBe('vi_VN');
	});
});

describe('carStructuredData', () => {
	it('generates JSON-LD for a car', () => {
		const data = carStructuredData({
			name: 'VinFast VF8',
			brand: 'VinFast',
			model: 'VF8',
			description: 'SUV điện',
			price: 1300000000,
			url: 'https://xedien.vn/xe-dien/vinfast-vf8'
		}) as Record<string, unknown>;

		expect(data['@context']).toBe('https://schema.org');
		expect(data['@type']).toBe('Car');
		expect(data.fuelType).toBe('Electric');
	});
});

describe('websiteStructuredData', () => {
	it('generates website JSON-LD', () => {
		const data = websiteStructuredData() as Record<string, unknown>;

		expect(data['@type']).toBe('WebSite');
		expect(data.inLanguage).toBe('vi-VN');
	});
});
