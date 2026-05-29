# NEBians Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a production-grade, PWA-enabled web application for Nepali NEB exam students with resources, PDF annotations, discussion forum, offline caching, and push notifications.

**Architecture:** Next.js 15 App Router with Server Components, Supabase for backend (auth, forum, resource metadata), IndexedDB for offline annotations, Service Worker for caching, Zustand for client state, Tailwind CSS v4 for styling with CSS variables for theming.

**Tech Stack:** Next.js 15, TypeScript (strict), Tailwind CSS v4, Zustand, Supabase, React-PDF (pdf.js), IndexedDB (idb), Fuse.js, Lucide React, next-pwa, Poppins font

---

## Phase 1: Project Scaffolding & Core Infrastructure

### Task 1: Create GitHub Repo & Initialize Next.js Project

**Files:**
- Create: `.github/`, `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`

**Step 1: Create GitHub repository**
```bash
cd C:\projects\NEBIAN
gh repo create NEBians --public --description "Modern minimalist learning platform for Nepali NEB students" --clone=false
git init
git remote add origin https://github.com/<username>/NEBians.git
```

**Step 2: Initialize Next.js project**
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

**Step 3: Install core dependencies**
```bash
npm install zustand @supabase/supabase-js react-pdf lucide-react fuse.js idb next-pwa next-themes
npm install -D @types/node
```

**Step 4: Configure next.config.ts for PWA and performance**
- Set up `next-pwa` with 1-year cache for static assets
- Configure image optimization domains
- Set up headers for caching

**Step 5: Configure TypeScript strict mode**
- Enable `strict: true`, `noUncheckedIndexedAccess`, `paths` alias

**Step 6: Create initial commit**
```bash
git add .
git commit -m "feat: initialize Next.js 15 project with TypeScript, Tailwind, and core deps"
```

---

### Task 2: Design System & Theme Infrastructure

**Files:**
- Create: `app/globals.css`, `app/layout.tsx`, `lib/theme.ts`, `stores/theme-store.ts`, `components/ui/` (all primitives)

**Step 1: Set up CSS custom properties for theming**
- Define light/dark theme tokens as CSS variables on `:root` and `[data-theme="dark"]`
- Colors, spacing, border-radius, font sizes all tokenized
- NO shadows beyond `shadow-sm`, NO gradients

**Step 2: Configure Poppins font via next/font**
```tsx
import { Poppins } from 'next/font/google'
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' })
```

**Step 3: Create ThemeProvider with next-themes**
- System preference detection
- Persisted toggle (localStorage)
- Smooth transition between themes (no flash)
- Apply `data-theme` attribute on `<html>`

**Step 4: Build UI primitives (components/ui/)**
- `Button` - variants: primary, secondary, ghost, danger; sizes: sm, md, lg
- `Card` - flat design, subtle border, no heavy shadows
- `Input` - clean, minimal, with label and error states
- `Badge` - for subject tags, resource types
- `Avatar` - for forum users
- `Separator` - thin lines, no heavy dividers
- `Dialog` - for confirmations, modals
- `Sheet` - slide-out panels
- `Tabs` - where needed (NOT in forum navigation)
- `Toast` - notifications feedback

**Step 5: Verify theme switching works**
- Toggle between light/dark
- Check no flash on page load
- Check Poppins renders correctly

**Step 6: Commit**
```bash
git add .
git commit -m "feat: design system with Poppins font, dark/light theme, UI primitives"
```

---

### Task 3: App Layout & Navigation

**Files:**
- Create: `app/(main)/layout.tsx`, `components/layout/Sidebar.tsx`, `components/layout/TopBar.tsx`, `components/layout/MobileNav.tsx`, `components/layout/ThemeToggle.tsx`

**Step 1: Create root layout with theme provider**
- Wrap app in ThemeProvider
- Apply Poppins font variable
- Set metadata (title, description, icons)

**Step 2: Build responsive sidebar navigation**
- Desktop: fixed left sidebar (240px) with nav items
- Mobile: bottom sheet nav
- Nav items: Home, Resources, Forum, Notifications, Settings
- Active state: accent color indicator, no background fill
- Lucide icons for each nav item

