import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import './globals.css';
import StoreHydrator from '@/components/shared/StoreHydrator';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Navy Lodge by NEXCOM Hospitality Group — Premium Military Lodging',
  description:
    'Award-winning hospitality. High-quality accommodations at the best value worldwide for military members and their families.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="bg-navy-bg text-text antialiased">
        <StoreHydrator />
        {children}
      </body>
    </html>
  );
}
