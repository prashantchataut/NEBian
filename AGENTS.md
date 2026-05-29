# AGENTS.md - NEBians Project Knowledge Base

## Architecture Decisions

### Tech Stack
- **Framework:** Next.js 16 (App Router) with Server Components
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + CSS custom properties (M3 design system)
- **State:** Zustand v5 (lightweight, SSR-compatible)
- **Backend:** Django 5.x (outline/core - database is last priority)
- **PDF Viewer:** React-PDF (pdf.js) with custom annotation layer
- **Offline:** Service Worker + IndexedDB (idb) for annotations and caching
- **Search:** Fuse.js (client-side fuzzy search)
- **Icons:** Lucide React (tree-shakeable, modern stroke style)
- **Font:** Poppins via next/font (zero layout shift)
- **Auth:** Google OAuth + SSO + email/password (outline only)
- **Package:** com.neb.ians
- **Deployment:** Vercel (native Next.js support, auto-deploy on push)

### Design System (M3-Inspired)
- **NO emojis** anywhere in the UI
- **NO gradients** - solid colors only
- **NO excessive shadows** - M3 uses tonal surfaces for elevation
- **Heart icon** for likes (NOT thumbs up)
- **Poppins** font throughout
- **Subject color coding:** Physics=indigo, Chemistry=emerald, Math=violet, Biology=teal, English=orange, Nepali=red
- **M3 color tokens** via CSS custom properties on :root and [data-theme="dark"]
- **Tonal elevation** instead of box-shadows

### Key Patterns
- Server Components by default, 'use client' only at leaf boundaries
- Suspense boundaries on every async route segment
- Dynamic imports for heavy components (PDF viewer, markdown editor)
- Optimistic UI updates for likes, bookmarks
- URL search params for filter state (shareable/bookmarkable)
- IndexedDB for all offline data (annotations, reading progress, cached resources)
- Forum screens are STANDALONE PAGES, not fragments or nav items
- Vercel deployment with auto-preview on every push
- SEO metadata via layout.tsx files with generateMetadata for dynamic routes
- Title template pattern: "%s | NEBians"

## Project Structure
```
NEBians/
├── app/
│   ├── (auth)/              # Auth route group
│   │   ├── layout.tsx       # Centered auth layout with branding
│   │   ├── login/page.tsx   # Login (email + Google OAuth)
│   │   └── register/page.tsx # Register with grade selection
│   ├── (main)/              # Main app route group
│   │   ├── layout.tsx       # Sidebar + mobile nav + topbar
│   │   ├── page.tsx         # Home dashboard
│   │   ├── resources/
│   │   │   ├── page.tsx     # Resource browser (filter + search)
│   │   │   ├── loading.tsx  # Skeleton loading
│   │   │   ├── error.tsx    # Error boundary
│   │   │   └── [id]/page.tsx # Resource detail + PDF viewer
│   │   ├── forum/
│   │   │   ├── page.tsx     # Question list (standalone)
│   │   │   ├── loading.tsx  # Skeleton loading
│   │   │   ├── error.tsx    # Error boundary
│   │   │   ├── ask/page.tsx # Ask question (standalone)
│   │   │   └── [questionId]/
│   │   │       ├── page.tsx # Question detail + answers
│   │   │       └── answer/page.tsx # Write answer (standalone)
│   │   ├── notifications/page.tsx
│   │   └── settings/
│   │       ├── page.tsx     # Settings (theme, notifications, storage)
│   │       └── profile/page.tsx # Profile editing
│   ├── globals.css          # M3 theme tokens + Tailwind
│   ├── layout.tsx           # Root layout (Poppins, ThemeProvider, AppShell)
│   ├── loading.tsx          # Root loading skeleton
│   ├── error.tsx            # Root error boundary
│   └── not-found.tsx        # 404 page
├── backend/                 # Django API (outline/core)
│   ├── nebians/              # Django project settings
│   ├── resources/            # Resource models, serializers, views
│   ├── forum/                # Forum models, serializers, views
│   ├── users/                # Custom user model
│   ├── manage.py             # Django management
│   └── requirements.txt     # Python dependencies
├── components/
│   ├── ui/                  # Button, Card, Input, Badge, Avatar, Separator, Skeleton, Textarea
│   ├── layout/              # Sidebar, MobileNav, TopBar, ThemeToggle
│   ├── providers/            # ThemeProvider, AppShell (SW registration + offline)
│   ├── pdf/                 # PdfViewer, AnnotationLayer, index (dynamic import)
│   ├── resource/            # (To be built)
│   └── forum/               # (To be built)
├── hooks/
│   ├── use-offline-status.tsx   # Online/offline detection + banner
│   ├── use-push-notifications.tsx # Notification permission hook
│   └── use-pdf-annotations.tsx  # PDF annotations hook
├── lib/
│   ├── utils.ts             # cn, formatDate, formatFileSize, etc.
│   ├── pdf-annotations.ts   # IndexedDB annotation CRUD
│   └── search.ts            # Fuse.js search helpers
├── stores/
│   ├── theme-store.ts
│   ├── resource-store.ts
│   └── forum-store.ts
├── types/
│   └── index.ts             # All TypeScript types + constants
├── public/
│   ├── manifest.json         # PWA manifest (com.neb.ians)
│   ├── sw.js                # Service worker (caching + push)
│   └── icons/               # App icons (SVG 192 + 512)
├── scripts/
│   └── generate-icons.js    # PWA icon generator
├── docs/plans/              # Implementation plan
├── AGENTS.md
├── CONTINUITY.md
├── vercel.json              # Vercel deployment config
└── next.config.ts           # Next.js configuration
```

## Learnings
- Next.js 16 uses Turbopack by default for builds
- Tailwind v4 uses @theme inline directive for custom tokens
- M3 design tokens map cleanly to CSS custom properties
- TypeScript strict mode catches const assertion issues with ANNOTATION_COLORS
- React-PDF's PDFDocumentProxy type differs between react-pdf and pdfjs-dist - use inline type annotation
- Hook files with JSX must use .tsx extension, not .ts
- GitHub repo name is "NEBian" (no 's'), deployed via Vercel
- Next.js lint rule: use `<Link>` instead of `<a>` for internal navigation
- React 19 lint rule: avoid calling setState synchronously in useEffect - use initial state or requestAnimationFrame
- Vercel CLI project name must be lowercase without special chars
- Django migrations and __pycache__ should be in .gitignore

## Known Issues
- PWA icons are SVG - need proper PNG icons (192x192, 512x512) for full install prompt support
- react-pdf pdf.js worker needs production configuration testing
- Auth pages (login/register) are UI-only - no backend integration yet
- Django backend is outline/core - database is last priority
- Mock data used throughout - needs real API integration
- Avatar component uses `<img>` instead of `next/image` (acceptable for external URLs)

## Deployment Notes
- Deployed on Vercel: https://nebians.vercel.app
- GitHub repo: https://github.com/prashantchataut/NEBian
- Auto-deploy on push to main
- PWA requires HTTPS (Vercel provides this)
- Service worker registration in AppShell component
- Django backend runs separately (python manage.py runserver)
- Environment variables needed: none for MVP (Django backend TBD)