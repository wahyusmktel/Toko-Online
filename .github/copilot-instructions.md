# Copilot Instructions for Shopee Red Showcase

## Project Overview

This is a **Shopee-inspired e-commerce frontend** built with React 19, TypeScript, Vite, and shadcn/ui components. The project demonstrates a complete shopping experience with categories, product browsing, cart management, and checkout flows.

## Architecture

### Tech Stack

- **Runtime**: Bun 1.3.4 (package manager & runtime)
- **Build**: Vite 7.2.7 with React SWC plugin
- **UI**: React 19.2.1 + shadcn/ui (Radix UI primitives + Tailwind CSS)
- **State Management**: React Context API (CartContext)
- **Routing**: React Router v6
- **Data Fetching**: TanStack React Query (QueryClient configured in App.tsx)
- **Styling**: Tailwind CSS with custom design tokens (primary/secondary colors)
- **Icons**: Lucide React

### Folder Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer (main layout wrapper)
│   ├── home/            # HeroBanner, CategoryGrid, FlashSale, ProductGrid
│   ├── product/         # ProductCard, RatingStars
│   └── ui/              # shadcn component library (auto-generated, don't edit)
├── context/             # CartContext for global cart state
├── data/                # mockData.ts (Product, Category, CartItem interfaces)
├── pages/               # Full page components (Index, Products, Cart, etc.)
├── hooks/               # Custom hooks (use-mobile, use-toast)
└── lib/                 # Utilities (utils.ts for Tailwind classNames)
```

## Key Patterns

### 1. Cart Management (CartContext)

- Located in `src/context/CartContext.tsx`
- Provides: `items`, `addToCart()`, `removeFromCart()`, `updateQuantity()`, `clearCart()`, `totalItems`, `totalPrice`
- Usage: `const { items, addToCart } = useCart()` (automatically validates provider exists)
- **Important**: Cart state is localStorage-independent—it's cleared on page reload

### 2. Data Model

All product/cart types defined in `src/data/mockData.ts`:

- **Product**: id, name, price, originalPrice, discount%, image, rating, sold, category, stock, variants, shop info
- **CartItem**: product reference, quantity, selectedVariants (Record<string, string>)
- **Category**: id, name, icon (lucide name string), color (hex)

### 3. Component Patterns

- **Layout**: Navbar + Footer + main content (see [src/pages/Index.tsx](src/pages/Index.tsx) as template)
- **Product Cards**: Use [src/components/product/ProductCard.tsx](src/components/product/ProductCard.tsx)—supports discount badges and flash sale indicators
- **Links**: Use React Router `<Link to="/path">` not `<a>`; navbar handles `/products?search=query` for search
- **Icons**: Import from `lucide-react` (e.g., `import { Star } from "lucide-react"`)

### 4. Styling Conventions

- **Tailwind + Custom Tokens**: Colors use CSS variables (`var(--primary)`, `var(--secondary)`)
- **shadcn Classes**: Use `className="group"` patterns (e.g., `group-hover:scale-105` in ProductCard)
- **Spacing**: Container width controlled by tailwind (max 1400px), padding 1rem
- **Dark Mode**: Configured with "class" strategy in tailwind.config.ts

### 5. Routing (React Router v6)

Routes defined in [App.tsx](src/App.tsx):

- `/` → Index (home)
- `/products` → Products list (supports `?search=` query param)
- `/flash-sale` → Flash sale products
- `/product/:id` → Product detail page
- `/cart` → Cart page
- `/checkout` → Checkout flow
- `/auth/login`, `/auth/register` → Auth pages
- `/*` → 404 NotFound

## Essential Workflows

### Development

```bash
bun install          # Install dependencies
bun run dev          # Start Vite dev server on http://localhost:8080
bun run build        # Production build (output: dist/)
bun run lint         # Run ESLint
```

### Adding a Feature

1. **New Page**: Create component in `src/pages/NewPage.tsx`, add route to [App.tsx](src/App.tsx)
2. **New Component**: Add to appropriate folder in `src/components/` (or `ui/` if reusable)
3. **New Context**: Create in `src/context/`, export context + custom hook
4. **New Data Type**: Add interface to `src/data/mockData.ts`

### Common Tasks

- **Add UI Component**: Copy shadcn pattern from existing UI file (e.g., [button.tsx](src/components/ui/button.tsx))
- **Style Override**: Modify [App.css](src/App.css) for global styles; use `className` for inline styles
- **Mock Data**: Extend categories/products in `src/data/mockData.ts`

## Project-Specific Notes

- **No Backend**: All data is mocked in `mockData.ts`—queries (React Query) will error without implementation
- **Component Tagger**: Vite plugin active in dev mode (from Lovable framework) for visual debugging
- **Toast Notifications**: Both Sonner and native Toast providers mounted in [App.tsx](src/App.tsx)
- **Path Alias**: `@/` resolves to `src/` (configured in vite.config.ts & tsconfig.json)
- **TypeScript Config**: Loose settings (noImplicitAny, strictNullChecks disabled) for flexibility

## Integration Points

- **Cart ↔ Navbar**: Navbar uses `useCart()` to display totalItems badge
- **Product ↔ Detail**: ProductCard links to `/product/:id` (ProductDetail page fetches from mockData)
- **Layout ↔ All Pages**: Navbar/Footer wrap every page; ensure consistent wrapper structure
