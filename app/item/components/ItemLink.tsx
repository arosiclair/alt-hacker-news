import Link from 'next/link';
import { CSSProperties, ReactElement } from 'react';

type ItemLinkProps = {
  id: number;
  children: ReactElement;
  className?: string;
  style?: CSSProperties;
};

export default function ItemLink({
  id,
  children,
  className,
  style,
}: ItemLinkProps) {
  return (
    <Link className={className} style={style} href={`/item?id=${id}`}>
      {children}
    </Link>
  );
}
