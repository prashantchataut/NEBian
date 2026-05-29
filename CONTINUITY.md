## Goal (incl. success criteria):
Build NEBians - a production-grade, PWA-enabled web app for Nepali NEB students with resources, PDF annotations, discussion forum, offline caching, and push notifications. Success = fully functional app deployed to Vercel with all core features working.

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
- Deployment: Vercel (native Next.js support)

## Key Decisions:
- Next.js 16 App Router (latest, RSC, better perf)
- Zustand over Redux (lighter, simpler)
- React-PDF + custom annotation layer over commercial viewers
- IndexedDB over localStorage for annotations (structured data, larger capacity)
- Fuse.js client-side search (MVP simplicity, no backend needed)
- Lucide icons (modern, tree-shakeable)
- M3 design tokens via CSS custom properties (clean theming)
- Django backend outline only (database last priority)
- Vercel for deployment (native Next.js, auto-preview on push)

## State:
- Done: Project initialized, M3 design system, all core pages built, UI primitives, theme system, resource browser, PDF viewer with annotations, forum standalone screens, notifications, settings, auth pages (login/register), IndexedDB layer, Zustand stores, PWA manifest + service worker, offline banner, error/loading boundaries, pushed to GitHub
- Now: Set up Vercel deployment, final verification
- Next: Wire up Django backend, add real data, add PWA icons (192+512 PNG), add auth integration, performance audit

## Open Questions (UNCONFIRMED):
- Django backend URL/endpoints (TBD when database is prioritized)
- PWA icon designs (need actual 192x192 and 512x512 PNG images)
- Push notification VAPID keys (need to generate for production)

## Working Set (files/commands):
- `app/` - All page routes (auth, main, forum, resources, notifications, settings)
- `components/` - UI primitives + layout + PDF viewer + providers
- `hooks/` - useOfflineStatus, usePushNotifications, usePdfAnnotations
- `lib/` - Utils, IndexedDB annotations, Fuse.js search
- `stores/` - Zustand stores (theme, resource, forum)
- `types/` - All TypeScript types and constants
- `public/sw.js` - Service worker
- `public/manifest.json` - PWA manifest
- Build: `npx next build` (passes clean)
- Repo: https://github.com/prashantchataut/NEBian