# JAS Sneakers Geo - Workspace

## Overview

Full-stack sneaker e-commerce website for JAS Sneakers Geo (@jassneakersgeo on Instagram). Premium black and yellow brand aesthetic. Includes a public storefront and a hidden admin panel for product management.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (Tailwind CSS, Shadcn/ui, Framer Motion, wouter)
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── jas-sneakers/       # Public storefront + admin panel (React + Vite)
│   └── api-server/         # Express API server
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── pnpm-workspace.yaml
└── package.json
```

## Pages

### Public (accessible from navigation)
- `/` — Hero homepage with featured products
- `/shop` — Full product catalog with search/filter
- `/about` — Brand story, mission, contact

### Hidden Admin (not linked from the main site)
- `/admin` — Password-protected admin panel
  - Product management (create, edit, delete)
  - Password: set via `ADMIN_PASSWORD` environment variable
  - Default: `jas-sneakers-geo-admin`

## Environment Variables

- `ADMIN_PASSWORD` — Admin panel password (shared env var)
- `DATABASE_URL` — PostgreSQL connection (auto-provisioned by Replit)
- `PORT` — Server port (auto-assigned by Replit)

## Brand Colors

- **Black**: `#000000` / `0 0% 4%` HSL
- **Yellow**: `#FFD700` / `51 100% 50%` HSL (JAS brand yellow)

## API Endpoints

- `GET /api/products` — List all products (public)
- `POST /api/products` — Create product (admin, requires `x-admin-key` header)
- `GET /api/products/:id` — Get single product (public)
- `PUT /api/products/:id` — Update product (admin)
- `DELETE /api/products/:id` — Delete product (admin)
- `POST /api/admin/verify` — Verify admin password

## Development

```bash
# Install dependencies
pnpm install

# Start frontend
pnpm --filter @workspace/jas-sneakers run dev

# Start API server
pnpm --filter @workspace/api-server run dev

# Push DB schema changes
pnpm --filter @workspace/db run push

# Run API codegen (after openapi.yaml changes)
pnpm --filter @workspace/api-spec run codegen
```

## Packages

### `artifacts/jas-sneakers` (`@workspace/jas-sneakers`)
React + Vite frontend. Public storefront + admin panel. Key dependencies: framer-motion, react-hook-form, @hookform/resolvers, wouter.

### `artifacts/api-server` (`@workspace/api-server`)
Express 5 API server. Routes in `src/routes/`. Products and admin routes in `src/routes/products.ts`.

### `lib/db` (`@workspace/db`)
Drizzle ORM. Schema: `lib/db/src/schema/products.ts` — `productsTable`.

### `lib/api-spec` (`@workspace/api-spec`)
OpenAPI 3.1 spec (`openapi.yaml`) + Orval codegen config.

### `lib/api-client-react` (`@workspace/api-client-react`)
Generated React Query hooks (e.g., `useListProducts`, `useCreateProduct`).

### `lib/api-zod` (`@workspace/api-zod`)
Generated Zod schemas (e.g., `CreateProductBody`, `VerifyAdminBody`).
