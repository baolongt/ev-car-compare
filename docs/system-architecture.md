# EV Car Compare Vietnam - System Architecture

**Version:** 1.0.0
**Last Updated:** 2025-12-31
**Project Phase:** Phase 1 - Foundation

---

## Architecture Overview

EV Car Compare Vietnam is a **static site generation (SSG) application** built with SvelteKit. All pages are pre-rendered at build time to HTML, CSS, and JavaScript, resulting in a fully static deployment with zero server-side processing.

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                         │
│                  (Static HTML/CSS/JS)                   │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ HTTP/HTTPS
                 ▼
┌─────────────────────────────────────────────────────────┐
│              Static Web Server / CDN                    │
│            (Vercel, Netlify, AWS S3+CF)                │
│                    (STATIC)                             │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ (Serves pre-rendered)
                 ▼
┌─────────────────────────────────────────────────────────┐
│            Build Output (build/)                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Prerendered Pages                                │  │
│  │ ├── index.html (/)                               │  │
│  │ ├── xe-dien.html (/xe-dien)                     │  │
│  │ ├── so-sanh.html (/so-sanh)                     │  │
│  │ └── tinh-gia.html (/tinh-gia)                   │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Client-Side Assets                               │  │
│  │ ├── CSS (minified)                               │  │
│  │ ├── JavaScript (minified, chunked)               │  │
│  │ └── Images (favicon, static)                     │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Framework & Language Layer

```
┌─────────────────────────────────────┐
│      SvelteKit 2.15.0              │
│  (Opinionated Svelte Meta-Framework)│
└────────────┬────────────────────────┘
             │
             ├─ File-based Routing
             ├─ Server-side Logic (+server.ts)
             ├─ Data Loading (+page.ts, +layout.ts)
             └─ SSG Prerendering
```

### Language & Type System

- **Svelte 5.14.1** - Reactive component framework with runes
- **TypeScript 5.7.2** - Strict static typing
- **JavaScript ES2020** - Target compiled by Vite

### Build & Development Tools

```
┌──────────────────────────────────────┐
│      Development Workflow            │
├──────────────────────────────────────┤
│ Dev Server: Vite 6.0.6               │
│ Build Tool: Vite (SSG via SvelteKit) │
│ Preprocess: vitePreprocess           │
│ Type Checking: TypeScript 5.7.2      │
│ Linting: ESLint 9.17.0               │
│ Testing: Vitest 2.1.8                │
│ E2E Testing: Playwright 1.49.0       │
└──────────────────────────────────────┘
```

### Styling Stack

```
Tailwind CSS 3.4.17
├─ Utility-first CSS framework
├─ Custom theme colors (primary blue, accent green)
├─ PostCSS processing
├─ Auto-purging unused styles
└─ Plugin: @tailwindcss/typography
```

---

## Application Layers

### 1. Routing & Pages Layer

**File-Based Routing (SvelteKit Convention):**

```
src/routes/
├── +layout.svelte        → Root layout for all pages
├── +layout.ts            → Global config (prerender, trailing slashes)
├── +page.svelte          → Homepage (/)
├── xe-dien/
│   └── +page.svelte      → EV Listing (/xe-dien)
├── so-sanh/
│   └── +page.svelte      → Comparison Tool (/so-sanh)
└── tinh-gia/
    └── +page.svelte      → Cost Calculator (/tinh-gia)
```

**Configuration in +layout.ts:**
```typescript
export const prerender = true;         // Static generation
export const trailingSlash = 'never';  // Clean URLs
```

**Root Layout Structure:**
```
html → <div class="flex min-h-screen flex-col">
  header (sticky, z-50)
  main (flex-1, grows to fill)
  footer
</div>
```

### 2. Components Layer

**Component Hierarchy:**

```
Layout Components (Layout)
├── Header
│   ├── Logo/Brand
│   ├── Navigation (responsive)
│   └── Mobile Menu Toggle
├── Navigation
│   ├── Desktop Menu
│   └── Mobile Menu
└── Footer

Feature Components (Routes)
├── EV Listing
├── Comparison Table
└── Cost Calculator

Utility Components
├── CarCard
├── SpecsTable
└── FilterBar
```

**Component Architecture:**

```
┌─ Component Tree ─┐
│                  │
├─ Svelte 5 Props │ → Snippet-based composition
├─ State ($state) │ → Reactive variables
├─ Derived ($derived) │ → Computed values
└─ Effects ($effect)  │ → Side effects
```

