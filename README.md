# NEBian

> for students, by students, to students

A modern minimalist learning platform for Nepali NEB students. Browse resources, annotate PDFs, discuss questions, and study offline.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + M3 design tokens
- **State:** Zustand v5
- **PDF:** React-PDF with custom annotation layer
- **Offline:** Service Worker + IndexedDB
- **Search:** Fuse.js (client-side fuzzy search)
- **Icons:** Lucide React
- **Font:** Poppins via next/font
- **Backend:** Django (outline/core)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Resource browsing with subject/grade/type filters
- Advanced PDF viewer with highlight, underline, and sticky note annotations
- Discussion forum with standalone question/answer pages
- Dark/light theme (M3 design system)
- Offline caching with IndexedDB
- PWA-ready (com.neb.ians)
- Heart icon for likes (no emojis, no gradients)

## Project Structure

```
app/              - Next.js App Router pages
components/       - UI primitives, layout, PDF, resource, forum
lib/              - Utilities, IndexedDB, search
stores/           - Zustand state management
types/            - TypeScript types and constants
public/           - Static assets, PWA manifest
```

## Design System

M3 (Material Design 3) inspired with:
- CSS custom properties for theming
- Tonal elevation (no shadows)
- Poppins font throughout
- Subject color coding (Physics=indigo, Chemistry=emerald, etc.)
- Heart icon for likes

## License

MIT