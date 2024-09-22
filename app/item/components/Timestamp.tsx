'use client';
// ^ needs to be client side in order to render dates in the user's timezone

import { formatISO9075, formatRelative } from 'date-fns';

type TimestampProps = {
  /** A unix timestamp (seconds) in the past */
  children: number;
};

export default function Timestamp({ children }: TimestampProps) {
  const date = new Date(children * 1000);
  return (
    <span title={formatISO9075(date)} suppressHydrationWarning>
      {formatRelative(date, new Date())}
    </span>
  );
}
