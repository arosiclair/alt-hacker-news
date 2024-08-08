import BetterLink from '@/app/components/BetterLink';
import { CSSProperties, PropsWithChildren } from 'react';

type ItemLinkProps = {
  id: number;
  className?: string;
  style?: CSSProperties;
  toHN?: boolean;
};

export default function ItemLink({
  id,
  children,
  className,
  style,
  toHN,
}: PropsWithChildren<ItemLinkProps>) {
  const baseURL = toHN ? 'https://news.ycombinator.com' : '';
  return (
    <BetterLink
      className={className}
      style={style}
      href={`${baseURL}/item?id=${id}`}
    >
      {children}
    </BetterLink>
  );
}
