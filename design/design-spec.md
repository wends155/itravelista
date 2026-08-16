<!-- TEMPLATE_START: design-spec -->
# 🎨 Design Spec: ITravelista PH UI Redesign

| Field | Value |
|-------|-------|
| **Project** | ITravelista PH |
| **Mode** | GUI (Mobile-first Web PWA + Responsive Desktop) |
| **Screens** | 2 (Home Dashboard + Profile Page) |
| **Version** | 1.7 |
| **Last Updated** | 2026-08-13 |

---

### Design Brief
See [design-brief.md](design-brief.md) for audience persona, visual direction, and brand guidelines.

---

### Design System Tokens

| Category | Values & Specifications |
|---|---|
| **Typography** | Primary: `Inter` (sans-serif, weights: 400, 500, 600, 700, 900)<br>Tagline Script: `Dancing Script` (cursive, weights: 600, 700)<br>Captions: 12px (`text-xs`) minimum for accessibility |
| **Colors** | **Primary (Deep Teal)**: `#008080`<br>**Primary Hover**: `#006B6B`<br>**Primary Light (Soft Aqua)**: `#E0F2F1`<br>**App Background**: Off-White `#F8F9FA`<br>**Card Surface**: Pure White `#FFFFFF`<br>**Text Primary**: `#1A1A1A`<br>**Text Secondary**: `#6C757D`<br>**Accent Red**: `#D0021B` |
| **Chart Palette** | Flights: `#4A90E2`<br>Accommodation: `#008080`<br>Food: `#F5A623`<br>Transport: `#D0021B`<br>Activities: `#7B61FF`<br>Other: `#9B9B9B` |
| **Layout & Grid** | Mobile 2 to 4-column fluid grid, 16px horizontal margins, 12px card gap |
| **Elevation & Shadows** | Hero scrim gradient: `from-black/70 via-black/30 to-black/10`<br>Floating Readiness Card: `0 8px 24px rgba(0,0,0,0.12)` (`shadow-xl`)<br>Quick Access Cards: `0 2px 6px rgba(0,0,0,0.04)` |

---

### Screen Inventory

