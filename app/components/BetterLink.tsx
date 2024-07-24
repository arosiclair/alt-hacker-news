import Link, { LinkProps } from 'next/link';
import { CSSProperties } from 'react';

type BetterLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function BetterLink({
  children,
  prefetch = false, // Vercel curiously enables prefetching of every link on a web page. Let's go ahead and turn that off
  ...rest
}: BetterLinkProps) {
  return (
    <Link prefetch={prefetch} {...rest}>
      {children}
    </Link>
  );
}
