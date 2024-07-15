import Link from 'next/link';
import { CSSProperties, PropsWithChildren, ReactElement } from 'react';

type ItemLinkProps = {
  id: number;
  className?: string;
  style?: CSSProperties;
};

export default function ItemLink({
  id,
  children,
  className,
  style,
}: PropsWithChildren<ItemLinkProps>) {
  return (
    <Link className={className} style={style} href={`/item?id=${id}`}>
      {children}
    </Link>
  );
}