### 3. Type System Layer

**Type Hierarchy:**

```
Core Types (src/lib/types/car.ts)
├── Car
│   ├── id, slug, brand, model
│   ├── price (VND)
│   ├── specs (CarSpecs)
│   ├── images[], features[]
│   └── featured?
├── CarSpecs
│   ├── battery, range, power, torque
│   ├── acceleration, topSpeed
│   ├── chargeTime {dc, ac}
│   ├── dimensions {length, width, height, wheelbase}
│   ├── weight, seats, driveType
│   └── warranty
├── Brand
│   ├── id, name, logo
│   ├── country, website?
├── FilterState
│   ├── brands[]
│   ├── priceRange [min, max]
│   ├── rangeKm [min, max]
│   └── batteryKwh [min, max]
├── ComparisonState
│   ├── carIds[]
│   └── maxCars
└── VietnamFees / Province
    └── Region-specific registration & taxes
```

### 4. Utilities Layer

**Format Utilities (src/lib/utils/format.ts):**
```
Currency Formatting
├── formatVND(amount) → "1.500.000.000 ₫"
└── formatVNDCompact(amount) → "1.5 tỷ"

Number Formatting
├── formatNumber(num) → Vietnamese separators
└── formatRange(km) → "500 km"

Specifications Formatting
├── formatBattery(kwh) → "100 kWh"
├── formatPower(hp) → "300 HP"
├── formatAcceleration(sec) → "6.5s"
└── formatDimension(mm) → "4.700 mm"

Text Processing
└── slugify(text) → Vietnamese text → URL slug
```

**SEO Utilities (src/lib/utils/seo.ts):**
```
Meta Tags
├── pageTitle(title) → "Title | So Sánh Xe Điện Việt Nam"
├── metaDescription(text) → Max 160 chars
└── ogMeta(data) → Open Graph tags

Structured Data (JSON-LD)
├── carStructuredData(car) → Schema.org Car type
└── websiteStructuredData() → Schema.org WebSite
```

### 5. Data Layer

**Data Sources (Future Expansion):**
```
Phase 1: Static Data
├── TypeScript interfaces define structure
├── Data imported from .ts files
└── Pre-built at compile time

Phase 2+: Dynamic Data
├── REST API endpoints
├── Database queries
└── Real-time updates
```

---

## State Management

### Current Approach (Phase 1)

**Component-Local State (Svelte 5 Runes):**

```typescript
// Local reactive state
let count = $state(0);

// Derived reactive state
let doubled = $derived(count * 2);

// Side effects
$effect(() => {
  console.log(`Count is now ${count}`);
});
```

**Store Pattern (for shared state):**

```typescript
// src/lib/stores/comparison.ts
import { writable } from 'svelte/store';

export const comparison = writable<ComparisonState>({
  carIds: [],
  maxCars: 4
});
```

Usage:
```typescript
import { comparison } from '$stores/comparison';

// Subscribe
comparison.subscribe(state => {
  console.log(state.carIds);
});

// Update
comparison.update(s => ({ ...s, carIds: [...s.carIds, 'new-id'] }));
```

### Future State Management (Phase 2+)

**Planned Enhancements:**
- Persistent storage (localStorage)
- URL query parameters for filters
- Session management for saved comparisons
- Context API for theme/settings

---

## Data Flow Patterns

### Page Data Loading

```
User visits /xe-dien
      │
      ▼
SvelteKit Router
      │
      ▼
+page.ts load() function
  ├─ Fetch/import car data
  ├─ Validate parameters
  └─ Return PageData object
      │
      ▼
+page.svelte component
  ├─ Receives data prop
  ├─ Renders with data
  └─ Handles user interactions
      │
      ▼
Browser renders HTML
```

**Example:**
```typescript
// src/routes/xe-dien/+page.ts
export async function load() {
  const cars: Car[] = await fetchCars();

  return {
    cars,
    pageTitle: 'Xe Điện',
    metadata: { /* ... */ }
  };
}
```

```svelte
<!-- src/routes/xe-dien/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

{#each data.cars as car (car.id)}
  <CarCard {car} />
{/each}
```

### Component Communication

**Parent → Child (Props):**
```
Parent Component
  │
  ├─ Pass props: {car, onSelect}
  │
  ▼
Child Component
  interface Props { car: Car; onSelect?: () => void; }
```

**Child → Parent (Events):**
```
Child emits onclick
  │
  └─ Handler in parent updates state
```

