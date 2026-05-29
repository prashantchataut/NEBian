## Goal (incl. success criteria):
Build NEBians - a production-grade, PWA-enabled web app for Nepali NEB students with resources, PDF annotations, discussion forum, offline caching, and push notifications. Success = fully functional app deployed to GitHub with all core features working.

## Constraints/Assumptions:
- Next.js 16 App Router with TypeScript (strict)
- Django backend (outline/core only - database is last priority)
- Auth: Google OAuth + SSO + email/password (outline only)
- Poppins font throughout, NO emojis, NO excessive shadows/gradients
- Heart icon for likes (NOT thumbs up)
- Forum screens are standalone pages, NOT fragments or nav items
- Package name: com.neb.ians
- M3 (Material Design 3) inspired design system
- Modern minimal UI (Linear/Notion quality)

## Key Decisions:
- Next.js 16 App Router (latest, RSC, better perf)
- Zustand over Redux (lighter, simpler)
- React-PDF + custom annotation layer over commercial viewers
- IndexedDB over localStorage for annotations (structured data, larger capacity)
- Fuse.js client-side search (MVP simplicity, no backend needed)
- Lucide icons (modern, tree-shakeable)
- M3 design tokens via CSS custom properties (clean theming)
- Django backend outline only (database last priority)

## State:
- Done: Project initialized, M3 design system, all core pages built, UI primitives, theme system, resource browser, PDF viewer scaffold, forum pages, notifications, settings, IndexedDB layer, Zustand stores, PWA manifest
- Now: Build passes, ready for GitHub push
- Next: Implement actual PDF rendering with react-pdf, wire up Django backend, add auth pages, add PWA icons, add service worker, performance optimization

## Open Questions (UNCONFIRMED):
- Django backend URL/endpoints (TBD when database is prioritized)
- PWA icon designs (need actual 192x192 and 512x512 images)
- Push notification VAPID keys (need to generate for production)

## Working Set (files/commands):
- `app/` - All page routes (auth, main, forum, resources, notifications, settings)
- `components/` - UI primitives + layout components
- `lib/` - Utils, IndexedDB annotations, Fuse.js search
- `stores/` - Zustand stores (theme, resource, forum)
- `types/` - All TypeScript types and constants
- `public/manifest.json` - PWA manifest
- Build: `npx next build` (passes)