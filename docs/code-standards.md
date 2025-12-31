# EV Car Compare Vietnam - Code Standards & Guidelines

**Version:** 1.0.0
**Last Updated:** 2025-12-31
**Framework:** SvelteKit 2.15.0 with Svelte 5 & TypeScript 5.7.2

---

## Table of Contents

1. [TypeScript Standards](#typescript-standards)
2. [Svelte Component Guidelines](#svelte-component-guidelines)
3. [File Organization](#file-organization)
4. [Naming Conventions](#naming-conventions)
5. [Code Style Guide](#code-style-guide)
6. [Component Patterns](#component-patterns)
7. [Testing Standards](#testing-standards)
8. [Documentation Standards](#documentation-standards)
9. [Performance Best Practices](#performance-best-practices)
10. [Accessibility Standards](#accessibility-standards)

---

## TypeScript Standards

### Configuration

All code uses **strict TypeScript mode**:

```json
{
  "strict": true,
  "noImplicitAny": true,
  "noImplicitThis": true,
  "strictNullChecks": true,
  "strictFunctionTypes": true,
  "strictBindCallApply": true,
  "strictPropertyInitialization": true
}
```

### Type Annotations

**Required:** Always annotate function parameters and return types.

```typescript
// Good
function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

// Bad - missing types
function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}
```

### Interface Definitions

Use **PascalCase** for interface names. Export from `src/lib/types/` directory.

```typescript
// src/lib/types/car.ts
export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  price: number;
  specs: CarSpecs;
}

export interface CarSpecs {
  battery: number;
  range: number;
  power: number;
}
```

### Type Imports

Use `type` keyword for type-only imports:

```typescript
// Good
import type { Car } from '$types/car';

const car: Car = { /* ... */ };

// Acceptable - allows tree-shaking
import { type Car } from '$types/car';
```

### Utility Types

Leverage TypeScript utility types:

```typescript
// Partial, Required, Record, Omit, Pick, etc.
type CarPreview = Pick<Car, 'id' | 'brand' | 'model'>;
type PartialCar = Partial<Car>;
type CarIndex = Record<string, Car>;
```

---

## Svelte Component Guidelines

### Svelte 5 Runes

Use modern Svelte 5 syntax with **runes**:

```svelte
<script lang="ts">
  // State
  let count = $state(0);

  // Derived state
  let doubled = $derived(count * 2);

  // Effects
  $effect(() => {
    console.log(`Count changed to ${count}`);
  });

  function increment() {
    count++;
  }
</script>

<p>Count: {count}</p>
<p>Doubled: {doubled}</p>
<button onclick={increment}>+1</button>
```

### Component Props

Use `Props` interface for type-safe props:

```svelte
<script lang="ts">
  interface Props {
    title: string;
    count: number;
    onIncrement: () => void;
  }

  let { title, count, onIncrement }: Props = $props();
</script>

<div>
  <h2>{title}</h2>
  <p>Count: {count}</p>
  <button onclick={onIncrement}>Increment</button>
</div>
```

### Snippets (Preferred over Slots)

Use **snippets** instead of slots in Svelte 5:

```svelte
<script lang="ts">
  interface Props {
    items: string[];
    header: import('svelte').Snippet;
    item: import('svelte').Snippet<[string]>;
  }

  let { items, header, item }: Props = $props();
</script>

<div>
  {@render header()}
  <ul>
    {#each items as itemName}
      <li>{@render item(itemName)}</li>
    {/each}
  </ul>
</div>

<!-- Usage -->
<Component {items}>
  {#snippet header()}
    <h1>My List</h1>
  {/snippet}

  {#snippet item(name)}
    <span>{name}</span>
  {/snippet}
</Component>
```

### Event Handlers

Use **onXxx** syntax for event handlers:

```svelte
<script lang="ts">
  function handleClick(event: MouseEvent) {
    console.log('Clicked');
  }

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
  }
</script>

<button onclick={handleClick}>Click me</button>
<input onchange={handleChange} />
```

### Component Exports

Only export components via default export:

```svelte
<!-- src/lib/components/layout/Header.svelte -->
<script lang="ts">
  // Component logic
</script>

<!-- Component template -->
```

Import as:
```typescript
import Header from '$components/layout/header.svelte';
```

---

## File Organization

### Directory Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.svelte
│   │   │   ├── footer.svelte
│   │   │   └── navigation.svelte
│   │   └── [feature]/
│   │       ├── [Component].svelte
│   │       └── [SubComponent].svelte
│   ├── types/
│   │   ├── car.ts
│   │   └── [domain].ts
│   ├── utils/
│   │   ├── format.ts
│   │   ├── format.test.ts
│   │   └── [utility].ts
│   ├── stores/
│   │   └── [store].ts
│   └── data/
│       └── [static-data].ts
└── routes/
    ├── +layout.svelte
    ├── +layout.ts
    ├── +page.svelte
    ├── [route]/
    │   └── +page.svelte
    └── [route]/[param]/
        └── +page.svelte
```

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | kebab-case | `header.svelte`, `car-card.svelte` |
| Utilities | kebab-case | `format.ts`, `seo.ts` |
| Types | kebab-case | `car.ts`, `filter-state.ts` |
| Routes | kebab-case | `xe-dien`, `tinh-gia` |
| Test files | `.test.ts` suffix | `format.test.ts` |

---

## Naming Conventions

### Variables & Functions

Use **camelCase** for variables and functions:

```typescript
// Good
const carPrice: number = 1500000000;
const formatPrice = (price: number): string => { /* ... */ };
let isMobileMenuOpen = $state(false);

// Bad
const car_price = 1500000000;
const formatPrice_ = (price) => { /* ... */ };
```

### Constants

Use **UPPER_SNAKE_CASE** for constants:

```typescript
const SITE_NAME = 'So Sánh Xe Điện Việt Nam';
const BASE_URL = 'https://xedien.vn';
const MAX_COMPARISON_CARS = 4;
const VIETNAMESE_DIACRITICS: Record<string, string> = { /* ... */ };
```

### Types & Interfaces

Use **PascalCase** for types:

```typescript
interface Car { /* ... */ }
interface CarSpecs { /* ... */ }
type FilterState = { /* ... */ };
enum DriveType { FWD = 'FWD', RWD = 'RWD', AWD = 'AWD' }
```

### Classes (if used)

Use **PascalCase**:

```typescript
class CarDatabase { /* ... */ }
class PriceCalculator { /* ... */ }
```

### Boolean Variables

Prefix with `is`, `has`, `can`, `should`:

```typescript
let isMobileMenuOpen = $state(false);
let hasMoreResults = $state(true);
let canCompareMultiple = true;
let shouldShowLoader = false;
```

### Event Handlers

Prefix with `handle` or `on`:

```svelte
<script lang="ts">
  function handleClick() { /* ... */ }
  function onInputChange(event: Event) { /* ... */ }
</script>

<button onclick={handleClick}>Click</button>
<input onchange={onInputChange} />
```

---

## Code Style Guide

### Spacing & Formatting

1. **Indentation:** 2 spaces (configured in `.editorconfig`)
2. **Max Line Length:** 100 characters (soft limit)
3. **Semicolons:** Always required
4. **Quotes:** Single quotes for strings, double for JSX/templates

```typescript
const name = 'John';
const message = `Hello, ${name}!`;

// In attributes
<button class="px-4 py-2">Click</button>
```

### Import Organization

Order imports as:

```typescript
// 1. External packages
import { derived } from 'svelte/store';
import type { Config } from 'vite';

// 2. SvelteKit modules
import { error } from '@sveltejs/kit';

// 3. Internal modules
import Header from '$components/layout/header.svelte';
import { formatVND } from '$utils/format';
import type { Car } from '$types/car';

// 4. Relative imports (rarely used with aliases)
```

### Comments & Documentation

```typescript
/**
 * Format number as Vietnamese currency (VND)
 * @param amount - Amount in VND
 * @returns Formatted currency string
 * @example
 * formatVND(1500000000) // "1.500.000.000 ₫"
 */
export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(amount);
}
```

### Inline Comments

Use sparingly, only for non-obvious logic:

```typescript
// Good - explains "why", not "what"
// Regex handles Vietnamese diacritics which aren't normalized by default
const vietnameseMap: Record<string, string> = { /* ... */ };

// Bad - redundant comment
// Increment counter
count++;
```

---

## Component Patterns

### Layout Components

```svelte
<!-- src/lib/components/layout/header.svelte -->
<script lang="ts">
  import Navigation from './navigation.svelte';

  let mobileMenuOpen = $state(false);

  function toggleMobileMenu(): void {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<header class="sticky top-0 z-50 bg-white border-b">
  <!-- Header content -->
</header>
```

### Feature Components

```svelte
<!-- src/lib/components/[feature]/[Component].svelte -->
<script lang="ts">
  import type { Car } from '$types/car';
  import { formatVND } from '$utils/format';

  interface Props {
    car: Car;
    onSelect?: (id: string) => void;
  }

  let { car, onSelect }: Props = $props();

  function handleSelect(): void {
    onSelect?.(car.id);
  }
</script>

<div class="card">
  <h3>{car.brand} {car.model}</h3>
  <p>{formatVND(car.price)}</p>
  <button onclick={handleSelect}>Select</button>
</div>
```

### Data Fetching

In route `+page.ts` or `+layout.ts`:

```typescript
// src/routes/xe-dien/+page.ts
import type { Car } from '$types/car';

export async function load() {
  // Fetch cars from API or import from static data
  const cars: Car[] = await getCars();

  return {
    cars,
    pageTitle: 'Xe Điện Năng Lượng',
    description: 'Browse all electric vehicles available in Vietnam'
  };
}
```

In component:

```svelte
<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div>
  {#each data.cars as car (car.id)}
    <CarCard {car} />
  {/each}
</div>
```

---

## Testing Standards

### Unit Tests with Vitest

```typescript
// src/lib/utils/format.test.ts
import { describe, it, expect } from 'vitest';
import { formatVND, formatVNDCompact } from './format';

describe('formatVND', () => {
  it('formats numbers as Vietnamese currency', () => {
    expect(formatVND(1500000000)).toBe('1.500.000.000 ₫');
    expect(formatVND(0)).toBe('0 ₫');
  });

  it('handles negative numbers', () => {
    expect(formatVND(-1000000)).toBe('-1.000.000 ₫');
  });
});

describe('formatVNDCompact', () => {
  it('shows billions for large amounts', () => {
    expect(formatVNDCompact(1500000000)).toBe('1.5 tỷ');
  });

  it('shows millions for smaller amounts', () => {
    expect(formatVNDCompact(5000000)).toBe('5 triệu');
  });
});
```

### E2E Tests with Playwright

```typescript
// e2e/car-listing.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Car Listing', () => {
  test('should display cars on xe-dien page', async ({ page }) => {
    await page.goto('/xe-dien');
    const cars = await page.locator('.car-card').count();
    expect(cars).toBeGreaterThan(0);
  });

  test('should filter by brand', async ({ page }) => {
    await page.goto('/xe-dien');
    await page.selectOption('[name="brand"]', 'tesla');
    await page.waitForLoadState('networkidle');
    const cars = await page.locator('.car-card').count();
    expect(cars).toBeGreaterThan(0);
  });
});
```

### Test Conventions

1. **File Naming:** `*.test.ts` or `*.spec.ts`
2. **Structure:** Use `describe` blocks for grouping
3. **Coverage:** Aim for 80%+ coverage on utils
4. **Mocking:** Use `vitest.mock()` for dependencies
5. **Assertions:** Prefer `expect()` matchers

---

## Documentation Standards

### Code Comments

```typescript
/**
 * Generate car product structured data (JSON-LD)
 * Used for search engine indexing and rich snippets
 *
 * @param car - Car data object
 * @param car.name - Full car name
 * @param car.brand - Brand/manufacturer
 * @param car.price - Price in VND
 * @returns Schema.org Car structured data object
 *
 * @example
 * const data = carStructuredData({
 *   name: 'Tesla Model 3',
 *   brand: 'Tesla',
 *   price: 2000000000,
 *   url: 'https://xedien.vn/...'
 * });
 */
export function carStructuredData(car: CarData): object { /* ... */ }
```

### README Files

Create feature-specific READMEs:

```markdown
# Format Utilities

Provides Vietnamese-specific formatting functions.

## Functions

- `formatVND(amount)` - Format as VND currency
- `formatNumber(num)` - Add Vietnamese thousand separators
- `slugify(text)` - Convert Vietnamese text to URL slug

## Usage

```typescript
import { formatVND, slugify } from '$utils/format';
```
```

### Component Documentation

Document in component or via Storybook:

```svelte
<!-- src/lib/components/layout/header.svelte -->
<!--
  @component
  Main site header with responsive navigation.

  Usage:
  ```svelte
  <Header />
  ```

  Features:
  - Sticky positioning
  - Mobile hamburger menu
  - Glass morphism effect
-->
<script lang="ts">
  // ...
</script>
```

---

## Performance Best Practices

### Bundle Size

1. **Lazy Loading:** Code-split routes automatically with SvelteKit
2. **Dynamic Imports:** Use top-level for critical paths

```typescript
// Good - lazy load heavy components
const HeavyComponent = lazy(() => import('$components/heavy'));

// Bad - eager load everything
import HeavyComponent from '$components/heavy.svelte';
```

### Reactivity

1. **Derived State:** Use `$derived` instead of computed

```typescript
// Good - tracks dependency automatically
let doubled = $derived(count * 2);

// Bad - manual tracking required
let doubled: number;
$: doubled = count * 2;
```

2. **Effects:** Use `$effect` for side effects

```typescript
// Good
$effect(() => {
  if (count > 10) {
    console.warn('Count is high!');
  }
});
```

### Images

1. **Static Assets:** Place in `static/` directory
2. **Responsive:** Use `srcset` for different screen sizes

```html
<img
  src="/cars/tesla-model3.webp"
  srcset="/cars/tesla-model3-mobile.webp 400w,
          /cars/tesla-model3.webp 1000w"
  alt="Tesla Model 3"
/>
```

### CSS

1. **Purging:** Tailwind automatically removes unused styles
2. **Critical CSS:** Inline above-the-fold styles

```html
<style>
  :global(.above-fold) { /* critical styles */ }
</style>
```

---

## Accessibility Standards

### ARIA Attributes

```svelte
<button
  type="button"
  aria-label="Toggle mobile menu"
  aria-expanded={mobileMenuOpen}
  onclick={toggleMobileMenu}
>
  Menu
</button>
```

### Semantic HTML

```svelte
<!-- Good -->
<header>Navigation</header>
<main>Content</main>
<footer>Footer</footer>

<!-- Bad -->
<div class="header">Navigation</div>
<div class="main">Content</div>
<div class="footer">Footer</div>
```

### Color Contrast

- **WCAG AA:** Minimum 4.5:1 for text
- **WCAG AAA:** Minimum 7:1 for text
- Use tools: WebAIM Contrast Checker

### Keyboard Navigation

All interactive elements must be keyboard accessible:

```svelte
<button onclick={handleClick}>Click me</button>

<!-- Good - native button is keyboard accessible -->

<div onclick={handleClick}>Click me</div>

<!-- Bad - div needs role and keyboard handling -->
```

### Form Labels

```svelte
<!-- Good -->
<label for="brand-select">Select Brand:</label>
<select id="brand-select" name="brand">
  <option>Tesla</option>
</select>

<!-- Bad -->
<span>Select Brand:</span>
<select>
  <option>Tesla</option>
</select>
```

---

## Common Patterns

### State Management with Stores

```typescript
// src/lib/stores/comparison.ts
import { writable } from 'svelte/store';
import type { ComparisonState } from '$types/car';

function createComparison() {
  const { subscribe, set, update } = writable<ComparisonState>({
    carIds: [],
    maxCars: 4
  });

  return {
    subscribe,
    addCar: (id: string) => update(state => ({
      ...state,
      carIds: [...state.carIds, id]
    })),
    removeCar: (id: string) => update(state => ({
      ...state,
      carIds: state.carIds.filter(cid => cid !== id)
    })),
    clear: () => set({ carIds: [], maxCars: 4 })
  };
}

export const comparison = createComparison();
```

Usage:
```typescript
import { comparison } from '$stores/comparison';

comparison.addCar('tesla-model3');
comparison.removeCar('tesla-model3');
```

### Error Handling

```typescript
// In routes
import { error } from '@sveltejs/kit';

export function load({ params }) {
  if (!isValidCar(params.id)) {
    throw error(404, 'Car not found');
  }

  return {
    car: getCar(params.id)
  };
}
```

---

## Linting & Formatting

### ESLint Configuration

The project uses ESLint 9.17.0. Run:

```bash
npm run check          # Check and lint
npm run check:watch   # Watch mode
```

### Auto-fixing

```bash
npm run check -- --fix  # Auto-fix issues
```

---

## Summary Checklist

Before committing code:

- [ ] TypeScript strict mode passes (`npm run check`)
- [ ] Unit tests pass (`npm run test`)
- [ ] E2E tests pass (`npm run test:e2e`)
- [ ] No ESLint errors
- [ ] Comments added for complex logic
- [ ] Naming follows conventions
- [ ] Components use Svelte 5 runes
- [ ] Props typed with interface
- [ ] Accessibility attributes added
- [ ] Mobile-responsive design (if UI)
- [ ] Tests written (if logic)

---

**Last Updated:** 2025-12-31
**Framework:** SvelteKit 2.15.0
**Svelte Version:** 5.14.1
**TypeScript Version:** 5.7.2
