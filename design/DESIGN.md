---
name: Tropical Utility
colors:
  primary: '#008080'
  primary-hover: '#006B6B'
  primary-container: '#E0F2F1'
  background: '#F8F9FA'
  surface: '#FFFFFF'
  text-primary: '#1A1A1A'
  text-secondary: '#6C757D'
  accent-red: '#D0021B'
  tertiary-accent: '#FF7043'
typography:
  font-primary: Inter
  font-cursive: Dancing Script
  caption-min: 12px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
rounded:
  sm: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
---

# 🎨 DESIGN.md: ITravelista PH Design System ("Tropical Utility")

## Brand & Style Guidelines
The **Tropical Utility** design system is built specifically for the modern Filipino traveler. It balances the high efficiency and trustworthiness of a travel utility tool with the visual warmth and relaxation of a tropical island getaway.

- **Aesthetic**: Corporate Modern with Tactile Softness
- **Core Principles**: Generous whitespace, high-contrast outdoor legibility, tactile cards resting on soft off-white canvas, and instant touch feedback.

---

## 🎨 Color System Tokens

| Token | Hex / Value | Usage |
|-------|-------------|-------|
| **Primary (Deep Teal)** | `#008080` | Primary CTAs, active tab icons, brand identity, header accents |
| **Primary Hover** | `#006B6B` | Hover & active state for primary buttons |
| **Secondary (Soft Aqua)** | `#E0F2F1` | Quick access icon containers, low-emphasis pill backgrounds |
| **App Canvas Background** | `#F8F9FA` | Glare-free off-white app background canvas |
| **Card Surface** | `#FFFFFF` | Elevated white card containers and popover dialogs |
| **Text Primary** | `#1A1A1A` | High contrast body text, headings, and input labels |
| **Text Secondary** | `#6C757D` | Subtitles, muted labels, empty state descriptions |
| **Accent Red** | `#D0021B` | Destructive actions (Sign Out), unread notification badge dot |
| **Tertiary Accent (Coral)** | `#FF7043` | Optional warm highlight for urgent alerts and hot travel deals |

---

## 🔤 Typography & Hierarchy

- **Primary UI Font**: `Inter` (sans-serif, weights: 400, 500, 600, 700, 900)
- **Tagline Font**: `Dancing Script` (cursive accent for brand tagline *"From Dreaming to Departing"*)
- **Minimum Font Size**: `12px` (`text-xs`) to maintain strict accessibility and outdoor readability

---

## 📐 Layout, Spacing & Elevation

- **Baseline Spacing Grid**: 4px baseline scale (`xs: 8px`, `sm: 12px`, `md: 16px`, `lg: 24px`, `xl: 32px`)
- **Container Margins**: 16px horizontal margins (`px-4`) for mobile viewports
- **Card Radius**: 24px (`rounded-3xl` / `1.5rem`) corner radius for main cards and widgets
- **Elevation**:
  - **Level 0 (Canvas)**: `#F8F9FA`
  - **Level 1 (Cards)**: White surface with ambient shadow (`0 2px 6px rgba(0,0,0,0.04)`)
  - **Level 2 (Floating Widgets)**: White surface with elevated shadow (`0 8px 24px rgba(0,0,0,0.12)`)

---

## 🧩 Component Specs

1. **Buttons**:
   - **Primary Button**: Deep Teal pill (`bg-[#008080] hover:bg-[#006B6B] rounded-full py-2.5 px-4 text-white font-bold text-xs`)
   - **Touch Target**: Minimum 44×44px hit target on all interactive buttons
2. **Hero Travel Section**:
   - Background cover image with dark gradient scrim (`from-black/70 via-black/30 to-black/10`)
   - White pill search link input (`rounded-full py-2.5 px-4 shadow-md`)
3. **Floating Travel Readiness Widget**:
   - `-mt-10` negative top margin overlapping hero banner
   - 72×72px compact SVG donut chart progress gauge
4. **Quick Access Row**:
   - Horizontal flex scroll row (`flex gap-2.5 overflow-x-auto pb-1`)
   - White cards with Soft Aqua icon containers (`h-11 w-11 bg-[#E0F2F1] text-[#008080]`)
5. **Page Header (`PageHeader`)**:
   - Sticky top bar (`sticky top-0 z-40 bg-white border-b border-[#E0E0E0] shadow-sm`)
   - Back button policy: Detail pages navigate to parent list (`/checklist`, `/budget`, `/trips`, `/visa`); list pages navigate to home (`/`).
6. **Bottom Navigation (`BottomNav`)**:
   - Fixed bottom bar (`fixed bottom-0 z-50 h-16 bg-white border-t border-[#E0E0E0] shadow-lg`)
   - 5 core tabs: **Home** (`/`), **My Trips** (`/trips`), **Checklist** (`/checklist`), **Visa** (`/visa`), **Budget** (`/budget`)
