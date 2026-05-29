import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AppShell } from '@/components/providers/app-shell';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nebians.vercel.app';

export const metadata: Metadata = {
  title: {
    default: 'NEBians - Modern Learning Platform for NEB Students',
    template: '%s | NEBians',
  },
  description: 'Your modern learning platform for Nepali NEB students. Browse textbooks, notes, past papers, and practice sets. Discuss questions, share knowledge, and study offline.',
  applicationName: 'NEBians',
  manifest: '/manifest.json',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_NP',
    url: SITE_URL,
    siteName: 'NEBians',
    title: 'NEBians - Modern Learning Platform for NEB Students',
    description: 'Your modern learning platform for Nepali NEB students. Browse textbooks, notes, past papers, and practice sets. Discuss questions, share knowledge, and study offline.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEBians - Modern Learning Platform for NEB Students',
    description: 'Your modern learning platform for Nepali NEB students. Browse textbooks, notes, past papers, and practice sets.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFBFE' },
    { media: '(prefers-color-scheme: dark)', color: '#141218' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-dvh bg-background text-on-surface antialiased">
        <ThemeProvider>
          <AppShell>
            {children}
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}