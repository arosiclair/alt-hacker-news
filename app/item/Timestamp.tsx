import { formatDate, formatISO9075, formatRelative } from 'date-fns';

type TimestampProps = {
  /** A unix timestamp in the past */
  children: number;
};

export default function Timestamp({ children }: TimestampProps) {
  const date = new Date(children * 1000);
  return (
    <span title={formatISO9075(date)}>{formatRelative(date, new Date())}</span>
  );
}
