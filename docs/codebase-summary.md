# EV Car Compare Vietnam - Codebase Summary

**Generated:** 2025-12-31
**Source:** repomix-output.xml
**Framework:** SvelteKit 2.15.0 + TypeScript 5.7.2

---

## Overview

This document provides a comprehensive technical reference for the EV Car Compare Vietnam codebase. See `project-overview-pdr.md` for high-level project goals and architecture overview.

---

## Directory Tree

```
src/
├── lib/
│   ├── components/
│   │   └── layout/
│   │       ├── footer.svelte           # Footer component
│   │       ├── header.svelte           # Header/navbar component
│   │       └── navigation.svelte       # Navigation menu
│   ├── types/
│   │   └── car.ts                      # Core TypeScript interfaces
│   └── utils/
│       ├── format.ts                   # Vietnamese formatting functions
│       ├── format.test.ts              # Format utility tests
│       ├── seo.ts                      # SEO meta tag utilities
│       └── seo.test.ts                 # SEO utility tests
├── routes/
│   ├── +layout.svelte                  # Root layout component
│   ├── +layout.ts                      # Prerender configuration
│   ├── +page.svelte                    # Homepage
│   ├── xe-dien/
│   │   └── +page.svelte                # EV listing page
│   ├── so-sanh/
│   │   └── +page.svelte                # Comparison tool page
│   └── tinh-gia/
│       └── +page.svelte                # Cost calculator page
├── app.html                            # HTML template
├── app.css                             # Global styles (Tailwind)
└── app.d.ts                            # Global type declarations

static/
└── favicon.png                         # Site favicon

build/                                  # Output directory (generated)
├── client/                             # Client-side assets
├── prerendered/                        # Static HTML pages
└── server/                             # Server chunks (not used in static mode)

Configuration Files:
├── svelte.config.js                    # SvelteKit configuration
├── vite.config.ts                      # Vite build configuration
├── vitest.config.ts                    # Test runner configuration
├── tsconfig.json                       # TypeScript configuration
├── tailwind.config.js                  # Tailwind CSS theme
├── postcss.config.js                   # PostCSS configuration
├── package.json                        # Dependencies and scripts
├── .gitignore                          # Git ignore rules
└── .repomixignore                      # Repomix ignore rules
```

---

## Core Modules

### Type Definitions (`src/lib/types/car.ts`)

#### CarSpecs Interface
Comprehensive electric vehicle specifications:
```typescript
battery: number;           // Battery capacity in kWh
range: number;             // Range in km (WLTP/NEDC standard)
power: number;             // Maximum power in hp
torque: number;            // Maximum torque in Nm
acceleration: number;      // 0-100 km/h time in seconds
topSpeed: number;          // Maximum speed in km/h
chargeTime: {              // Charging times
  dc: string;              // DC fast charge description
  ac: string;              // AC home charge description
}
dimensions: {              // Vehicle dimensions in mm
  length, width, height, wheelbase: number
}
weight: number;            // Curb weight in kg
seats: number;             // Number of seats
driveType: 'FWD'|'RWD'|'AWD';  // Drive configuration
warranty: string;          // Warranty information
```

#### Car Interface
Main car data model with:
- `id`, `slug`: Unique identifiers (slug for URLs)
- `brand`, `model`, `variant`, `year`: Vehicle identification
- `price`: VND pricing
- `specs`: CarSpecs object
- `images[]`: Image URLs
- `features[]`: Feature descriptions
- `description`: Marketing text
- `featured?`: Homepage feature flag

#### FilterState Interface
UI state for filtering:
```typescript
brands: string[];                      // Selected brand IDs
priceRange: [number, number];          // Min/max price VND
rangeKm: [number, number];             // Min/max range km
batteryKwh: [number, number];          // Min/max battery kWh
```

#### ComparisonState Interface
Comparison tool state:
```typescript
carIds: string[];                      // Selected car IDs
maxCars: number;                       // Maximum cars allowed
```

#### Vietnam-Specific Types
```typescript
interface VietnamFees {
  registrationFeePercent: number;      // Registration fee % of price
  licensePlateFee: number;             // License plate fee VND
  roadMaintenanceFee: number;          // Annual road tax VND
  inspectionFee: number;               // Annual inspection VND
  insurance: number;                   // Minimum insurance VND/year
}

interface Province {
  id: string;
  name: string;
  fees: VietnamFees;                   // Region-specific fees
}
```

---

### Utility Functions

#### Format Utilities (`src/lib/utils/format.ts`)

**Currency Formatting:**
```typescript
formatVND(amount: number): string
// Input: 1500000000
// Output: "1.500.000.000 ₫"

formatVNDCompact(amount: number): string
// Input: 1500000000
// Output: "1.5 tỷ" (compact display)
```

**Number Formatting:**
```typescript
formatNumber(num: number): string
// Vietnamese number formatting with thousand separators

formatRange(km: number): string
// Output: "500 km"

formatBattery(kwh: number): string
// Output: "100 kWh"

formatPower(hp: number): string
// Output: "300 HP"

formatAcceleration(seconds: number): string
// Output: "6.5s"

formatDimension(mm: number): string
// Output: "4.700 mm"
```

