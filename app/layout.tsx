import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import spacing from './spacing';

import './styles/reset.css';
import './styles/color.css';
import './styles/typography.css';
import './styles/layout.css';
import Link from 'next/link';

const font = Noto_Sans({ subsets: ['latin'], display: 'swap' });

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
