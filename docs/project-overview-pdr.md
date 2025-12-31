# EV Car Compare Vietnam - Project Overview & PDR

## Project Overview

**Project Name:** EV Car Compare Vietnam
**Phase:** Phase 1 - Project Setup & Foundation
**Version:** 1.0.0
**Status:** Foundation Complete
**Last Updated:** 2025-12-31

### Vision
A comprehensive Vietnamese electric vehicle comparison platform enabling users to compare EV specifications, pricing, and ownership costs across major brands available in Vietnam.

### Key Features (Phase 1)
- EV listing and browsing (xe-dien)
- Side-by-side comparison tool (so-sanh)
- Cost calculator for Vietnamese ownership fees (tinh-gia)
- SEO-optimized static site generation
- Responsive mobile-first design
- Vietnamese language and localization support

---

## Technical Stack

### Frontend
- **Framework:** SvelteKit 2.15.0 (Modern reactive framework)
- **Language:** TypeScript 5.7.2 (Type safety)
- **Styling:** Tailwind CSS 3.4.17 (Utility-first)
- **Rendering:** Static site generation (SSG) via adapter-static
- **Font:** Be Vietnam Pro (Vietnamese-optimized typography)

### Build & Development
- **Build Tool:** Vite 6.0.6 (Lightning-fast)
- **Testing:** Vitest 2.1.8 (Unit), Playwright 1.49.0 (E2E)
- **Linting:** ESLint 9.17.0
- **Type Checking:** svelte-check 4.1.1

### Configuration
- **PostCSS:** autoprefixer + tailwindcss
- **TypeScript:** Strict mode enabled
- **Module System:** ES modules

---

## Project Structure

```
/home/contact/car-compare/
├── src/
│   ├── lib/
│   │   ├── components/layout/
│   │   │   ├── header.svelte          # Main navigation header
│   │   │   ├── footer.svelte          # Footer component
│   │   │   └── navigation.svelte      # Navigation menu (desktop/mobile)
│   │   ├── types/
│   │   │   └── car.ts                 # Core data interfaces
│   │   └── utils/
│   │       ├── format.ts              # Vietnamese formatting utilities
│   │       └── seo.ts                 # SEO meta tag generation
│   ├── routes/
│   │   ├── +layout.svelte             # App layout wrapper
│   │   ├── +layout.ts                 # Prerender config
│   │   ├── +page.svelte               # Homepage
│   │   ├── xe-dien/
│   │   │   └── +page.svelte           # EV listing page
│   │   ├── so-sanh/
│   │   │   └── +page.svelte           # Comparison tool page
│   │   └── tinh-gia/
│   │       └── +page.svelte           # Cost calculator page
│   ├── app.html                       # HTML template
│   ├── app.css                        # Global styles
│   └── app.d.ts                       # Global types
├── docs/
│   ├── project-overview-pdr.md        # This file
│   ├── codebase-summary.md            # Technical reference
│   ├── code-standards.md              # Development guidelines
│   └── system-architecture.md         # Architecture details
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── svelte.config.js                   # SvelteKit config
├── tailwind.config.js                 # Tailwind theme
└── vite.config.ts                     # Vite build config
```

---

## Core Data Models

### Car Interface
```typescript
interface Car {
  id: string;                    // Unique identifier
  slug: string;                  // URL-friendly name
  brand: string;                 // Brand name
  model: string;                 // Model name
  variant?: string;              // Model variant
  year: number;                  // Model year
  price: number;                 // VND
  specs: CarSpecs;              // Technical specifications
  images: string[];             // Image URLs
  features: string[];           // Feature list
  description: string;           // Marketing description
  featured?: boolean;            // Homepage feature flag
}

interface CarSpecs {
  battery: number;               // kWh
  range: number;                 // km (WLTP/NEDC)
  power: number;                 // hp
  torque: number;                // Nm
  acceleration: number;          // 0-100 km/h seconds
  topSpeed: number;              // km/h
  chargeTime: { dc: string; ac: string; };  // Charging times
  dimensions: { length, width, height, wheelbase };  // mm
  weight: number;                // kg
  seats: number;
  driveType: 'FWD' | 'RWD' | 'AWD';
  warranty: string;              // Warranty info
}
```