**Sibling Communication (Stores):**
```
Component A updates store
  │
  ▼
Store notifies all subscribers
  │
  ▼
Component B receives update
```

---

## Build & Deployment Architecture

### Development Build

```
npm run dev
      │
      ▼
Vite Dev Server (port 5173)
      │
      ├─ Hot Module Replacement (HMR)
      ├─ TypeScript type checking
      └─ Live reload on file changes
```

### Production Build

```
npm run build
      │
      ▼
Vite Bundler + SvelteKit
      │
      ├─ Compile TypeScript
      ├─ Bundle CSS/JS
      ├─ Minify assets
      ├─ Prerender all routes
      │
      ▼
build/ directory
      │
      ├── /client
      │   ├─ Minified CSS
      │   ├─ Chunked JavaScript
      │   └─ Images/static assets
      │
      ├── /prerendered
      │   ├─ index.html
      │   ├─ xe-dien.html
      │   ├─ so-sanh.html
      │   └─ tinh-gia.html
      │
      └── manifest files
```

### Static Adapter Configuration

```javascript
// svelte.config.js
adapter: adapter({
  pages: 'build',          // Output directory
  assets: 'build',         // Static assets
  fallback: undefined,     // No SPA fallback (fully static)
  precompress: false,      // No asset compression
  strict: true             // Fail on unknown routes
})
```

### Deployment Options

**Suitable Platforms (Zero-Config):**
- **Vercel** - Native SvelteKit support
- **Netlify** - Drag-and-drop deployment
- **GitHub Pages** - Free static hosting
- **AWS S3 + CloudFront** - Global CDN
- **CloudFlare Pages** - Edge deployment
- **Any static web server** - Nginx, Apache, etc.

**Deployment Flow:**
```
GitHub Repository
      │
      ├─ Push code
      │
      ▼
CI/CD Pipeline
      │
      ├─ npm install
      ├─ npm run build
      ├─ npm run test
      │
      ▼
Static Files (build/)
      │
      ├─ Upload to CDN
      │
      ▼
Global Edge Distribution
      │
      ▼
Users get instant, cached responses
```

---

## Performance Architecture

### Static Site Benefits

1. **Zero Server Processing:**
   - All HTML pre-generated
   - No runtime compilation
   - No database queries on request

2. **Fast Content Delivery:**
   - CDN-friendly (immutable assets)
   - Browser caching enabled
   - Edge caching possible

3. **High Availability:**
   - No server to crash
   - Works offline (Service Workers)
   - Automatic failover

### Performance Optimizations

**Bundle Optimization:**
```
Source Files (TypeScript/Svelte)
      │
      ▼
Tree Shaking (remove unused code)
      │
      ▼
Code Splitting (per-route chunks)
      │
      ▼
Minification (CSS, JS, HTML)
      │
      ▼
Compression (gzip, brotli optional)
      │
      ▼
Optimized Build Output
```

**CSS Strategy:**
- **Tailwind CSS:** Scans all files, includes only used utilities
- **Global CSS:** Single `app.css` with @layer directives
- **Component CSS:** Scoped `<style>` blocks in components

**JavaScript Strategy:**
- **Route-based splitting:** Each route gets separate chunk
- **Vendor splitting:** Dependencies isolated
- **Dead code elimination:** Tree-shaking removes unused exports

---

## SEO Architecture

### Meta Tag Hierarchy

```
Page Level (in +page.svelte)
      │
      ├─ Meta title/description
      ├─ Open Graph tags
      └─ JSON-LD structured data
            │
            ▼
        Used by:
        ├─ Search engines (Googlebot, Bingbot)
        ├─ Social platforms (Facebook, Twitter)
        └─ Rich snippets in SERPs
```

### Structured Data Strategy

**Schema.org Types Used:**
1. **WebSite** - Site-level structured data
2. **Car** - Individual car product data
3. **SearchAction** - Site search capability

```javascript
// websiteStructuredData()
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "So Sánh Xe Điện Việt Nam",
  "url": "https://xedien.vn",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://xedien.vn/xe-dien?q={search_term_string}"
  }
}

// carStructuredData()
{
  "@context": "https://schema.org",
  "@type": "Car",
  "name": "Tesla Model 3",
  "brand": { "@type": "Brand", "name": "Tesla" },
  "fuelType": "Electric",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "VND",
    "price": 2000000000
  }
}
```

---

## Testing Architecture

### Test Pyramid

