import type { Metadata } from 'next';
import localFont from 'next/font/local';
import spacing from './spacing';
import Link from 'next/link';

import './styles/reset.css';
import './styles/color.css';
import './styles/typography.css';
import './styles/layout.css';

const font = localFont({
  src: './fonts/GeistVF.ttf',
  fallback: ['Arial', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'alt Hacker News',
  description: 'A bettter Hacker News reader',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div id="page-container" style={{ padding: spacing(2, 3) }}>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

function Header() {
  return (
    <div style={{ display: 'flex', marginBottom: spacing(3) }}>
      <Link href="/">
        <h2>
          <em>alt</em> Hacker News
        </h2>
      </Link>
    </div>
  );
}