### Vietnam Fees Interface
```typescript
interface VietnamFees {
  registrationFeePercent: number;  // % of car price
  licensePlateFee: number;         // Fixed VND
  roadMaintenanceFee: number;      // Annual VND
  inspectionFee: number;           // VND
  insurance: number;               // Minimum required VND/year
}
```

---

## Key Features & Functionality

### 1. EV Listing (xe-dien route)
- Browse available electric vehicles
- Filter by brand, price, range, battery capacity
- View detailed specifications and features
- Responsive grid layout

### 2. Comparison Tool (so-sanh route)
- Select up to N vehicles for side-by-side comparison
- Compare specs, pricing, and features
- Interactive comparison table
- Export comparison data

### 3. Cost Calculator (tinh-gia route)
- Calculate total cost of ownership in Vietnam
- Province-specific registration and fees
- Include insurance and maintenance estimates
- Real-time cost breakdowns

### 4. SEO Optimization
- Open Graph meta tags for social sharing
- JSON-LD structured data for search engines
- Sitemap generation
- Meta descriptions (max 160 chars)
- Vietnamese language hints (og:locale: vi_VN)

---

## Development Workflow

### Scripts
```bash
npm run dev              # Start development server (port 5173)
npm run build           # Build static site
npm run preview         # Preview production build
npm run check           # Type check and lint
npm run check:watch     # Watch mode checking
npm run test            # Run unit tests
npm run test:e2e        # Run end-to-end tests
npm run test:coverage   # Generate coverage reports
```

### SvelteKit Aliases
- `$components` → `src/lib/components`
- `$stores` → `src/lib/stores`
- `$types` → `src/lib/types`
- `$utils` → `src/lib/utils`
- `$data` → `src/lib/data`

---

## Deployment Configuration

### Static Adapter Settings
- **Pages Directory:** `build/`
- **Assets Directory:** `build/`
- **Fallback:** `undefined` (no SPA fallback)
- **Precompress:** `false` (pre-compress assets)
- **Strict Mode:** `true` (deny unknown routes)

### Rendering Strategy
- **SSG (Static Site Generation):** All routes prerendered at build time
- **Trailing Slashes:** Never (clean URLs)
- **Output:** Fully static HTML/CSS/JS artifacts

---

## Typography & Design

### Color Palette
- **Primary Blue:** #33a6ff (Main brand color, 500-shade)
  - Range: 50 (lightest) to 950 (darkest)
  - Used for: Buttons, links, accents
- **Accent Green:** #22c55e (Secondary action color, 500-shade)
  - Used for: Success states, CTAs

### Font Family
- **Primary:** Be Vietnam Pro (Vietnamese-optimized sans-serif)
- **Fallback:** system-ui, sans-serif
- **Purpose:** Optimized readability for Vietnamese text

### Spacing & Layout
- **Max Width:** 7xl (80rem/1280px)
- **Responsive Padding:** 4-8 units
- **Mobile-First:** Hidden elements on small screens, visible on md+

---

## Performance & SEO

### Performance Targets
- **Build Time:** < 10s (vite with SvelteKit)
- **Static Output:** Zero JavaScript runtime in core features
- **Caching:** Browser caching via static assets
- **Prerendering:** All pages pre-generated at build time

### SEO Features
- Semantic HTML (header, main, footer)
- Meta robots: index, follow
- Language: Vietnamese (vi-VN)
- Open Graph tags for social sharing
- JSON-LD structured data
- XML sitemap (generated by adapter)

---

## Code Standards