**Step 3: Build top bar with theme toggle and search**
- Search bar (expandable on mobile)
- Theme toggle (sun/moon icon)
- Notification bell with badge count
- User avatar dropdown

**Step 4: Create loading and error boundaries**
- `app/loading.tsx` - skeleton loader
- `app/error.tsx` - error boundary with retry
- `app/not-found.tsx` - 404 page

**Step 5: Verify navigation and responsive behavior**
- Test desktop sidebar
- Test mobile nav
- Verify theme toggle persistence

**Step 6: Commit**
```bash
git add .
git commit -m "feat: app layout with responsive sidebar nav, top bar, theme toggle"
```

---

## Phase 2: Resource System

### Task 4: Supabase Setup & Database Schema

**Files:**
- Create: `lib/db.ts`, `lib/supabase-server.ts`, `types/index.ts`
- Create: Supabase migration files

**Step 1: Create Supabase project and tables**
```sql
-- Resources table
CREATE TABLE resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL, -- Physics, Chemistry, Mathematics, Biology, etc.
  grade TEXT NOT NULL, -- Grade 10, Grade 11, Grade 12
  type TEXT NOT NULL, -- Textbook, Notes, Past Papers, Practice Set
  file_url TEXT NOT NULL,
  file_size BIGINT,
  thumbnail_url TEXT,
  page_count INTEGER,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum questions
CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  subject TEXT,
  grade TEXT,
  tags TEXT[],
  likes_count INTEGER DEFAULT 0,
  answers_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum answers
CREATE TABLE answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  is_accepted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Likes (for both questions and answers)
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  target_id UUID NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('question', 'answer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, target_id, target_type)
);

-- Notifications
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  type TEXT NOT NULL, -- announcement, answer, like
  title TEXT NOT NULL,
  content TEXT,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookmarks
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, resource_id)
);

-- Indexes
CREATE INDEX idx_resources_subject ON resources(subject);
CREATE INDEX idx_resources_grade ON resources(grade);
CREATE INDEX idx_resources_type ON resources(type);
CREATE INDEX idx_questions_subject ON questions(subject);
CREATE INDEX idx_questions_created ON questions(created_at DESC);
CREATE INDEX idx_answers_question ON answers(question_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, read);
```

**Step 2: Set up Supabase client libraries**
- `lib/db.ts` - browser client
- `lib/supabase-server.ts` - server client with cookies

**Step 3: Define TypeScript types**
- Resource, Question, Answer, Like, Notification, Bookmark types
- Supabase generated types (via `npx supabase gen types`)

**Step 4: Commit**
```bash
git add .
git commit -m "feat: Supabase schema, client setup, TypeScript types"
```

---

### Task 5: Resource Browsing & Categorization

**Files:**
- Create: `app/(main)/resources/page.tsx`, `app/(main)/resources/[id]/page.tsx`, `components/resource/ResourceCard.tsx`, `components/resource/ResourceFilters.tsx`, `components/resource/ResourceSearch.tsx`, `lib/search.ts`, `stores/resource-store.ts`

**Step 1: Build resource listing page**
- Grid layout with responsive columns (1 mobile, 2 tablet, 3 desktop)
- Resource cards showing: thumbnail, title, subject badge, grade badge, type badge, download count
- Card design: flat, subtle border, no shadows, rounded corners
- Subject color coding (Physics=blue, Chemistry=green, Math=purple, Biology=teal, English=orange, Nepali=red)

**Step 2: Build filter system**
- Subject filter (multi-select chips)
- Grade filter (multi-select chips)
- Type filter (multi-select chips)
- Sort options: Newest, Most Downloaded, A-Z
- All filters as URL search params for shareable/bookmarkable URLs

**Step 3: Build search functionality**
- Fuse.js fuzzy search over title, subject, description
- Debounced input (300ms)
- Highlight matching terms in results
- Search combines with active filters

**Step 4: Build resource detail page**
- Hero section with title, metadata, download button
- PDF viewer (placeholder for Task 7)
- Related resources sidebar
- Bookmark button

