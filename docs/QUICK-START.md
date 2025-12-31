# Quick Start Guide - EV Car Compare Vietnam

**Time to Complete:** 10 minutes
**Target:** New developers

---

## 1. Project Setup (2 minutes)

```bash
# Navigate to project
cd /home/contact/car-compare

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 2. Understanding the Structure (3 minutes)

```
src/
├── lib/
│   ├── components/layout/    ← Header, Footer, Navigation
│   ├── types/car.ts          ← Data models (Car, CarSpecs, etc.)
│   └── utils/                ← Format and SEO functions
└── routes/
    ├── +page.svelte          ← Homepage
    ├── xe-dien/              ← EV listing
    ├── so-sanh/              ← Comparison tool
    └── tinh-gia/             ← Cost calculator
```

---

## 3. Making Changes (3 minutes)

### Edit a Component
```bash
# Open a component
code src/lib/components/layout/header.svelte

# Changes auto-reload in browser
# Check console for TypeScript errors
```

### Add a New Page
```bash
# Create new route directory
mkdir -p src/routes/chi-tiet

# Create page file
touch src/routes/chi-tiet/+page.svelte
```

### Run Type Checking
```bash
npm run check              # One-time check
npm run check:watch       # Watch mode
```

---

## 4. Common Tasks

### Format Vietnamese Currency
```typescript
import { formatVND, formatVNDCompact } from '$utils/format';

formatVND(1500000000);      // "1.500.000.000 ₫"
formatVNDCompact(1500000000); // "1.5 tỷ"
```

### Use a Type
```typescript
import type { Car } from '$types/car';

const car: Car = {
  id: 'tesla-model3',
  slug: 'tesla-model-3',
  brand: 'Tesla',
  model: 'Model 3',
  year: 2024,
  price: 2000000000,
  specs: { /* ... */ },
  images: [],
  features: [],
  description: ''
};
```

### Create Reactive State
```svelte
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);

  $effect(() => {
    console.log(`Count: ${count}`);
  });
</script>

<p>Count: {count}</p>
<p>Doubled: {doubled}</p>
<button onclick={() => count++}>+1</button>
```

### Add SEO Meta Tags
```svelte
<script lang="ts">
  import { pageTitle, metaDescription, ogMeta } from '$utils/seo';

  const title = pageTitle('Xe Điện');
  const desc = metaDescription('Browse all electric vehicles');
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={desc} />
</svelte:head>
```

---

## 5. Testing Your Changes

### Run Unit Tests
```bash
npm run test              # Run once
npm run test:coverage     # With coverage
```

### Run Type Checking
```bash
npm run check
```

### Build for Production
```bash
npm run build
npm run preview          # Preview the build
```

---

## 6. Common Errors

### TypeScript Error: `Type 'X' is not assignable to type 'Y'`
**Solution:** Check that your types match. Use `type` keyword for imports:
```typescript
import type { Car } from '$types/car';
```

### Component Not Rendering
**Solution:** Check that the route file path matches. Routes use `+page.svelte` naming.

### Styling Not Applied
**Solution:** Check that you're using Tailwind class names. Use `class=` in HTML:
```svelte
<div class="flex items-center gap-4">Content</div>
```

### Async/Await Issues
**Solution:** Always add `await` when fetching data:
```typescript
const cars = await fetchCars();
```

---

## 7. Key Files to Know

| File | Purpose |
|------|---------|
| `src/lib/types/car.ts` | Core data types |
| `src/lib/utils/format.ts` | Vietnamese formatting |
| `src/lib/utils/seo.ts` | SEO helpers |
| `src/routes/+layout.svelte` | App layout |
| `tailwind.config.js` | Styling configuration |
| `tsconfig.json` | TypeScript settings |
| `svelte.config.js` | SvelteKit configuration |

---

## 8. Development Scripts

```bash
npm run dev              # Development server (http://localhost:5173)
npm run build           # Production build
npm run preview         # Preview production build
npm run check           # Type check + lint (run once)
npm run check:watch     # Type check in watch mode
npm run test            # Run unit tests
npm run test:e2e        # Run end-to-end tests
npm run test:coverage   # Test coverage report
```

---

## 9. Getting More Help

| Need | Read |
|------|------|
| Project overview | `docs/project-overview-pdr.md` |
| Code standards | `docs/code-standards.md` |
| File locations | `docs/codebase-summary.md` |
| Architecture | `docs/system-architecture.md` |
| Documentation index | `docs/README.md` |

---

## 10. Next Steps

1. **Explore the codebase:** Open `src/` and look at components
2. **Run tests:** `npm run test`
3. **Check types:** `npm run check`
4. **Read code standards:** `docs/code-standards.md`
5. **Try making a change:** Edit a component and watch it reload

---

## Development Checklist

- [ ] Installed dependencies (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Can see homepage at http://localhost:5173
- [ ] Type checking passes (`npm run check`)
- [ ] Tests pass (`npm run test`)
- [ ] Read `docs/code-standards.md`
- [ ] Read `docs/codebase-summary.md`

---

**You're ready to go!** Start with `npm run dev` and explore the codebase. 🚀

For questions, refer to the documentation in the `docs/` directory.