| # | Screen Name | Description | Mockup |
|---|------------|-------------|--------|
| 1 | **Home Dashboard** | Hero with tropical travel photo, branded Dancing Script tagline, floating Travel Readiness card with SVG donut chart, Quick Access row | ![Home Dashboard](file:///C:/Users/Wendell%20Saligan/.gemini/antigravity/brain/dd879867-e756-4db0-afbf-73fb02c19cc3/dashboard_mockup_1786588722312.png) |
| 2 | **User Profile** | User avatar card, email & auth provider details, sign-out button, and guest sign-in CTA prompt | — |

---

### Asset Inventory

| Asset | Description | File Link |
|-------|-------------|-----------|
| **Hero Background** | AI-generated tropical Philippines beach photography | ![Hero Background](file:///C:/Users/Wendell%20Saligan/.gemini/antigravity/brain/dd879867-e756-4db0-afbf-73fb02c19cc3/hero_travel_bg_1786588047768.png) |

---

### Component Inventory

1. **Dashboard Header (`DashboardHeader`)**
   - Left: Hamburger button (44×44px touch target) -> opens `SideDrawer`
   - Center: "ITravelista PH" title + cursive "From Dreaming to Departing" in `Dancing Script` font (`text-xs`)
   - Right: Notification Bell button with dual-layer unread dot badge + Auth-aware action:
     - Unauthenticated/Guest: Compact **"Sign In"** teal pill button (`/login`)
     - Authenticated: Avatar circle (`32×32px bg-[#008080]`) with user initials -> links to `/profile`

2. **Hero Travel Section**
   - Background image: `/images/hero-bg.png` with `bg-cover bg-center`
   - Min Height: `min-h-[140px] sm:min-h-[200px]` (responsive for small <375px viewports)
   - Scrim overlay: `bg-gradient-to-t from-black/70 via-black/30 to-black/10`
   - Title: `Where do you want to go?` (White, `text-2xl md:text-3xl font-bold`)
   - Subtitle: `Plan. Prepare. Apply. Travel worry-free.` (Soft aqua text `text-xs`)
   - Search Bar Link: White rounded pill input (`rounded-full py-2.5 px-4 shadow-md`), leading Search icon, placeholder "Search destination visa requirements (e.g. Japan)"

3. **Floating Travel Readiness Widget (`TravelReadinessWidget`)**
   - Position: Overlaps hero bottom with `-mt-10` negative top margin, elevated `shadow-xl` white card with `p-3.5` padding
   - Left Gauge: Compact SVG Donut Chart (72×72px, stroke-width 7px) with aggregate readiness percentage (`82%` / `0%`)
   - Right Stats: "Active Trips: 2 Upcoming" & "Documents: 8 Saved" cards with `#F8F9FA` background and `p-2` padding
   - CTA Button: Deep Teal pill button (`bg-[#008080] py-2.5 rounded-full text-white font-bold text-xs mt-2.5`) labeled **"View Checklist"** (or **"Create Your First Trip"** when trips = 0)

4. **Quick Access Horizontal Row**
   - Single horizontal flex row (`flex gap-2.5 overflow-x-auto pb-1 scrollbar-none sm:gap-3`)
   - 4 Cards: Visa Assistant, Checklist, Budget Planner, Travel Guides (disabled `opacity-50` with "Guides (Soon)")
   - Distribution: Equal width distribution (`min-w-0 flex-1`) across standard viewports, scrolling gracefully on narrow devices
   - Icons: 44×44px rounded containers (`h-11 w-11 bg-[#E0F2F1] text-[#008080]`) with 20×20px Lucide icons

5. **Page Header (`PageHeader`)**
   - Sticky top bar (`sticky top-0 z-40 bg-white border-b border-[#E0E0E0] shadow-sm`)
   - Back chevron touch target: Minimum 44×44px (`min-h-11 min-w-11`) hit area for strict WCAG AA touch target compliance
   - Props: `title`, `subtitle?`, `showBack?`, `backHref?`, `rightAction?`
   - Back button policy: Detail pages navigate to their parent list (e.g. `/checklist/[tripId]` → `/checklist`, `/budget/[tripId]` → `/budget`, `/trips/[id]` → `/trips`, `/visa/[countryCode]` → `/visa`). Top-level list pages navigate to home (`/`).

6. **Side Drawer (`SideDrawer`)**
   - Navigation Items: Built with semantic Next.js `<Link>` components for full accessibility.
   - Auth-Aware Bottom Section:
     - Unauthenticated/Guest: Full-width **"Login / Sign Up"** teal button (`/login`)
     - Authenticated: Compact user card (avatar + display name + email) + **"My Profile"** link (`/profile`) + **"Sign Out"** button (`signOut()`)

7. **Trip Cards & Detail Banner (`TripCard` & `TripDetailPage`)**
   - Image Optimization: Uses Next.js `<Image fill sizes="..." />` with WebP/AVIF output for fast Largest Contentful Paint (LCP) performance.

8. **Trip Creation Form (`TripForm`)**
   - Auth-Aware Error Banner: When unauthenticated trip creation is attempted, displays an actionable error banner containing inline **Sign In** (`/login`) and **Sign Up** (`/signup`) CTA buttons.

9. **Visa Assistant Components (`VisaCountrySelector` & `CountryVisaPage`)**
   - Sticky Search Header: Search input container uses `sticky top-[57px] z-30` with full-width overhang (`-mx-4 px-4 bg-[#F8F9FA]`) and `touch-pan-y` touch scrolling containment.
   - Detail Page Clearance: Country detail page uses `pb-32` (128px) bottom clearance to ensure the fixed CTA bar (`fixed bottom-16`) never obscures disclaimer or document checklist content.

10. **App Shell Navigation & Padding Consolidation (`BottomNav` & Desktop Sidebar)**
    - Mobile (< 768px): Fixed bottom bar (`fixed bottom-0 z-50 h-16 bg-white border-t border-[#E0E0E0] shadow-lg`) featuring 5 primary feature tabs: **Home** (`/`), **My Trips** (`/trips`), **Checklist** (`/checklist`), **Visa** (`/visa`), and **Budget** (`/budget`).
    - Desktop (≥ 768px): Persistent left sidebar featuring 6 primary navigation items including **Profile** (`/profile`).

11. **Auth Pages & Card (`LoginPage`, `SignupPage`, `AuthForm`)**
    - Layout Container: Uses `min-h-dvh` (Dynamic Viewport Height) with `overflow-y-auto` scroll containment and mobile top alignment (`justify-start sm:justify-center`) + `py-6 sm:py-8` vertical padding.

12. **User Profile Page (`ProfilePage`)**
    - Path: `/profile`
    - States: Loading (spinner), Guest (prompts to sign in/up with CTA), Authenticated (avatar initials, display name, email, auth provider, sign-out button).

---

### 📱 / 💻 Responsive & Resize Behavior

| Breakpoint | Viewport Width | Navigation Pattern | Content Layout & Max-Width | Hero & Heading Scale |
|------------|---------------|-------------------|---------------------------|----------------------|
| **Mobile (Small)** | `< 375px` | Fixed `BottomNav` (5 core tabs) + Top Hamburger `SideDrawer` | Full width with `px-4` padding, max-w-lg | Min-height 140px, Title `text-2xl` |
| **Mobile (Standard)** | `375px – 767px` | Fixed `BottomNav` (5 core tabs) + Top Hamburger `SideDrawer` | Full width with `px-4` padding, max-w-lg | Min-height 200px, Title `text-2xl` |
| **Tablet** | `768px – 1023px` | Persistent left sidebar (`w-64`), `BottomNav` hidden | Centered content `max-w-2xl mx-auto` | Min-height 240px, Title `text-3xl` |
| **Desktop** | `≥ 1024px` | Persistent left sidebar (`w-64`), `BottomNav` hidden | Main area with centered container (`max-w-2xl`) | Min-height 280px, Title `text-3xl` |

---

### 📱 Native Mobile Portability (Expo / React Native)

For future migration to React Native / Expo, use the following token mapping rules:

#### 1. Spacing Scale (Tailwind → Absolute Pixels)
| Tailwind Token | Pixel Value (Native) | Common Usage |
|----------------|----------------------|--------------|
| `gap-1` / `p-1` | `4px` | Tight icon spacing |
| `gap-2` / `p-2` | `8px` | Card internal gaps, stat box padding |
| `gap-2.5` / `p-2.5` | `10px` | Quick access gap, CTA margin |
| `gap-3` / `p-3` | `12px` | Section item gaps, dashboard section gap |
| `p-3.5` | `14px` | Compact readiness widget padding |
| `gap-4` / `p-4` | `16px` | Screen horizontal margins, card padding |
| `p-5` | `20px` | Hero internal padding |
| `-mt-10` | `-40px` | Floating widget top offset |

---

### 🧐 Design Critique & Best Practices Audit

```
================================================================================
                    UI/UX CRITIQUE & BEST PRACTICES AUDIT
================================================================================
1. Touch & Interaction Ergonomics (CRITICAL) - PASSED
   - All interactive elements (hamburger, bell, avatar link, sign-in pill, CTA) meet or exceed the mandatory 44x44px minimum touch target (Fitts' Law).
   - Quick Access flex row items scale dynamically to thumb-reachable hit zones.

2. Color Contrast & Legibility (CRITICAL) - PASSED
   - Deep Teal (#008080) on White background provides a 4.8:1 contrast ratio (exceeds WCAG AA 4.5:1 requirement).
   - Avatar initials circle provides strong visual distinction for user identity.

3. Visual Hierarchy & Depth (HIGH) - PASSED
   - Profile page uses structured card grouping for user details with clear primary action (Sign Out in subtle red tint).
================================================================================
```

---

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-08-13 | Initial redesign matching PRD mockup spec: tropical hero photo, Dancing Script tagline, floating readiness card with SVG donut chart. |
| 1.1 | 2026-08-13 | Post-review audit updates: added desktop sidebar navigation, responsive breakpoints table, native Expo/React Native portability mappings, 12px caption font size bump, and conditional CTA logic. |
| 1.2 | 2026-08-13 | Navigation overhaul: BottomNav restructured to 5 core feature tabs (Home, Trips, Checklist, Visa, Budget); PageHeader enhanced with deterministic backHref prop; all list & detail pages updated with explicit back navigation; responsive hero min-h-[160px] for small viewports (<375px). |
| 1.3 | 2026-08-13 | Quick Access Mobile Cutoff Fix: Consolidated duplicate bottom padding across all pages into layout `pb-[68px]`; reduced dashboard section gaps `gap-4`→`gap-3`; hero min-height `min-h-[140px]`; TravelReadinessWidget compacted with 72×72px donut gauge while preserving 44×44px minimum touch targets. |
| 1.4 | 2026-08-13 | Design Review & UX Defect Fixes: PageHeader 44px touch targets (`min-h-11 min-w-11`); SideDrawer semantic `<Link>` items; DashboardHeader pulsing notification dot; `next/image` LCP optimization; TripForm auth-aware error CTA buttons (`Sign In` / `Sign Up`); Visa country sticky search bar & `pb-32` CTA bar clearance. |
| 1.5 | 2026-08-13 | Auth Page Mobile Layout Overflow Fix: Updated `AuthForm` container with `min-h-dvh`, `overflow-y-auto` scroll containment, mobile top alignment (`justify-start sm:justify-center`), and responsive card spacing (`p-5 sm:p-6`, `gap-4 sm:gap-6`), guaranteeing >24px bottom clearance for footer links on small mobile screens. |
| 1.6 | 2026-08-13 | Profile Page, Quick Access Row & Auth-Aware Navigation: Added `/profile` route & component; converted Quick Access grid to single horizontal scrollable flex row; made `DashboardHeader` and `SideDrawer` auth-aware with header avatar initials / sign-in pill button and drawer profile/sign-out section; added Profile to desktop sidebar. |
| 1.7 | 2026-08-13 | Back Button Navigation Fix & Whitespace Decision: Fixed `backHref` on `/checklist/[tripId]` and `/budget/[tripId]` to navigate to `/checklist` and `/budget` respectively (was `/`). Documented intentional whitespace below Quick Access on sparse dashboards — accepted as clean minimal aesthetic (Option B); future content sections may fill this area. |
<!-- TEMPLATE_END -->