**Step 5: Implement bookmarks**
- Bookmark/unbookmark toggle on resource cards
- Bookmarks page showing saved resources
- Optimistic UI updates

**Step 6: Commit**
```bash
git add .
git commit -m "feat: resource browsing with filters, search, categorization, bookmarks"
```

---

### Task 6: PDF Viewer with Annotations

**Files:**
- Create: `components/pdf/PdfViewer.tsx`, `components/pdf/AnnotationLayer.tsx`, `components/pdf/HighlightTool.tsx`, `components/pdf/UnderlineTool.tsx`, `components/pdf/StickyNoteTool.tsx`, `components/pdf/PdfToolbar.tsx`, `components/pdf/AnnotationSidebar.tsx`, `lib/pdf-annotations.ts`, `hooks/usePdfAnnotations.ts`

**Step 1: Set up React-PDF with worker**
- Dynamic import (heavy component, not in initial bundle)
- Configure pdf.js worker
- Page-by-page rendering with virtual scrolling for large PDFs
- Zoom controls (50% to 300%)
- Page navigation (prev/next/jump to page)

**Step 2: Build annotation data layer with IndexedDB**
```typescript
// lib/pdf-annotations.ts
interface PdfAnnotation {
  id: string;
  pdfId: string;
  type: 'highlight' | 'underline' | 'sticky-note';
  pageNumber: number;
  rect?: { x: number; y: number; width: number; height: number };
  position?: { x: number; y: number };
  text?: string;
  color: string;
  createdAt: number;
  updatedAt: number;
}
```
- CRUD operations via `idb` library
- Indexed by `pdfId` for fast per-document queries
- Auto-save on annotation change (debounced 500ms)

**Step 3: Build highlight tool**
- Text selection triggers highlight mode
- Color picker (yellow, green, blue, pink, orange)
- Rendered as semi-transparent overlay rectangles on the PDF page
- Tap to delete, long-press to edit color

**Step 4: Build underline tool**
- Similar to highlight but renders as a line under selected text
- Same color options
- SVG overlay on PDF page

**Step 5: Build sticky note tool**
- Click anywhere on page to place a sticky note
- Small colored pin icon at placement point
- Expandable note with text input
- Drag to reposition
- Delete button on expanded note

**Step 6: Build annotation toolbar**
- Tool selection: highlight, underline, sticky note, eraser
- Color picker
- Annotation list toggle (sidebar showing all annotations for current PDF)
- Annotation count badge

**Step 7: Build annotation sidebar**
- Lists all annotations for current PDF
- Grouped by page number
- Click annotation to navigate to that page
- Edit/delete annotations from sidebar
- Search within annotations

**Step 8: Implement reading progress**
- Save last-read page per PDF in IndexedDB
- On reopening, scroll to last-read position
- Progress bar in toolbar showing percentage read

**Step 9: Verify PDF viewer and annotations**
- Load a test PDF
- Create highlights, underlines, sticky notes
- Verify persistence across page refresh
- Verify offline access

**Step 10: Commit**
```bash
git add .
git commit -m "feat: PDF viewer with highlight, underline, sticky notes, reading progress"
```

---

## Phase 3: Discussion Forum

### Task 7: Forum - Question List & Creation

**Files:**
- Create: `app/(main)/forum/page.tsx`, `app/(main)/forum/ask/page.tsx`, `components/forum/QuestionCard.tsx`, `components/forum/QuestionForm.tsx`, `components/forum/QuestionFilters.tsx`, `stores/forum-store.ts`

**Step 1: Build forum home page (standalone screen)**
- List of questions with: title, author avatar+name, subject+grade tags, like count (heart icon), answer count, timestamp
- Heart icon for likes (NOT thumbs up)
- Sort: Newest, Most Liked, Unanswered
- Filter by subject, grade
- Pagination (infinite scroll)

**Step 2: Build ask question page (standalone screen)**
- Full-page form, NOT a modal or fragment
- Title input, rich text content area (markdown support), subject selector, grade selector, tags input
- Preview before submit
- Validation: title min 10 chars, content min 20 chars, subject required