**Slug Generation:**
```typescript
slugify(text: string): string
// Converts Vietnamese text to URL-safe slugs
// Handles Vietnamese diacritics: à, á, ả, ã, ạ, etc.
// Example: "Tesla Model 3" → "tesla-model-3"
```

#### SEO Utilities (`src/lib/utils/seo.ts`)

**Meta Tag Generation:**
```typescript
pageTitle(title?: string): string
// Returns: "Title | So Sánh Xe Điện Việt Nam"

metaDescription(text: string): string
// Trims to max 160 characters, adds "..." if longer

ogMeta(data: SEOData): Record<string, string>
// Generates Open Graph meta tags for social sharing
// Includes: og:title, og:description, og:type, og:image, etc.
```

**Structured Data (JSON-LD):**
```typescript
carStructuredData(car: CarData): object
// Generates Schema.org structured data for vehicles
// Type: "Car" with Brand, Model, Offers, Price

websiteStructuredData(): object
// Generates site-wide structured data
// Includes SearchAction for site search
```

**Configuration Constants:**
```
SITE_NAME = "So Sánh Xe Điện Việt Nam"
BASE_URL = "https://xedien.vn"
```

---

### Layout Components

#### Header Component (`src/lib/components/layout/header.svelte`)
- Sticky top navigation bar (z-50)
- Logo: "EV" (blue) + "So Sánh" (text)
- Desktop navigation (hidden on mobile)
- Mobile hamburger menu toggle
- Responsive: flex layout on md+ screens
- Styling: Glass morphism effect (backdrop-blur)

#### Navigation Component (`src/lib/components/layout/navigation.svelte`)
- Desktop horizontal menu
- Mobile vertical menu (conditional)
- Navigation links (routes not yet specified)
- Responsive classes support

#### Footer Component (`src/lib/components/layout/footer.svelte`)
- Footer section (HTML semantic element)
- Not yet detailed in source

---

### Pages & Routes

#### Root Layout (`src/routes/+layout.svelte`)
```
<svelte:head>
  - meta name="robots" content="index, follow"
  - meta name="language" content="Vietnamese"
  - meta name="author" content="EV So Sánh"
</svelte:head>

<div class="flex min-h-screen flex-col">
  <Header />
  <main class="flex-1">
    {@render children()}
  </main>
  <Footer />
</div>
```
- Full-height layout with flexbox
- Sticky header and footer
- Content stretches to fill space

#### Route Configuration (`src/routes/+layout.ts`)
```typescript
export const prerender = true;         // Pre-render all pages
export const trailingSlash = 'never';  // Clean URLs (/page not /page/)
```

#### Homepage (`src/routes/+page.svelte`)
- Route: `/`
- Purpose: Landing page with featured vehicles
- Not yet detailed in source

#### EV Listing (`src/routes/xe-dien/+page.svelte`)
- Route: `/xe-dien` (Electric vehicles)
- Purpose: Browse and filter all EVs
- Features: Grid layout, filtering, search
- Not yet detailed in source

#### Comparison Tool (`src/routes/so-sanh/+page.svelte`)
- Route: `/so-sanh` (Compare)
- Purpose: Side-by-side vehicle comparison
- Features: Select vehicles, compare specs
- Not yet detailed in source

#### Cost Calculator (`src/routes/tinh-gia/+page.svelte`)
- Route: `/tinh-gia` (Calculate price)
- Purpose: Calculate total ownership cost in Vietnam
- Features: Province selection, fee breakdown
- Not yet detailed in source

---

## Styling & Configuration

### Tailwind CSS Theme (`tailwind.config.js`)

**Custom Colors:**
```javascript
primary: {
  50: '#eef9ff', 100: '#d9f1ff', 200: '#bce7ff',
  300: '#8edaff', 400: '#59c3ff', 500: '#33a6ff',
  600: '#1a88f5', 700: '#1470e1', 800: '#175ab6',
  900: '#194d8f', 950: '#142f57'
}
// Blue spectrum for main brand color

accent: {
  50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0',
  300: '#86efac', 400: '#4ade80', 500: '#22c55e',
  600: '#16a34a', 700: '#15803d', 800: '#166534',
  900: '#14532d', 950: '#052e16'
}
// Green spectrum for secondary/success states
```

**Typography:**
```javascript
fontFamily: {
  sans: ['Be Vietnam Pro', 'system-ui', 'sans-serif']
}
// Vietnamese-optimized font (Be Vietnam Pro)
```

**Content Paths:**
```javascript
content: ['./src/**/*.{html,js,svelte,ts}']
// Scans all source files for Tailwind classes
```

**Plugins:**
- `@tailwindcss/typography` - Prose classes for rich text

---

## Build & Development

### Vite Configuration (`vite.config.ts`)
```typescript
export default defineConfig({
  plugins: [sveltekit()]
});
```
- SvelteKit Vite plugin enabled
- Default Vite + SvelteKit optimizations

