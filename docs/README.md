# EV Car Compare Vietnam - Documentation Index

**Project:** EV Car Compare Vietnam
**Phase:** Phase 1 - Project Setup & Foundation
**Last Updated:** 2025-12-31
**Status:** Complete

---

## Quick Navigation

This directory contains comprehensive documentation for the EV Car Compare Vietnam project. Choose the document that best matches your needs:

### For Project Managers & Stakeholders
**Start here:** [`project-overview-pdr.md`](./project-overview-pdr.md)

What you'll find:
- Project vision and Phase 1 features
- Complete technical stack
- Functional requirements and acceptance criteria
- Project timeline and roadmap
- Key features overview

**Time to read:** 15-20 minutes

---

### For New Developers (Onboarding)
**Start here:** [`project-overview-pdr.md`](./project-overview-pdr.md) → [`code-standards.md`](./code-standards.md)

1. **Project Overview** - Understand what we're building
2. **Code Standards** - Learn how we write code
3. **Codebase Summary** - Find your way around the codebase
4. **System Architecture** - Understand the technical design

**Time to read:** 45-60 minutes total

---

### For Developers (Technical Reference)
**Start here:** [`codebase-summary.md`](./codebase-summary.md)

What you'll find:
- Complete directory structure
- All TypeScript interfaces and types
- Utility function reference
- Component hierarchy
- Build configuration details
- Import aliases and path mapping
- Testing setup
- Performance considerations

**Also reference:** [`code-standards.md`](./code-standards.md) for coding patterns

**Time to reference:** As needed

---

### For Architects & Tech Leads
**Start here:** [`system-architecture.md`](./system-architecture.md)

What you'll find:
- High-level architecture diagrams
- Application layers and data flow
- State management patterns
- Build and deployment architecture
- Performance optimizations
- Security considerations
- Scaling roadmap
- Architecture decision records (ADRs)

**Time to read:** 30-40 minutes

---

## Document Overview

### 1. [project-overview-pdr.md](./project-overview-pdr.md)
**Size:** 388 lines | **Focus:** Project + Requirements

**Key Sections:**
- Project vision and Phase 1 features
- Technical stack breakdown
- Project structure and file organization
- Core data models (Car, CarSpecs, etc.)
- Feature descriptions (listing, comparison, calculator)
- Development workflow and npm scripts
- Deployment configuration
- Design system (colors, typography)
- Requirements matrix (functional, non-functional)
- Testing strategy
- Future roadmap

**Best for:** Understanding what we're building and why

---

### 2. [codebase-summary.md](./codebase-summary.md)
**Size:** 538 lines | **Focus:** Code Reference

**Key Sections:**
- Complete directory tree with file purposes
- Type definitions (8+ core interfaces)
- Utility functions reference
- Layout components documentation
- Pages and routes structure
- Tailwind CSS theme configuration
- Build configurations (Vite, SvelteKit, TypeScript)
- NPM scripts reference
- Import aliases explained
- File statistics and metrics

**Best for:** Finding code, understanding structure, locating files

---

### 3. [code-standards.md](./code-standards.md)
**Size:** 892 lines | **Focus:** Development Guidelines

**Key Sections:**
- TypeScript strict mode rules
- Svelte 5 runes usage
- Component patterns with examples
- File organization conventions
- 17+ naming conventions (variables, functions, types)
- Code style guide (spacing, imports, comments)
- Component patterns (layout, features, data fetching)
- Testing standards (Vitest + Playwright)
- Documentation requirements
- Performance best practices
- Accessibility standards (WCAG 2.1)
- Common patterns (stores, error handling)
- Summary checklist for commits

**Best for:** Writing code that fits the project style, getting code review tips

---

### 4. [system-architecture.md](./system-architecture.md)
**Size:** 817 lines | **Focus:** Architecture & Design

**Key Sections:**
- Architecture overview with diagram
- Technology stack breakdown
- Five application layers (routing, components, types, utilities, data)
- State management patterns
- Data flow patterns
- Build and deployment architecture
- Static adapter configuration
- Performance architecture and optimization
- SEO architecture (meta tags, structured data)
- Testing architecture (test pyramid)
- Error handling patterns
- Scaling considerations for Phase 2+
- Security considerations
- Monitoring recommendations
- Architecture Decision Records (5 ADRs)

**Best for:** Understanding design decisions, planning new features, system design review

---

## How to Use This Documentation

### Getting Started (New to Project)
1. Read: `project-overview-pdr.md` (understand the project)
2. Read: `code-standards.md` (learn our patterns)
3. Skim: `codebase-summary.md` (know where things are)
4. Reference: `system-architecture.md` (understand design)

**Time:** ~1 hour

### Implementing a Feature
1. Reference: `codebase-summary.md` (similar feature location)
2. Follow: `code-standards.md` (code patterns)
3. Check: `system-architecture.md` (data flow implications)
4. Test: Follow testing patterns in `code-standards.md`

