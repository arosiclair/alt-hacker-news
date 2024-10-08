import type { Metadata } from 'next';
import localFont from 'next/font/local';
import spacing from './spacing';

import './styles/reset.css';
import './styles/color.css';
import './styles/typography.css';
import './styles/layout.css';
import BetterLink from './components/BetterLink';

const font = localFont({
  src: '../public/fonts/GeistVF.ttf',
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
    <div style={{ marginBottom: spacing(3) }}>
      <BetterLink href="/">
        <h2>
          <img
            src={'/icon.png'}
            width={32}
            height={32}
            alt="logo"
            style={{ verticalAlign: 'middle', marginRight: spacing(1) }}
          />
          <em>alt</em> Hacker News
        </h2>
      </BetterLink>
    </div>
  );
}
