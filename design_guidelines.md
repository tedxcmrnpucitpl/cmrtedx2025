# TEDx CMRNPUC ITPL - Design Guidelines

## Design Approach
**Reference-Based with Creative Freedom**: Drawing inspiration from modern event websites (TEDx official sites, Awwwards-winning event pages) combined with immersive 3D experiences. The design balances professional credibility with bold, innovative visual storytelling.

## Color Strategy
Red (#DC143C primary, #8B0000 dark) and Black (#000000, #1a1a1a) palette as specified. Use red for CTAs, accents, and energy; black for backgrounds and grounding. White text for contrast on dark backgrounds.

## Typography System
**Font Stack**: 
- Headlines: Bold, modern sans-serif (Montserrat Bold/Black or Space Grotesk Bold) - 3xl to 6xl
- Body: Clean sans-serif (Inter or DM Sans) - base to lg
- Accents: Use all-caps sparingly for labels and CTAs

**Hierarchy**:
- Hero Headlines: text-5xl to text-7xl, font-bold
- Section Headers: text-3xl to text-4xl, font-bold
- Subheadings: text-xl to text-2xl, font-semibold
- Body: text-base to text-lg, font-normal

## Layout & Spacing
**Spacing Units**: Primarily use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistency
- Section padding: py-16 md:py-24 lg:py-32
- Component spacing: gap-8 md:gap-12
- Container max-width: max-w-7xl with px-6 md:px-8

## Page-Specific Layouts

### Home Page
- Full-viewport hero with dynamic 3D background elements (floating TEDx letters, abstract shapes)
- Countdown timer as centerpiece (large, animated digits)
- Event details section below fold: date, time, venue with map preview
- CTA section for registration
- Scroll-triggered animations revealing sections

### Registration/Sponsor/Support Pages
- Split layout: Left side with form, right side with imagery/graphics
- Form inputs: Outlined style with red focus states, generous padding (p-4)
- Multi-step indicator for registration flow
- Clear success states before payment redirect

### Speakers Page
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- "Coming Soon" state: Elegant placeholder cards with silhouettes and animated shimmer
- Future speaker cards: Image, name, title, short bio

### About Page
- Long-form content with max-w-4xl for readability
- Embedded map with custom red marker styling
- Timeline/schedule section with visual hierarchy
- Mix of text blocks and visual elements

### TEDx Experience Page (3D Animation)
- Full-screen immersive canvas with Three.js/WebGL
- Continuous animations: floating 3D objects, particle systems, camera movements
- Scroll-driven progression through different scenes
- Text overlays fade in/out with animation
- Red geometric shapes, glowing effects, depth of field
- Display after user scrolls through event details

### Admin Panel
- Dashboard layout with sidebar navigation
- Data tables for registrations/tickets with search/filter
- Modal overlays for speaker management (add/edit)
- Toast notifications for actions
- Clean, functional interface prioritizing readability

## Component Library

**Navigation**: 
- Sticky header with glass-morphism effect on scroll
- Logo left, menu items right, CTA button highlighted in red
- Mobile: Hamburger menu with full-screen overlay

**Buttons**:
- Primary: Red background, white text, px-8 py-4, rounded-lg
- Secondary: Outlined red border, transparent background
- Hover states: Subtle scale (scale-105) and glow effects

**Cards**:
- Slight elevation with shadow-xl
- Red accent border on hover
- Padding: p-6 to p-8

**Forms**:
- Input fields: border-2, rounded-lg, p-4, focus:border-red-500
- Labels: text-sm, font-medium, mb-2
- Error states: border-red-500, text-red-500

**Countdown Timer**:
- Large digit display: text-6xl md:text-8xl
- Grid layout for days:hours:mins:secs
- Red glowing effect on numbers
- Labels beneath each unit

## Animations
- Scroll-triggered fade-ins and slide-ups (intersection observer)
- Parallax on hero sections (subtle, 0.5 speed)
- 3D transforms on cards (slight tilt on hover)
- Smooth page transitions
- Loading states with skeleton screens
- Keep animations purposeful - avoid over-animation except on 3D Experience page

## Images
**Hero Section**: Large, high-impact TEDx event imagery or 3D rendered background
**Speakers**: Professional headshots, circular or rounded-square crops
**About Page**: Venue photos, past event highlights
**3D Page**: Abstract, programmatically generated visuals

## Footer
- Three-column layout: Branding | Quick Links | Contact
- Copyright notice, email, phone numbers clearly displayed
- Social media icons if applicable
- Subtle red accent line at top

## Responsive Breakpoints
- Mobile-first approach
- Tablet (md): 768px - 2 columns where appropriate
- Desktop (lg): 1024px - Full layouts, 3+ columns
- Stack all multi-column layouts to single column on mobile