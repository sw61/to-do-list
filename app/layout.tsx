import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'To Do List',
  description: 'To-Do-List App',
};

import QueryProvider from '@/components/QueryProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
