# ✈️ ITravelista PH

> **From Dreaming to Departing** — The all-in-one travel companion built specifically for Filipino tourists traveling internationally.

---

## 🌟 Key Features

1. **🗺️ My Trips**: Plan, organize, and track international trips with countdown badges and status tracking.
2. **✅ Smart Checklist**: Auto-generate pre-trip checklists based on destination visa requirements with optimistic completion toggles.
3. **💰 Budget Planner**: Peso-denominated (PHP ₱) travel budget calculator featuring 15 destination preset templates and custom SVG donut chart breakdown.
4. **🛂 Visa Assistant**: Curated, step-by-step visa requirement guides and document check-off lists for PH passport holders (Japan, Korea, Singapore, Thailand, Hong Kong, Taiwan, and more).
5. **📊 Travel Readiness Dashboard**: Real-time aggregate readiness score gauge tracking document completion across active trips.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15+ (App Router, Turbopack, React 19, TypeScript strict mode) |
| **Styling** | Tailwind CSS v4 + Custom ITravelista design system tokens (`#008080` Deep Teal) |
| **Database & Auth** | Supabase (Postgres, RLS policies, SSR Auth with Google OAuth & Magic Link) |
| **State Management** | TanStack Query v5 (Server state) + Zustand v5 (Client UI state) |
| **PWA & Offline** | Web App Manifest + Service Worker caching + Guest Mode `localStorage` fallback |
| **Testing** | Vitest (Unit tests) + Playwright (E2E tests) |
| **Deployment** | Self-hosted VPS with Docker / Coolify |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v20+
- npm / pnpm
- Supabase CLI (optional for local DB)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/itravelista.git
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

## 🗄️ Database Architecture

The Postgres database consists of 6 tables with Row Level Security (RLS) policies:
- `user_profile` — Extends `auth.users`
- `trip` — Core trip records with start/end dates and status
- `checklist_item` — Category-tagged pre-trip tasks
- `budget_entry` - PHP-denominated expense items
- `budget_template` — Preset destination budget estimates
- `visa_requirement` — Curated visa rules for PH passport holders

SQL migration and seed scripts are available in [supabase/migrations/](file:///c:/Users/Wendell%20Saligan/codes/itravelista/supabase/migrations/) and [supabase/seed.sql](file:///c:/Users/Wendell%20Saligan/codes/itravelista/supabase/seed.sql).

---

## 📄 License

MIT License © 2026 ITravelista PH.
