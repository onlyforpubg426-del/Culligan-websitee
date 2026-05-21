# Culligan Pakistan

Culligan Water Pakistan e-commerce site — lets customers browse water products, calculate costs, and place orders via WhatsApp. Includes an admin dashboard to manage orders.

## Run & Operate

- `pnpm --filter @workspace/culligan-pk run dev` — run the frontend (port 25549)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Required env: `GITHUB_TOKEN` — GitHub PAT with repo scope (for pushes)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4, shadcn/ui, framer-motion, wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (orders table)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle for api-server)

## Where things live

- `artifacts/culligan-pk/src/` — React frontend (components, pages, hooks)
- `artifacts/culligan-pk/src/components/sections/` — page sections (Hero, Products, OrderForm, etc.)
- `artifacts/culligan-pk/src/pages/Admin.tsx` — admin dashboard at /admin
- `artifacts/api-server/src/routes/orders.ts` — POST/GET/PATCH order routes
- `lib/db/src/schema/orders.ts` — orders table schema (source of truth)
- `lib/api-spec/openapi.yaml` — OpenAPI spec
- `vercel.json` — Vercel deployment config (frontend only, framework: null)

## Architecture decisions

- Orders flow: form POSTs to `/api/orders` (saves to DB) then opens WhatsApp with pre-filled message
- Admin at `/admin` — no auth, internal use only
- API server runs on Replit; Vercel hosts the static frontend only
- `BASE_URL` used throughout frontend for API calls so it works on both Replit and Vercel

## Product

Culligan Pakistan water delivery site for Karachi. Customers can browse bottle sizes and bundles, use a savings calculator, and place orders. Orders are saved to a database and visible in the admin dashboard where staff can update order status (new → confirmed → delivered/cancelled).

## User preferences

- **Auto-push to GitHub after every change** — always push to `origin main` using `GITHUB_TOKEN` without asking.
  Push command: `git --no-optional-locks push https://x-access-token:${GITHUB_TOKEN}@github.com/onlyforpubg426-del/Culligan-websitee.git main`

## Gotchas

- The `.migration-backup/` workflows always fail — that's expected, they're a backup copy and have no installed node_modules.
- `pnpm -r run build` will fail on Vercel because it tries to build api-server and db packages. Use `pnpm --filter @workspace/culligan-pk run build` instead (already in vercel.json).
- DB schema push needed when orders schema changes: `pnpm --filter @workspace/db run push`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
