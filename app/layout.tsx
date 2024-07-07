import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import spacing from './spacing';

import './styles/reset.css';
import './styles/color.css';
import './styles/typography.css';
import './styles/layout.css';

const noto = Noto_Sans({ subsets: ['latin'], display: 'swap' });

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
      <body className={noto.className}>
        <div id="page-container" style={{ padding: spacing(2, 3) }}>
          <h1>
            <em>alt</em> Hacker News
          </h1>
          {children}
        </div>
      </body>
    </html>
  );
}