### Code Review Checklist
- Check: `code-standards.md` → Summary Checklist
- Verify: TypeScript strict mode passes
- Verify: Tests added (unit + E2E)
- Verify: Naming follows conventions
- Verify: Accessibility standards met

### Troubleshooting
1. **Type errors?** → See `code-standards.md` → TypeScript Standards
2. **Testing?** → See `code-standards.md` → Testing Standards
3. **Where's that file?** → See `codebase-summary.md` → Directory Tree
4. **How does feature X work?** → See `system-architecture.md` → Data Flow

---

## Project Stats

| Metric | Value |
|--------|-------|
| Total Documentation | 72 KB |
| Total Lines | 2,635 |
| Markdown Files | 4 (+ this index) |
| Code Examples | 50+ |
| TypeScript Interfaces | 8+ |
| Routes Documented | 4 |
| Development Scripts | 8 |
| Named Conventions | 17+ |

---

## Key Information at a Glance

### Tech Stack
- **Framework:** SvelteKit 2.15.0
- **Language:** TypeScript 5.7.2 (strict mode)
- **Components:** Svelte 5.14.1 (with runes)
- **Styling:** Tailwind CSS 3.4.17
- **Build:** Vite 6.0.6
- **Testing:** Vitest 2.1.8, Playwright 1.49.0
- **Rendering:** Static Site Generation (SSG)

### Routes
- `/` - Homepage
- `/xe-dien` - EV Listing page
- `/so-sanh` - Comparison Tool
- `/tinh-gia` - Cost Calculator

### Core Types
- `Car` - Main vehicle model
- `CarSpecs` - Technical specifications
- `FilterState` - UI filter state
- `ComparisonState` - Comparison tool state
- `VietnamFees` - Regional fee structure

### Key Scripts
```bash
npm run dev              # Start dev server
npm run build           # Production build
npm run check           # Type check & lint
npm run test            # Run unit tests
npm run test:e2e        # Run E2E tests
npm run test:coverage   # Coverage report
```

---

## Common Questions

**Q: Where do I add a new page?**
A: Create files in `src/routes/[route-name]/+page.svelte`. See `codebase-summary.md` → Routing & Pages Layer.

**Q: How do I format Vietnamese currency?**
A: Use `formatVND()` or `formatVNDCompact()` from `$utils/format`. See `codebase-summary.md` → Format Utilities.

**Q: What's the preferred way to manage state?**
A: Use Svelte 5 runes (`$state`, `$derived`, `$effect`) for local state, Svelte stores for shared state. See `system-architecture.md` → State Management.

**Q: How do I add a new component?**
A: Create in `src/lib/components/[feature]/[Component].svelte`. See `code-standards.md` → Component Patterns.

**Q: What testing is expected?**
A: Unit tests for utilities, E2E tests for critical flows. See `code-standards.md` → Testing Standards.

**Q: How do I handle errors?**
A: Use SvelteKit error() in routes, try/catch in components. See `system-architecture.md` → Error Handling.

---

## Documentation Maintenance

### Updating Documentation
When making changes to the codebase:

1. **Added new type?** → Update `codebase-summary.md` Type Definitions section
2. **Added new util?** → Update `codebase-summary.md` Utilities section
3. **Added new component?** → Update `codebase-summary.md` Components section
4. **Changed a config?** → Update relevant documentation file
5. **New coding pattern?** → Update `code-standards.md`
6. **Architecture change?** → Update `system-architecture.md`

### Adding New Sections
- Feature documentation goes in feature directories with README.md
- API documentation in `docs/api/` (when Phase 2 begins)
- Deployment guides in `docs/deployment/` (when needed)

---

## External Resources

### SvelteKit Documentation
- [SvelteKit Official Docs](https://kit.svelte.dev/)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)

### Testing
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)

### Web Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)

---

## Related Files

- **Project Configuration:** See `package.json`, `svelte.config.js`, `tsconfig.json` in project root
- **Repository:** `/home/contact/car-compare/`
- **Codebase Analysis:** `repomix-output.xml` (generated, for reference)
- **Project Instructions:** `CLAUDE.md` in project root

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-31 | Initial documentation suite created |

---

## Need Help?

- **Code questions?** → Check `code-standards.md`
- **Architecture questions?** → Check `system-architecture.md`
- **File location?** → Check `codebase-summary.md` → Directory Tree
- **Project scope?** → Check `project-overview-pdr.md`
- **Setup issues?** → Check `project-overview-pdr.md` → Getting Started

---

**Last Updated:** 2025-12-31
**Maintained by:** Documentation Team
**Status:** Phase 1 Complete

For questions or documentation updates, please refer to the project's contribution guidelines or contact the development team.
