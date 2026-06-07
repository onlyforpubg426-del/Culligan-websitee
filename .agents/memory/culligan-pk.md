---
name: Culligan Pakistan Website
description: Details about the Culligan PK website — routes, admin auth, API architecture, and asset locations
---

## Admin Auth
Password: `culligan@2025` stored in sessionStorage key `culligan_admin_v1`. No backend auth — lightweight frontend gate in `Admin.tsx`.

## Architecture
- Frontend: React + Vite at `artifacts/culligan-pk/` on previewPath `/`
- Backend: Express API at `artifacts/api-server/` on `/api`
- Database: PostgreSQL via Drizzle ORM — store.ts uses `@workspace/db` for all reads/writes. Data persists across restarts.
- Cart state: React context in `src/lib/cart.tsx`

## Frontend Routes
/ → Home (Hero, Products, Purification, Stats, Certifications, Services, Testimonials, RetailOutlets, FAQ, Subscription, OrderAndEnquiry)
/admin → Admin dashboard (password gated)
/dispensers → Dispensers page
/faq → FAQ page
/privacy-policy → Privacy policy
/history → Brand history
/about-water → About water science
/contact → Contact page
/corporate-pricing → Corporate pricing

## API Routes (PostgreSQL-backed, persistent)
GET/POST /api/orders, PATCH /api/orders/:id/status
GET/POST /api/leads
GET/POST /api/contact, PATCH /api/contact/:id/status
GET/POST /api/subscriptions, PATCH /api/subscriptions/:id/status
GET /api/events (SSE stream for real-time admin updates)

## Public Assets
All images at artifacts/culligan-pk/public/ — bottles/, bundles/, dispensers, certs, logos
