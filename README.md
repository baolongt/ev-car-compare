# EV Car Compare Vietnam

So sánh xe điện tại Việt Nam - Electric Vehicle comparison platform for Vietnam market.

## Tech Stack

- **Framework**: SvelteKit 2.x + Svelte 5
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS 3.x
- **Deployment**: Static (adapter-static)

## Features

- Car listing with filters (brand, price, range, battery)
- Car detail pages with full specifications
- Side-by-side comparison (2-3 vehicles)
- Vietnam price calculator (registration fees, taxes)
- Vietnamese language (vi-VN)
- Mobile-first responsive design
- SEO optimized

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npm run check

# Run tests
npm run test

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable UI components
│   │   ├── layout/     # Header, Footer, Navigation
│   │   ├── car/        # Car-specific components
│   │   ├── comparison/ # Comparison tool
│   │   └── filters/    # Filter components
│   ├── data/           # JSON data files
│   ├── stores/         # Svelte stores
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── routes/
│   ├── +page.svelte    # Homepage
│   ├── xe-dien/        # Car listing & detail
│   ├── so-sanh/        # Comparison page
│   └── tinh-gia/       # Price calculator
└── app.html            # HTML template
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage |
| `/xe-dien` | All EVs listing |
| `/xe-dien/[slug]` | Car detail page |
| `/so-sanh` | Comparison tool |
| `/tinh-gia` | Price calculator |

## License

Private project.
