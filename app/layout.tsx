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

export const metadata: Metadata = {
  title: 'NEBians',
  description: 'Modern learning platform for Nepali NEB students',
  applicationName: 'NEBians',
  manifest: '/manifest.json',
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