```
         /\
        /  \  E2E (Critical user flows)
       /────\  Playwright
      /      \
     /────────\  Integration Tests (components + logic)
    /          \  Vitest + svelte-check
   /────────────\
  /              \  Unit Tests (utilities, functions)
 /────────────────\  Vitest
────────────────────

Coverage: Aim for 80%+
```

### Test Strategy

**Unit Tests:**
```typescript
// Test utilities in isolation
describe('formatVND', () => {
  it('formats currency correctly', () => {
    expect(formatVND(1000000)).toBe('1.000.000 ₫');
  });
});
```

**E2E Tests:**
```typescript
// Test user workflows
test('user can compare cars', async ({ page }) => {
  await page.goto('/xe-dien');
  await page.click('car-card:first-child');
  await page.click('compare-button');
  expect(page.url()).toContain('/so-sanh');
});
```

**Type Checking:**
```bash
npm run check  # svelte-check + TypeScript
```

---

## Error Handling

### Error Boundaries

**In Routes:**
```typescript
// src/routes/+page.ts
export async function load() {
  try {
    const cars = await fetchCars();
    return { cars };
  } catch (e) {
    throw error(500, 'Failed to load cars');
  }
}
```

**In Components:**
```svelte
<script lang="ts">
  try {
    // Component logic
  } catch (e) {
    console.error('Component error:', e);
  }
</script>
```

### User-Facing Errors

- Invalid routes → 404 page
- Failed data loading → Error message
- Browser validation → Form error display

---

## Scaling Considerations

### Phase 2+ Expansion

**Database Layer (Future):**
```
PostgreSQL / MongoDB
      │
      ├─ Car catalog
      ├─ User data
      └─ Comparison history
```

**API Layer (Future):**
```
REST API / GraphQL
      │
      ├─ GET /api/cars
      ├─ POST /api/comparisons
      └─ Authentication endpoints
```

**Static Hybrid (Recommended):**
```
├─ Static pages (prerendered)
│   └─ Home, car listings
│
└─ Dynamic API (serverless)
    └─ User interactions, data updates
```

---

## Security Considerations

### Current (Phase 1)

- **Static content** - No injection attacks
- **No database** - No SQL injection
- **No authentication** - Public read-only

### Future (Phase 2+)

**Planned Security:**
- CSRF protection for forms
- Rate limiting on APIs
- Input validation and sanitization
- Secure password hashing (Argon2)
- JWT token management
- HTTPS enforcement
- CSP headers
- XSS prevention

---

## Monitoring & Analytics

### Recommended Services

- **Analytics:** Google Analytics, Plausible
- **Performance:** Web Vitals, Lighthouse
- **Error Tracking:** Sentry, LogRocket
- **Uptime:** UptimeRobot, Pingdom

### Metrics to Track

- Page load time
- Time to First Contentful Paint (FCP)
- Cumulative Layout Shift (CLS)
- Largest Contentful Paint (LCP)
- User interactions (clicks, filters)
- Comparison creations
- Search queries

---

## Architecture Decision Records (ADR)

### ADR-001: Static Site Generation over Server-Rendered

**Decision:** Use SSG (pre-rendering) over Server-Side Rendering (SSR)

**Rationale:**
- Faster page loads (pre-built HTML)
- Reduced hosting costs (no servers)
- Better SEO (HTML at request time)
- Simpler deployment
- Higher availability

**Tradeoff:** Real-time data requires API + JavaScript update

### ADR-002: SvelteKit over Other Frameworks

**Decision:** Use SvelteKit + Svelte 5

**Rationale:**
- Reactive by default (runes)
- Built-in SSG support
- Excellent DX (TypeScript + components)
- Small bundle size
- Vietnamese community growing

### ADR-003: Tailwind CSS for Styling

**Decision:** Use Tailwind CSS utility-first framework

**Rationale:**
- Rapid UI development
- Consistent design system
- Easy customization for Vietnamese theme
- Built-in responsive design
- Excellent for static sites

---

## System Health Checklist

- [ ] All routes prerender successfully
- [ ] TypeScript strict mode passes
- [ ] Tests pass (unit + e2E)
- [ ] ESLint passes
- [ ] Bundle size < 100KB gzipped
- [ ] Lighthouse score > 90
- [ ] Mobile responsive works
- [ ] SEO meta tags present
- [ ] No console errors in production

---

**Last Updated:** 2025-12-31
**Framework Versions:** SvelteKit 2.15.0, Svelte 5.14.1, TypeScript 5.7.2
**Deployment Ready:** Phase 1 Foundation Complete