### TypeScript
- Strict mode enabled
- All JavaScript files checked
- Source maps enabled
- CamelCase for variables/functions
- PascalCase for types/interfaces

### Naming Conventions
- **Components:** PascalCase (e.g., `Header.svelte`)
- **Files:** kebab-case (e.g., `+page.svelte`)
- **Variables:** camelCase
- **Constants:** UPPER_SNAKE_CASE
- **Routes:** kebab-case (e.g., `/xe-dien`)

### Svelte 5 Features
- Runes syntax (`$state`, `$derived`, `$effect`)
- Snippets over slots
- Event handlers: `onXxx` syntax
- No component state props needed with runes

---

## Functional Requirements (Phase 1)

| Requirement | Status | Notes |
|------------|--------|-------|
| EV database model | COMPLETE | Car, Brand, CarSpecs interfaces defined |
| Listing page | COMPLETE | xe-dien route with grid layout |
| Comparison tool | COMPLETE | so-sanh route with table view |
| Cost calculator | COMPLETE | tinh-gia route with fee breakdown |
| SEO utilities | COMPLETE | Meta tags, structured data generation |
| Format utilities | COMPLETE | Vietnamese currency, number formatting |
| Responsive design | COMPLETE | Mobile-first Tailwind CSS |
| Static deployment | COMPLETE | Fully prerendered static site |

---

## Non-Functional Requirements (Phase 1)

| Requirement | Status | Notes |
|------------|--------|-------|
| Type safety | COMPLETE | TypeScript strict mode |
| Performance | COMPLETE | Static rendering, minimal JS |
| SEO compliance | COMPLETE | Meta tags, structured data |
| Accessibility | IN PROGRESS | WCAG 2.1 compliance |
| Mobile responsiveness | COMPLETE | Tailwind responsive utilities |
| Internationalization | PLANNED | i18n setup for multiple languages |

---

## Testing Strategy

### Unit Tests
- **Framework:** Vitest
- **Coverage:** format.ts, seo.ts utilities
- **Run:** `npm run test`

### E2E Tests
- **Framework:** Playwright
- **Scope:** Critical user flows
- **Run:** `npm run test:e2e`

### Type Checking
- **Tool:** svelte-check
- **Mode:** Strict TypeScript
- **Run:** `npm run check`

---

## Known Limitations & Future Work

### Phase 2 Planned
- Backend API for dynamic car data
- User authentication
- Saved comparisons
- Price tracking and alerts
- Admin dashboard for data management

### Phase 3 Planned
- Advanced filtering and sorting
- User reviews and ratings
- Dealer locator
- Test drive booking
- Insurance integration

---

## Acceptance Criteria - Phase 1 Complete

- [x] SvelteKit project initialized with TypeScript
- [x] Tailwind CSS configured with custom color palette
- [x] Core data interfaces (Car, Brand, CarSpecs, etc.) defined
- [x] Layout components (Header, Footer, Navigation) created
- [x] Three main routes implemented:
  - [x] `/xe-dien` - EV listing
  - [x] `/so-sanh` - Comparison tool
  - [x] `/tinh-gia` - Cost calculator
- [x] Utility functions for formatting and SEO
- [x] Static site generation configured
- [x] Mobile-responsive design achieved
- [x] Documentation created and updated
- [x] Build and test scripts working

---

## Getting Started

### Development
```bash
npm install
npm run dev
```
Open http://localhost:5173

### Production Build
```bash
npm run build
npm run preview
```

### Type Checking
```bash
npm run check:watch
```

### Testing
```bash
npm run test
npm run test:coverage
npm run test:e2e
```

---

## Contact & Support

- **Project:** EV Car Compare Vietnam
- **Repository:** `/home/contact/car-compare`
- **Documentation:** `/home/contact/car-compare/docs/`

---

**Document Version:** 1.0.0
**Last Updated:** 2025-12-31 (UTC+7)
