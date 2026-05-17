# XWallet — Design System & Styles

## Overview

This document defines the complete visual design system for XWallet. All values are configurable via environment variables (see `.env`). The design targets a modern, secure, high-trust financial aesthetic.

## Color Palette

### Base Colors (Default — Slate + Indigo)

| Token | Default | Tailwind Equivalent | Usage |
|---|---|---|---|
| `--color-primary` | `79 70 229` | indigo-600 | Primary buttons, links, active states |
| `--color-primary-hover` | `67 56 202` | indigo-700 | Button hover states |
| `--color-secondary` | `30 41 59` | slate-800 | Secondary surfaces, cards |
| `--color-accent` | `59 130 246` | blue-500 | Accent elements, highlights |
| `--color-success` | `34 197 94` | green-500 | Confirmed transactions, positive amounts |
| `--color-warning` | `234 179 8` | yellow-500 | Pending states, warnings |
| `--color-danger` | `239 68 68` | red-500 | Failed transactions, errors, destructive actions |
| `--color-bg` | `15 23 42` | slate-900 | Page background |
| `--color-surface` | `30 41 59` | slate-800 | Card, modal, sidebar backgrounds |
| `--color-surface-elevated` | `51 65 85` | slate-700 | Elevated surfaces (dropdowns, modals) |
| `--color-border` | `51 65 85` | slate-700 | Borders, dividers |
| `--color-text` | `241 245 249` | slate-100 | Primary text |
| `--color-text-secondary` | `148 163 184` | slate-400 | Secondary/muted text |

### Semantic Tokens

```css
:root {
  --color-primary: 79 70 229;
  --color-primary-hover: 67 56 202;
  --color-secondary: 30 41 59;
  --color-accent: 59 130 246;
  --color-success: 34 197 94;
  --color-warning: 234 179 8;
  --color-danger: 239 68 68;
  --color-bg: 15 23 42;
  --color-surface: 30 41 59;
  --color-surface-elevated: 51 65 85;
  --color-border: 51 65 85;
  --color-text: 241 245 249;
  --color-text-secondary: 148 163 184;
}
```

## Typography

| Token | Default | Description |
|---|---|---|
| `--font-family` | `'Inter', system-ui, sans-serif` | Base font family |
| `--font-mono` | `'JetBrains Mono', 'Fira Code', monospace` | Addresses, amounts, code |
| `--text-xs` | `0.75rem` | Labels, timestamps |
| `--text-sm` | `0.875rem` | Secondary text, descriptions |
| `--text-base` | `1rem` | Body text |
| `--text-lg` | `1.125rem` | Card titles |
| `--text-xl` | `1.25rem` | Section headers |
| `--text-2xl` | `1.5rem` | Page headers |
| `--text-3xl` | `1.875rem` | Balance display |
| `--text-4xl` | `2.25rem` | Hero/landing |

## Spacing Scale

Uses Tailwind default spacing scale: `0.25rem` increments from `0` to `16` (`0`–`4rem`).

| Class | Value | Common Usage |
|---|---|---|
| `p-4` | 1rem | Card padding |
| `p-6` | 1.5rem | Section padding |
| `gap-2` | 0.5rem | Button groups |
| `gap-4` | 1rem | Form field spacing |
| `gap-6` | 1.5rem | Section spacing |

## Component Anatomy

### Button

```
┌──────────────────────────┐
│  [Icon]  Label  [Icon]   │  ← bg-primary, text-white
└──────────────────────────┘
```

- **Height**: `h-10` (2.5rem)
- **Padding**: `px-4 py-2`
- **Border radius**: `rounded-lg`
- **Font**: `text-sm font-medium`
- **Variants**: primary (default), secondary, ghost, danger
- **Sizes**: sm (`h-8`), default (`h-10`), lg (`h-12`)

### Card

```
┌─────────────────────────────┐
│  ┌───────────────────────┐  │
│  │  Header / Title       │  │  ← text-primary
│  ├───────────────────────┤  │
│  │                       │  │
│  │  Content Area         │  │  ← text-secondary
│  │                       │  │
│  ├───────────────────────┤  │
│  │  Footer / Actions     │  │  ← border-t
│  └───────────────────────┘  │
└─────────────────────────────┘
```

- **Background**: `bg-surface`
- **Border**: `border border-border`
- **Border radius**: `rounded-xl`
- **Padding**: `p-6`

### Input

```
┌──────────────────────────────────────┐
│  Label                               │  ← text-sm text-secondary
│  ┌────────────────────────────────┐  │
│  │  Placeholder text             │  │  ← bg-bg border-border
│  └────────────────────────────────┘  │
│  Helper/error text                   │  ← text-xs text-danger
└──────────────────────────────────────┘
```

- **Height**: `h-10`
- **Padding**: `px-3 py-2`
- **Background**: `bg-bg`
- **Border**: `border border-border rounded-lg`
- **Focus**: `ring-2 ring-primary`

### Balance Display

```
┌──────────────────────────────┐
│          Portfolio           │  ← text-sm text-secondary
│                              │
│       12.3456 ETH            │  ← text-3xl font-bold text-primary
│                              │
│      ≈ $24,691.20           │  ← text-sm text-secondary
└──────────────────────────────┘
```

## Layout

### App Layout (Authenticated)

```
┌─────────────────────────────────────────┐
│  Header                                 │
│  ┌───────┬─────────────────────────┐   │
│  │ Logo  │  Nav Links    Profile   │   │
│  └───────┴─────────────────────────┘   │
├──────┬──────────────────────────────────┤
│      │                                  │
│ Side │  Main Content Area               │
│ bar  │  (p-6)                           │
│      │                                  │
│      │                                  │
│      │                                  │
└──────┴──────────────────────────────────┘
```

- **Header**: `h-16`, `bg-surface`, `border-b border-border`
- **Sidebar**: `w-64`, `bg-surface`, hidden on mobile, hamburger toggle
- **Content**: `flex-1 p-6`, scrollable

## Shadows

| Token | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Cards |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.4)` | Modals, dropdowns |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.5)` | Elevated modals |

## Animation

| Transition | Duration | Property |
|---|---|---|
| Hover states | 150ms | `colors`, `transform` |
| Sidebar toggle | 300ms | `transform` |
| Modal open/close | 200ms | `opacity`, `transform` |
| Page transitions | 200ms | `opacity` |

## Responsive Breakpoints

| Breakpoint | Width | Layout Change |
|---|---|---|
| `sm` | 640px | — |
| `md` | 768px | Sidebar becomes collapsible |
| `lg` | 1024px | Full layout with sidebar |
| `xl` | 1280px | Max content width |

## Iconography

- Library: **Lucide React** (consistent, lightweight)
- Default size: `h-5 w-5`
- Color: Inherits from parent text color

## Dark Mode

The app uses a **dark-only** theme (financial security aesthetic). No light mode toggle for MVP. All colors above are already dark-optimized.
