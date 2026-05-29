import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AppShell } from '@/components/providers/app-shell';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

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
    <html lang="en" suppressHydrationWarning className={`${poppins.variable}`}>
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