**Step 3: Wire up to Supabase**
- Fetch questions with author profiles
- Insert new question
- Like/unlike with optimistic update
- Real-time subscription for new questions

**Step 4: Commit**
```bash
git add .
git commit -m "feat: forum question list and ask question standalone pages"
```

---

### Task 8: Forum - Answer & Reply Pages

**Files:**
- Create: `app/(main)/forum/[questionId]/page.tsx`, `app/(main)/forum/[questionId]/answer/page.tsx`, `components/forum/AnswerCard.tsx`, `components/forum/AnswerForm.tsx`

**Step 1: Build question detail page (standalone screen)**
- Full question with metadata at top
- Sorted answers below (accepted answer first, then by likes)
- Each answer: content, author, like count (heart icon), accepted badge
- "Write Answer" button navigates to `/forum/[questionId]/answer` (standalone screen)

**Step 2: Build answer page (standalone screen)**
- Full-page form for writing an answer
- Markdown editor with preview
- Reference question context at top
- Validation: content min 20 chars

**Step 3: Wire up to Supabase**
- Fetch question + answers with author profiles
- Insert new answer
- Like/unlike answers
- Accept answer (question author only)
- Real-time subscription for new answers

**Step 4: Commit**
```bash
git add .
git commit -m "feat: forum answer and reply standalone pages with real-time updates"
```

---

## Phase 4: Offline, Notifications & Polish

### Task 9: Offline Caching & Service Worker

**Files:**
- Create: `public/sw.js`, `lib/offline-cache.ts`, `hooks/useOfflineStatus.ts`, `next.config.ts` (update)

**Step 1: Configure next-pwa**
- Cache static assets for 1 year
- Cache PDF files with stale-while-revalidate
- Exclude API routes from caching
- Offline fallback page

**Step 2: Build offline status indicator**
- Hook that detects online/offline status
- Banner notification when going offline
- Queue mutations for sync when back online
- Visual indicator in nav bar

**Step 3: Implement resource caching**
- Cache opened PDFs in IndexedDB for offline access
- Show "Available Offline" badge on cached resources
- Background sync for annotations when back online

**Step 4: Commit**
```bash
git add .
git commit -m "feat: PWA with offline caching, service worker, sync queue"
```

---

### Task 10: Push Notifications

**Files:**
- Create: `app/(main)/notifications/page.tsx`, `lib/notifications.ts`, `hooks/usePushNotifications.ts`, `app/api/notifications/subscribe/route.ts`

**Step 1: Set up Web Push**
- Generate VAPID keys
- Subscribe/unsubscribe endpoint
- Store push subscriptions in Supabase

**Step 2: Build notification permission flow**
- Request permission on first visit (after user interaction)
- Settings toggle for notification preferences
- Permission status indicator in nav

**Step 3: Build notifications page**
- List of notifications grouped by date
- Types: announcements, new answers, likes
- Mark as read, mark all as read
- Click notification to navigate to relevant content
- Real-time via Supabase realtime

**Step 4: Build notification bell in top bar**
- Unread count badge
- Dropdown with recent notifications
- Mark all as read action

**Step 5: Commit**
```bash
git add .
git commit -m "feat: push notifications with real-time updates, notification center"
```

---

### Task 11: Home Dashboard & Settings

**Files:**
- Create: `app/(main)/page.tsx`, `app/(main)/settings/page.tsx`, `components/dashboard/RecentResources.tsx`, `components/dashboard/PopularResources.tsx`, `components/dashboard/ForumActivity.tsx`

**Step 1: Build home dashboard**
- Welcome section with user name
- Quick access to recently viewed resources
- Popular resources this week
- Recent forum activity
- Subject quick links (color-coded cards)
- Offline status indicator

**Step 2: Build settings page**
- Theme preference (light/dark/system)
- Notification preferences
- Cache management (view size, clear cache)
- About section

**Step 3: Commit**
```bash
git add .
git commit -m "feat: home dashboard and settings page"
```

---

## Phase 5: Auth & Final Polish

