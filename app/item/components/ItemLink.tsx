import BetterLink from '@/app/components/BetterLink';
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
    <BetterLink className={className} style={style} href={`/item?id=${id}`}>
      {children}
    </BetterLink>
  );
}
