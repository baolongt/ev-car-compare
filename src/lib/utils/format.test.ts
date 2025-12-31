import { describe, it, expect } from 'vitest';
import {
	formatVND,
	formatVNDCompact,
	formatNumber,
	formatRange,
	formatBattery,
	formatPower,
	slugify
} from './format';

describe('formatVND', () => {
	it('formats number as VND currency', () => {
		expect(formatVND(1000000)).toContain('1.000.000');
	});

	it('handles large numbers', () => {
		expect(formatVND(1500000000)).toContain('1.500.000.000');
	});
});

describe('formatVNDCompact', () => {
	it('formats billion as tỷ', () => {
		expect(formatVNDCompact(1500000000)).toBe('1.5 tỷ');
	});

	it('formats million as triệu', () => {
		expect(formatVNDCompact(500000000)).toBe('500 triệu');
	});

	it('formats exact billion without decimal', () => {
		expect(formatVNDCompact(2000000000)).toBe('2 tỷ');
	});
});

describe('formatNumber', () => {
	it('adds thousand separators', () => {
		expect(formatNumber(12345)).toBe('12.345');
	});
});

describe('formatRange', () => {
	it('formats range with km suffix', () => {
		expect(formatRange(400)).toBe('400 km');
	});
});

describe('formatBattery', () => {
	it('formats battery with kWh suffix', () => {
		expect(formatBattery(82)).toBe('82 kWh');
	});
});

describe('formatPower', () => {
	it('formats power with HP suffix', () => {
		expect(formatPower(500)).toBe('500 HP');
	});
});

describe('slugify', () => {
	it('converts text to slug', () => {
		expect(slugify('Hello World')).toBe('hello-world');
	});

	it('handles Vietnamese characters', () => {
		expect(slugify('Xe điện Việt Nam')).toBe('xe-dien-viet-nam');
	});

	it('removes special characters', () => {
		expect(slugify('VinFast VF8+')).toBe('vinfast-vf8');
	});
});