### SvelteKit Configuration (`svelte.config.js`)
```javascript
preprocess: vitePreprocess(),  // Vite-based preprocessing
adapter: adapter({             // Static site adapter
  pages: 'build',              // Output directory
  assets: 'build',             // Static assets location
  fallback: undefined,         // No SPA fallback
  precompress: false,          // No pre-compression
  strict: true                 // Deny unknown routes
})

alias: {                       // Path aliases
  $components → src/lib/components
  $stores → src/lib/stores
  $types → src/lib/types
  $utils → src/lib/utils
  $data → src/lib/data
}
```

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

Key settings:
- **strict: true** - Enforce all type checking rules
- **sourceMap: true** - Enable debugging
- **checkJs: true** - Type check JavaScript files
- **forceConsistentCasingInFileNames** - Prevent case-sensitivity issues

### Testing Configuration (`vitest.config.ts`)
- Unit testing framework for utilities and components
- Run: `npm run test`
- Coverage: `npm run test:coverage`

---

## Package Dependencies

### Dev Dependencies (Key)
- `@sveltejs/kit` ^2.15.0 - Framework
- `@sveltejs/adapter-static` ^3.0.6 - Static generation
- `@sveltejs/vite-plugin-svelte` ^5.0.0 - Build plugin
- `tailwindcss` ^3.4.17 - Styling
- `typescript` ^5.7.2 - Type system
- `vite` ^6.0.6 - Build tool
- `vitest` ^2.1.8 - Testing
- `@playwright/test` ^1.49.0 - E2E testing
- `svelte` ^5.14.1 - Framework
- `eslint` ^9.17.0 - Linting

### Type Definitions
- `@types/node` ^22.10.2 - Node.js types

---

## NPM Scripts

```bash
npm run dev              # Start Vite dev server (hot reload)
npm run build           # Build for production (static output)
npm run preview         # Preview production build locally
npm run check           # Type check and svelte-check
npm run check:watch     # Watch mode for type checking
npm run test            # Run unit tests with Vitest
npm run test:e2e        # Run E2E tests with Playwright
npm run test:coverage   # Generate test coverage report
```

---

## File Statistics

**Total Files:** 112 (including generated)
**Source Files:** ~20
**Build Artifacts:** ~92 (generated during build)

**Key Directories:**
- `.svelte-kit/` - SvelteKit build cache and generated files
- `build/` - Production output (static HTML/CSS/JS)
- `src/` - Source code
- `node_modules/` - Dependencies

---

## Import Aliases (Path Mapping)

| Alias | Path | Purpose |
|-------|------|---------|
| `$components` | `src/lib/components` | Reusable UI components |
| `$stores` | `src/lib/stores` | Svelte stores (state management) |
| `$types` | `src/lib/types` | TypeScript interfaces |
| `$utils` | `src/lib/utils` | Utility functions |
| `$data` | `src/lib/data` | Static data files |

**Usage:**
```typescript
import Header from '$components/layout/header.svelte';
import { formatVND } from '$utils/format';
import type { Car } from '$types/car';
```

---

## Code Organization Principles

1. **Feature-Based Structure:** Components grouped by feature
2. **Separation of Concerns:** Types, utils, and components separate
3. **Reusable Utilities:** Format and SEO logic extracted to utils
4. **Type Safety:** Full TypeScript strict mode
5. **CSS Organization:** Tailwind utilities + custom CSS
6. **Static Generation:** All pages pre-rendered at build time

---

## Testing Coverage

**Unit Tests:**
- `src/lib/utils/format.test.ts` - Format utility tests
- `src/lib/utils/seo.test.ts` - SEO utility tests

**E2E Tests:**
- Playwright tests for critical flows (setup complete)

**Type Checking:**
- svelte-check for component types
- TypeScript strict mode for all code

---

## Performance Considerations

1. **Static Generation:** Zero runtime for content delivery
2. **Tree Shaking:** Unused code removed during build
3. **CSS Purging:** Tailwind removes unused styles
4. **Image Optimization:** Use static images in `static/`
5. **Code Splitting:** SvelteKit automatic route code splitting
6. **Minification:** Vite minifies CSS, JS, and HTML

---

## Browser Support

- **Modern Browsers:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile:** iOS Safari 12+, Chrome Android
- **ES Target:** ES2020 (via TypeScript and Vite)

---

## Known Generated Files

These are automatically generated during build:

```
.svelte-kit/
├── generated/          # Type definitions and client code
├── output/             # Build artifacts
└── types/              # Generated types for routes
```

Do not manually edit generated files. Regenerate with `npm run build`.

---

## Next Steps for Developers

1. **Setup:** `npm install` then `npm run dev`
2. **Type Check:** `npm run check` (continuous: `npm run check:watch`)
3. **Testing:** `npm run test` or `npm run test:coverage`
4. **Build:** `npm run build` then `npm run preview`
5. **Add Features:** Create components in `src/lib/components/`
6. **Add Utilities:** Add functions to `src/lib/utils/`
7. **Add Routes:** Create files in `src/routes/`

---

**Last Generated:** 2025-12-31
**Based on:** repomix-output.xml v1.0
**SvelteKit Version:** 2.15.0
