# Copilot Instructions for Shopee Red Showcase

## Project Overview

This is a **Shopee-inspired e-commerce frontend & backend** built with React 19, TypeScript, Vite on the frontend and Node.js/Express with MySQL on the backend. The project demonstrates a complete shopping experience with categories, product browsing, cart management, checkout flows, and user authentication.

---

# Frontend Architecture

## Tech Stack

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

---

# Backend Architecture

## Tech Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Express 4.18.2
- **Database**: MySQL 8.0+ with mysql2 connection pool
- **Authentication**: JWT (jsonwebtoken) + bcrypt for password hashing
- **Validation**: express-validator
- **CORS**: Configured for frontend at FRONTEND_URL

## Folder Structure

\\\
backend/
src/
config/ # database.js (MySQL connection pool)
controllers/ # authController.js (request handlers)
middleware/ # auth.js (JWT verification, error handling)
models/ # User.js (database operations)
routes/ # authRoutes.js (API endpoints)
utils/ # jwt.js, password.js (crypto utilities)
scripts/ # initDb.js (database initialization)
index.js # Express app entry point
.env.example # Environment variables template
package.json
.gitignore
\\\

## Authentication Endpoints

### Register (POST /api/auth/register)

Valid email format, unique email, password >= 6 chars, fullName required

### Login (POST /api/auth/login)

Return JWT token on successful credentials

### Get Profile (GET /api/auth/me)

Header: Authorization: Bearer <token>

## Database Schema - users table

- **id**: INT AUTO_INCREMENT PRIMARY KEY
- **email**: VARCHAR(255) UNIQUE NOT NULL
- **password**: VARCHAR(255) NOT NULL (bcrypt hashed)
- **full_name**: VARCHAR(255) NOT NULL
- **phone, address, profile_image**: Optional fields
- **status**: ENUM('active', 'inactive') DEFAULT 'active'
- **created_at, updated_at**: TIMESTAMP fields with indexes on email and created_at

## Key Backend Files

- **backend/src/config/database.js**: MySQL pool & connection test
- **backend/src/models/User.js**: User CRUD & password verification
- **backend/src/utils/jwt.js**: generateToken(), verifyToken()
- **backend/src/utils/password.js**: hashPassword(), comparePassword()
- **backend/src/middleware/auth.js**: authenticateToken(), error handler
- **backend/src/controllers/authController.js**: register, login, getCurrentUser
- **backend/src/index.js**: Express app setup with routes & CORS

## Backend Development Workflow

### Setup

\\\ash
cd backend
npm install
cp .env.example .env # Configure DB credentials
node src/scripts/initDb.js # Initialize database
npm run dev # Start on http://localhost:5000
\\\

### Environment Variables

DB_HOST=localhost, DB_USER=root, DB_NAME=shopee_red, PORT=5000, JWT_SECRET, JWT_EXPIRE=7d, FRONTEND_URL=http://localhost:8080

### Adding Endpoints

1. Create controller in backend/src/controllers/
2. Add route in backend/src/routes/
3. Mount in backend/src/index.js: app.use('/api/endpoint', routes)
4. Use authenticateToken middleware for protected routes

## Backend-Specific Notes

- **MySQL Pool**: 10 concurrent connections, suitable for small-to-medium apps
- **Error Format**: All errors return { success: false, message: "...", error?: {...} }
- **Password Security**: bcrypt with 10 salt roundsnever store plaintext
- **JWT Expiry**: 7 days by default; adjust JWT_EXPIRE in .env
- **No Migrations**: Use initDb.js to initialize schema; manually alter for migrations
- **CORS**: Enabled for FRONTEND_URL in backend/src/index.js

## Frontend-Backend Integration

**Auth Flow**: Register/Login -> POST to /api/auth/\* -> Store JWT in localStorage -> Include Authorization: Bearer <token> header in all requests -> Redirect to /auth/login on 401/403
