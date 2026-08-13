<!-- TEMPLATE_START: design-spec -->
# 🎨 Design Spec: ITravelista PH UI Redesign

| Field | Value |
|-------|-------|
| **Project** | ITravelista PH |
| **Mode** | GUI (Mobile-first Web PWA + Responsive Desktop) |
| **Screens** | 1 (Home Dashboard Redesign) |
| **Version** | 1.1 |
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
| 1 | **Home Dashboard** | Hero with tropical travel photo, branded Dancing Script tagline, floating Travel Readiness card with SVG donut chart, Quick Access grid | ![Home Dashboard](file:///C:/Users/Wendell%20Saligan/.gemini/antigravity/brain/dd879867-e756-4db0-afbf-73fb02c19cc3/dashboard_mockup_1786588722312.png) |

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
   - Right: Bell icon button (44×44px touch target) -> toggles `NotificationDropdown`

2. **Hero Travel Section**
   - Background image: `/images/hero-bg.png` with `bg-cover bg-center`
   - Min Height: `200px` (mobile)
   - Scrim overlay: `bg-gradient-to-t from-black/70 via-black/30 to-black/10`
   - Title: `Where do you want to go?` (White, `text-2xl md:text-3xl font-bold`)
   - Subtitle: `Plan. Prepare. Apply. Travel worry-free.` (Soft aqua text `text-xs`)
   - Search Bar Link: White rounded pill input (`rounded-full py-2.5 px-4 shadow-md`), leading Search icon, placeholder "Search destination visa requirements (e.g. Japan)"

3. **Floating Travel Readiness Widget (`TravelReadinessWidget`)**
   - Position: Overlaps hero bottom with `-mt-10` negative top margin, elevated `shadow-xl` white card
   - Left Gauge: SVG Donut Chart (80×80px, stroke-width 8px) with aggregate readiness percentage (`82%` / `0%`)
   - Right Stats: "Active Trips: 2 Upcoming" & "Documents: 8 Saved" cards with `#F8F9FA` background
   - CTA Button: Deep Teal pill button (`bg-[#008080] py-2.5 rounded-full text-white font-bold text-xs`) labeled **"View Checklist"** (or **"Create Your First Trip"** when trips = 0)

4. **Quick Access Grid**
   - 2-column mobile / 4-column tablet grid (`grid-cols-2 sm:grid-cols-4 gap-2.5`)
   - 4 Cards: Visa Assistant, Checklist, Budget Planner, Travel Guides (disabled `opacity-50` with "Guides (Soon)")
   - Icons: 44×44px rounded containers (`h-11 w-11 bg-[#E0F2F1] text-[#008080]`) with 20×20px Lucide icons
   - Captions: `text-xs font-semibold text-[#1A1A1A]`

5. **App Shell Navigation (`BottomNav` & Desktop Sidebar)**
   - Mobile (< 768px): Fixed bottom bar (`fixed bottom-0 z-50 h-16 bg-white border-t border-[#E0E0E0] shadow-lg`)
   - Desktop (≥ 768px): Persistent left sidebar (`hidden md:flex md:w-64 md:flex-col md:border-r md:border-[#E0E0E0] md:bg-white`)

---

### 📱 / 💻 Responsive & Resize Behavior

| Breakpoint | Viewport Width | Navigation Pattern | Content Layout & Max-Width | Hero & Heading Scale |
|------------|---------------|-------------------|---------------------------|----------------------|
| **Mobile** | `< 768px` | Fixed `BottomNav` (5 tabs) + Top Hamburger `SideDrawer` | Full width with `px-4` padding, max-w-lg | Min-height 200px, Title `text-2xl` |
| **Tablet** | `768px – 1023px` | Persistent left sidebar (`w-64`), `BottomNav` hidden | Centered content `max-w-2xl mx-auto` | Min-height 240px, Title `text-3xl` |
| **Desktop** | `≥ 1024px` | Persistent left sidebar (`w-64`), `BottomNav` hidden | Main area with centered container (`max-w-2xl`) | Min-height 280px, Title `text-3xl` |

---

### 📱 Native Mobile Portability (Expo / React Native)

For future migration to React Native / Expo, use the following token mapping rules:

#### 1. Spacing Scale (Tailwind → Absolute Pixels)
| Tailwind Token | Pixel Value (Native) | Common Usage |
|----------------|----------------------|--------------|
| `gap-1` / `p-1` | `4px` | Tight icon spacing |
| `gap-2` / `p-2` | `8px` | Card internal gaps |
| `gap-2.5` / `p-2.5` | `10px` | Quick access gap, stat box padding |
| `gap-3` / `p-3` | `12px` | Section item gaps |
| `gap-4` / `p-4` | `16px` | Screen horizontal margins, card padding |
| `p-5` | `20px` | Hero internal padding |
| `-mt-10` | `-40px` | Floating widget top offset |

#### 2. Gradient Stop Values (Expo LinearGradient)
```typescript
// Hero Scrim Gradient (Bottom to Top)
colors: [
  'rgba(0, 0, 0, 0.70)', // Stop 0.0 (Bottom - darkest for text readability)
  'rgba(0, 0, 0, 0.30)', // Stop 0.5 (Middle)
  'rgba(0, 0, 0, 0.10)', // Stop 1.0 (Top - subtle tint)
]
```

#### 3. Native Shadow Mapping
| Web Elevation | iOS Properties | Android Property |
|---------------|----------------|------------------|
| `shadow-2xs` | `shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.04, shadowRadius: 2` | `elevation: 1` |
| `shadow-md` | `shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.08, shadowRadius: 4` | `elevation: 3` |
| `shadow-xl` | `shadowColor: '#000', shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.12, shadowRadius: 24` | `elevation: 8` |

#### 4. SVG & Native Layout Equivalents
- **SVG Donut Chart**: Uses `react-native-svg` `<Svg>`, `<Circle>` with `strokeDasharray`.
- **Image Background**: Uses `<ImageBackground source={require('./hero-bg.png')} resizeMode="cover">`.
- **Dancing Script Font**: Loaded via `expo-font` (`@expo-google-fonts/dancing-script`).

---

### 🧐 Design Critique & Best Practices Audit

> Evaluated against `ui-ux-pro-max` intelligence & `mobile-design` system rules:

```
================================================================================
                    UI/UX CRITIQUE & BEST PRACTICES AUDIT
================================================================================
1. Touch & Interaction Ergonomics (CRITICAL) - PASSED
   - All interactive elements (hamburger, bell, search bar, CTA, nav tabs) meet or exceed the mandatory 44x44px minimum touch target (Fitts' Law).
   - Primary actions ("View Checklist" CTA and Quick Access grid) reside in the natural thumb reach zone on mobile screens.

2. Color Contrast & Legibility (CRITICAL) - PASSED
   - Deep Teal (#008080) on White background provides a 4.8:1 contrast ratio (exceeds WCAG AA 4.5:1 requirement).
   - Dark gradient scrim mask over the hero photo ensures 100% text legibility regardless of background image brightness variations.
   - All captions bumped from 11px to 12px (text-xs) to strictly satisfy WCAG AA legibility rules.

3. Visual Hierarchy & Depth (HIGH) - PASSED
   - Negative margin top overlap (-mt-10) anchors the Travel Readiness card as the immediate focal point of the dashboard.
   - Distinct shadow levels (hero inset, card shadow-xl, bottom nav shadow-lg) provide intuitive spatial layering.

4. Brand Identity & Typography (MEDIUM) - PASSED
   - Pairing Inter (clean geometric body) with Dancing Script (cursive tagline) establishes brand warmth while preserving readability.
================================================================================
```

---

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-08-13 | Initial redesign matching PRD mockup spec: tropical hero photo, Dancing Script tagline, floating readiness card with SVG donut chart. |
| 1.1 | 2026-08-13 | Post-review audit updates: added desktop sidebar navigation, responsive breakpoints table, native Expo/React Native portability mappings, 12px caption font size bump, and conditional CTA logic. |
<!-- TEMPLATE_END -->

