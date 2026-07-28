import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

/* Self-hosted via next/font — removes the render-blocking Google Fonts
   request and the third-party connection entirely. */
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const DESCRIPTION =
  'Property care memberships for holiday homes and coastal residences across the Mornington Peninsula. Scheduled attendance, considered oversight, and a written report after every visit.';

export const metadata: Metadata = {
  metadataBase: new URL('https://coastal-pro.vercel.app'),
  title: {
    default: 'Coastal Pro Property Care — Mornington Peninsula',
    template: '%s · Coastal Pro Property Care',
  },
  description: DESCRIPTION,
  keywords: [
    'property care Mornington Peninsula',
    'holiday home management Portsea',
    'property maintenance Sorrento',
    'house watching Blairgowrie',
    'carpentry Mornington Peninsula',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Coastal Pro Property Care',
    title: 'Your property. Professionally cared for.',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your property. Professionally cared for.',
    description: DESCRIPTION,
  },
  icons: { icon: '/icon.png', apple: '/icon.png' },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-navy focus:text-paper focus:px-5 focus:py-3 focus:text-[14px]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
