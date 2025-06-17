'use client';

import { formatISO9075, formatRelative } from 'date-fns';
import { Suspense, useEffect, useState } from 'react';

type TimestampProps = {
  /** A unix timestamp (seconds) in the past */
  children: number;
};

/**
 * A few tricks to fix local vs. server timestamps from here:
 * https://francoisbest.com/posts/2023/displaying-local-times-in-nextjs
 */
export default function Timestamp({ children }: TimestampProps) {
  const date = new Date(children * 1000);
  const hydrated = useHydration();

  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <span title={formatISO9075(date)} suppressHydrationWarning>
        {formatRelative(date, new Date())}
      </span>
    </Suspense>
  );
}

function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
