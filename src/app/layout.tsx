import type { Metadata } from 'next';
import { Syne, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import StoreHydrator from '@/components/shared/StoreHydrator';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Navy Lodge - Premium Military Lodging',
  description: 'Premium, affordable, and secure lodging for military members and their families worldwide.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrains.variable}`}>
      <body className="bg-navy-bg text-text antialiased">
        <StoreHydrator />
        {children}
      </body>
    </html>
  );
}
