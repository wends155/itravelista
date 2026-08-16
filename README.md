# ✈️ ITravelista PH

> **From Dreaming to Departing** — The all-in-one travel companion built specifically for Filipino tourists traveling internationally.

---

## 🌟 Key Features

1. **🗺️ My Trips**: Plan, organize, and track international trips with countdown badges and status tracking.
2. **✅ Smart Checklist**: Auto-generate pre-trip checklists based on destination visa requirements with optimistic completion toggles.
3. **💰 Budget Planner**: Peso-denominated (PHP ₱) travel budget calculator featuring 15 destination preset templates and custom SVG donut chart breakdown.
4. **🛂 Visa Assistant**: Curated, step-by-step visa requirement guides and document check-off lists for PH passport holders (Japan, Korea, Singapore, Thailand, Hong Kong, Taiwan, and more).
5. **📊 Travel Readiness Dashboard**: Real-time aggregate readiness score gauge tracking document completion across active trips.
6. **👤 User Profile & Auth**: Auth-aware application shell supporting Google OAuth, Magic Link, Email/Password, and Guest Mode fallback.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15+ (App Router, Turbopack, React 19, TypeScript strict mode) |
| **Styling** | Tailwind CSS v4 + Custom ITravelista design system tokens (`#008080` Deep Teal) |
| **Database & Auth** | Supabase (Postgres, RLS policies, SSR Auth with Google OAuth & Magic Link) |
| **State Management** | TanStack Query v5 (Server state) + Zustand v5 (Client UI state) |
| **Design System** | Tropical Utility (`design/DESIGN.md` + Stitch MCP integration) |
| **PWA & Offline** | Web App Manifest + Service Worker caching + Guest Mode `localStorage` fallback |
| **Testing** | Vitest (Unit tests) + Playwright (E2E tests) |
| **Deployment** | Self-hosted VPS with Docker / Coolify |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v20+ LTS
- npm / pnpm
- Docker Desktop (optional, for local Supabase DB & Auth containers)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/wends155/itravelista.git
   cd itravelista
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Local Development & Auth Setup

### 1-Command Dev Startup (Automatic Supabase & Auth)
```bash
npm run dev
```
If **Docker Desktop** is running on your machine, `npm run dev` automatically:
1. Boots local Supabase containers (`npx supabase start`) — downloading official images if needed.
2. Auto-seeds database schema, visa data, budget presets, and a **dev test user**.
3. Auto-syncs local API keys directly into `.env.local`.
4. Starts the Next.js dev server on `http://localhost:3000`.

*(If Docker is not running, Next.js launches in Guest Mode fallback.)*

### 🧪 Pre-Seeded Dev Test Account
- **Email**: `dev@itravelista.ph`
- **Password**: `password123`
- *(On the `/login` page, click **"Quick Fill Test Account"** to autofill credentials in 1 click!)*

### 🛠️ Useful Helper Commands
- `npm run supabase:start` — Start local Supabase containers (`npx supabase start`)
- `npm run supabase:stop` — Stop local Supabase containers (`npx supabase stop`)
- `npm run supabase:status` — Inspect local API URLs and keys (`npx supabase status`)
- `npm run supabase:reset` — Reset local database & re-apply seed data (`npx supabase db reset`)
- `npm run env:setup` — Re-sync local keys to `.env.local`
- `http://localhost:54323` — Open local Supabase Studio (Database & Auth inspector)
- `http://localhost:54324` — Open Inbucket local email testing inbox (Magic Link catcher)

---

## 🧪 Testing & Verification

```bash
# Type check TypeScript
npm run type-check

# Run Vitest unit test suite (22 tests)
npm run test

# Run Playwright E2E tests
npm run test:e2e

# Production build verification
npm run build
```

---

## 📚 Project Documentation

- **[architecture.md](architecture.md)** — Architectural design, module boundaries, database schema, dependency directions, and toolchain rules.
- **[design/DESIGN.md](design/DESIGN.md)** — Canonical design system tokens ("Tropical Utility"), typography scale, color tokens, and component guidelines.
- **[design/design-spec.md](design/design-spec.md)** — Comprehensive UI/UX specification, responsive behavior matrix, and native Expo portability mappings.
- **[context.md](context.md)** — Historical record of architecture decisions and session summaries.

---

## 🗄️ Database Architecture

The Postgres database consists of 6 tables with Row Level Security (RLS) policies:
- `user_profile` — Extends `auth.users`
- `trip` — Core trip records with start/end dates and status
- `checklist_item` — Category-tagged pre-trip tasks
- `budget_entry` — PHP-denominated expense items
- `budget_template` — Preset destination budget estimates
- `visa_requirement` — Curated visa rules for PH passport holders

SQL migration and seed scripts are available in [supabase/migrations/](supabase/migrations/) and [supabase/seed.sql](supabase/seed.sql).

---

## 📄 License

MIT License © 2026 ITravelista PH.
