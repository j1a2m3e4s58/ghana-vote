# Design Brief

## Direction
Ghana civic election platform with bold, intentional color application. Editorial aesthetic with strong typography hierarchy, card-based layout, mobile-first responsive design, no dark mode.

## Tone
Authoritative, trustworthy, modern. Civic responsibility meets contemporary design.

## Color Palette (OKLCH)
| Name | OKLCH | Use |
|------|-------|-----|
| Primary (Ghana Red) | 55 0.20 20 | CTAs, primary actions, vote buttons |
| Secondary (Ghana Gold) | 78 0.25 90 | Active states, success, highlights |
| Tertiary (Ghana Green) | 35 0.17 145 | Headers, sidebars, authority backgrounds |
| Background | 98 0 0 | Main content area (light) |
| Foreground | 20 0 0 | Primary text |
| Muted | 92 0 0 | Secondary backgrounds, disabled states |
| Border | 88 0 0 | Structural dividers |

## Typography
- **Display:** Satoshi (geometric, modern) — page titles, hero text, section headings
- **Body:** Plus Jakarta Sans (friendly, legible) — body copy, forms, card content
- **Mono:** JetBrains Mono — code, technical contexts

## Shape Language
Default border-radius: 10px (0.625rem). Cards and buttons maintain consistent visual rhythm. No excessive rounding — clarity prioritized.

## Structural Zones
| Zone | Treatment |
|------|-----------|
| Header | Ghana Green background (35 0.17 145), white text, border-b |
| Main Content | Light background (98 0 0), card-based grid layout |
| Cards | White (100 0 0), subtle shadow, Ghana-themed borders or accents |
| Interactive | Ghana Red for primary, Gold for secondary/success, Green for informational |
| Footer | Muted grey (92 0 0), border-t, centered content |

## Component Patterns
- **Buttons:** Primary (red bg, white text), Secondary (gold), Tertiary (outlined)
- **Cards:** Elevated cards with subtle shadow, consistent padding, media on top
- **Forms:** Full-width inputs, clear labels, Ghana Red focus ring
- **Candidate Cards:** Vertical layout — image, name, party, red vote button
- **Vote Count Cards:** Centered number, label, candidate name, muted background

## Motion
Smooth 0.3s cubic-bezier(0.4, 0, 0.2, 1) transitions on all interactive elements. Hover states increase opacity or apply subtle color shift. No bounce or elastic animations.

## Spacing & Rhythm
- **Dense:** 8px (form fields, small components)
- **Comfortable:** 16px (card padding, section spacing)
- **Generous:** 24px+ (page-level spacing, hero sections)

## Responsive Breakpoints
- **Mobile:** base, `sm:640px`
- **Tablet:** `md:768px`
- **Desktop:** `lg:1024px`, `xl:1280px`

## Signature Detail
Ghana national colors applied with structural intent—not scattered decoration. Card-based voting interface with strong visual hierarchy conveys civic authority and trust. Smooth transitions reinforce modernity.

## Anti-Patterns
- No dark mode
- No neon effects or excessive glow
- No scattered decorative gradients
- No heavily rounded elements
- No weak contrast on interactive elements
