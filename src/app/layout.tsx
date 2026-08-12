import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ITravelista PH — From Dreaming to Departing',
  description: 'Your all-in-one travel companion for trip planning, visa requirements, checklists, and budget tracking.',
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#008080',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#F8F9FA] text-[#1A1A1A] antialiased selection:bg-[#E0F2F1] selection:text-[#008080]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
