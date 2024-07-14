import { CSSProperties, ReactElement } from 'react';
import { HNItem } from '../types/hacker-news';
import Timestamp from './Timestamp';
import spacing from '../spacing';
import Link from 'next/link';

type BylineProps = {
  style?: CSSProperties;
  item: HNItem;
  score?: boolean;
  author?: boolean;
  timestamp?: boolean;
  comments?: boolean;
  replies?: boolean;
};

export default function Byline({
  style,
  item,
  score,
  author,
  timestamp,
  comments,
  replies,
}: BylineProps) {
  const isComment = item.type === 'comment';
  const numComments = item.descendants ?? 0;
  const commentText = numComments === 1 ? 'comment' : 'comments';

  const numReplies = item.kids?.length ?? 0;
  const replyText = numReplies === 1 ? 'reply' : 'replies';

  const fragments: ReactElement[] = [];

  if (score) {
    fragments.push(<span>{item.score} points</span>);
  }

  if (author) {
    fragments.push(
      <span>
        {!isComment ? 'by' : ''} <b>{item.by}</b>
      </span>,
    );
  }

  if (timestamp) {
    fragments.push(
      <Link href={`/item?id=${item.id}`} className="quiet">
        <Timestamp>{item.time ?? 0}</Timestamp>
      </Link>,
    );
  }

  if (comments) {
    fragments.push(
      <span>
        {numComments} {commentText}
      </span>,
    );
  }

  if (replies) {
    fragments.push(
      <span>
        {numReplies} {replyText}
      </span>,
    );
  }

  return (
    <div
      style={{
        marginBottom: spacing(0.75),
        ...style,
      }}
    >
      {fragments.map((fragment, index) => (
        <>
          {fragment}
          {index !== fragments.length - 1 ? ' • ' : null}
        </>
      ))}
    </div>
  );
}
