# TEDx CMRNPUC ITPL Event Website

## Overview

This is a modern event website for TEDx CMRNPUC ITPL, built to promote and manage an upcoming TEDx event scheduled for December 6, 2025. The application handles event registrations, sponsorship inquiries, speaker showcases, and support tickets. It features a dynamic, immersive user experience with dark theme aesthetics, countdown timers, and an admin dashboard for event management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript using Vite as the build tool
- Single Page Application (SPA) with client-side routing via Wouter
- Component-based architecture using functional components with React Hooks

**UI Component System**
- shadcn/ui component library (New York style variant) for consistent, accessible components
- Radix UI primitives for headless, accessible component foundations
- Tailwind CSS for utility-first styling with custom design tokens
- Custom theme system supporting both light and dark modes (currently defaulting to dark)

**Design System**
- Primary color: Crimson red (#DC143C) representing TEDx branding
- Typography: Inter for body text, Montserrat for headlines
- Spacing based on Tailwind's standard scale (4, 6, 8, 12, 16, 20, 24)
- Consistent elevation system using custom shadow utilities (hover-elevate, active-elevate-2)

**State Management**
- TanStack Query (React Query) for server state management and caching
- React Hook Form with Zod validation for form state
- Local component state using React hooks (useState, useEffect)

**Page Structure**
- Home: Hero section with countdown timer and event highlights
- About: Event information and TEDx program details
- Speakers: Grid layout showcasing speakers (with "Coming Soon" fallback)
- Registration: Multi-step form for attendee registration
- Sponsors: Sponsorship tier selection and inquiry form
- Support: Contact form for support tickets
- Experience: Immersive 3D canvas animation page
- Admin Login & Dashboard: Protected admin interface

### Backend Architecture

**Server Framework**
- Express.js REST API server
- Session-based authentication using express-session
- Middleware stack: JSON parsing, URL encoding, request logging

**API Design**
- RESTful endpoints under `/api` namespace
- Admin routes protected with `requireAdmin` middleware
- Session validation for admin access (username: "cmr", password: "cmr@2026")
- CRUD operations for registrations, sponsors, support tickets, and speakers

**Session Management**
- Cookie-based sessions with configurable security settings
- Development vs production environment handling
- Session secret from environment variable (required in production)
- 24-hour session lifetime with httpOnly and sameSite cookies

**Development Environment**
- Vite integration for HMR (Hot Module Replacement) in development
- Custom error overlay for runtime errors
- Replit-specific plugins for development banner and cartographer

### Data Storage

**Database**
- PostgreSQL via Neon serverless driver
- Drizzle ORM for type-safe database queries
- Connection pooling with WebSocket support for serverless environments

**Schema Design**
- **users**: Admin user authentication (id, username, password)
- **registrations**: Event attendee registrations (name, email, phone, college details, payment status)
- **sponsors**: Sponsorship inquiries (company info, tier selection, message)
- **supportTickets**: Support requests with admin reply capability (status tracking, reply timestamps)
- **speakers**: Speaker profiles (name, title, bio, image URL, social links)

**Validation**
- Drizzle-Zod integration for runtime schema validation
- Type-safe inserts with createInsertSchema
- Client and server-side validation using shared Zod schemas

**Migration Strategy**
- Drizzle Kit for schema migrations
- Migration files stored in `/migrations` directory
- Push-based deployment with `db:push` command

### External Dependencies

**Core Libraries**
- **React 18**: UI framework with concurrent features
- **TypeScript**: Type safety across frontend and backend
- **Express**: Web server framework
- **Drizzle ORM**: Database ORM with PostgreSQL support
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management with performance optimization
- **Zod**: Schema validation library
- **Wouter**: Lightweight routing library

**UI Components**
- **Radix UI**: Comprehensive set of accessible component primitives (17+ components including Dialog, Dropdown, Select, Toast, etc.)
- **shadcn/ui**: Pre-styled components built on Radix UI
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant styling
- **cmdk**: Command palette component

**Database & Infrastructure**
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **connect-pg-simple**: PostgreSQL session store for express-session
- **ws**: WebSocket library for Neon connection

**Build Tools**
- **Vite**: Fast build tool and dev server
- **esbuild**: JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind
- **tsx**: TypeScript execution for development

**Replit Integration**
- Development plugins for runtime error overlay, cartographer, and dev banner
- Optimized for Replit's deployment environment