import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import spacing from './spacing';

import './styles/globals.css';
import './styles/reset.css';

const noto = Noto_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alt Hacker News',
  description: 'A bettter Hacker News reader',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className} style={{ padding: spacing(3) }}>
        <h1>
          <em>alt</em> Hacker News
        </h1>
        {children}
      </body>
    </html>
  );
}