### Task 12: Authentication

**Files:**
- Create: `app/(auth)/login/page.tsx`, `app/(auth)/register/page.tsx`, `lib/auth.ts`, `middleware.ts`

**Step 1: Set up Supabase Auth**
- Email/password authentication
- Google OAuth (optional)
- Auth middleware protecting routes
- Auth context provider

**Step 2: Build login page**
- Clean, minimal form
- Email + password fields
- "Forgot password?" link
- "Register" link
- Error states with clear messages

**Step 3: Build register page**
- Name, email, password, confirm password
- Grade selection (for personalization)
- Terms acceptance
- Validation with clear error messages

**Step 4: Build auth middleware**
- Protect `/forum/ask`, `/forum/[id]/answer`, bookmarks
- Redirect unauthenticated users to login
- Pass auth context to server components

**Step 5: Commit**
```bash
git add .
git commit -m "feat: authentication with Supabase Auth, login/register pages"
```

---

### Task 13: Performance Optimization & Final Polish

**Files:**
- Modify: Various files for optimization
- Create: `app/manifest.ts`, `public/manifest.json`

**Step 1: Performance audit and fixes**
- Run Lighthouse audit
- Ensure LCP < 1.5s
- Dynamic imports for PDF viewer, forum editor
- Image optimization via next/image
- Font optimization via next/font
- Bundle analysis and tree-shaking

**Step 2: PWA manifest**
- App name: NEBians
- Short name: NEBians
- Theme colors matching design system
- Icons (192x192, 512x512)
- Package: com.neb.ians

**Step 3: SEO optimization**
- generateMetadata for all public pages
- Open Graph tags
- Structured data for resources
- Sitemap generation

**Step 4: Accessibility audit**
- Keyboard navigation for PDF viewer
- Screen reader labels on all interactive elements
- Color contrast ratios (WCAG AA)
- Focus management on route changes

**Step 5: Final verification**
- `npm run build` with zero errors
- `npm run lint` with zero warnings
- Type check passes: `npx tsc --noEmit`
- Lighthouse scores: Performance > 90, Accessibility > 90

**Step 6: Push to GitHub**
```bash
git add .
git commit -m "feat: performance optimization, PWA manifest, SEO, a11y audit"
git push -u origin main
```

---

## Phase 6: Documentation

### Task 14: Create AGENTS.md and CONTINUITY.md

**Files:**
- Create: `AGENTS.md`, `CONTINUITY.md`

**Step 1: Create AGENTS.md**
- Architecture overview
- Tech stack decisions and rationale
- Project structure map
- Key patterns and conventions
- Known issues and workarounds
- Deployment notes

**Step 2: Create CONTINUITY.md**
- Current goal and success criteria
- Constraints and assumptions
- Key decisions log
- Current state (done/now/next)
- Open questions
- Working set of files

**Step 3: Final commit and push**
```bash
git add .
git commit -m "docs: add AGENTS.md and CONTINUITY.md"
git push origin main
```

---

## Execution Notes

### Parallel Task Opportunities
- Tasks 5 & 7 can run in parallel (resources vs forum are independent)
- Tasks 9 & 10 can run in parallel (offline vs notifications are independent)
- Task 12 (auth) can be done early if preferred - it's placed last for MVP flow but could be done after Task 3

### Critical Path
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13 → 14

### Estimated Complexity per Task
| Task | Complexity | Time Est. |
|------|-----------|-----------|
| 1. Project Init | Medium | 30 min |
| 2. Design System | High | 60 min |
| 3. Layout & Nav | Medium | 45 min |
| 4. Supabase Schema | Medium | 30 min |
| 5. Resources | High | 90 min |
| 6. PDF Viewer | Very High | 120 min |
| 7. Forum Questions | High | 60 min |
| 8. Forum Answers | Medium | 45 min |
| 9. Offline Caching | High | 60 min |
| 10. Notifications | Medium | 45 min |
| 11. Dashboard | Medium | 30 min |
| 12. Auth | Medium | 45 min |
| 13. Polish | Medium | 45 min |
| 14. Docs | Low | 15 min |