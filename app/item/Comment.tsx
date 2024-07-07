'use client';

import spacing from '../spacing';
import { HNItem } from '../types/hacker-news';
import CommentReplies from './CommentReplies';
import HNText from './HNText';
import Timestamp from './Timestamp';

type CommentProps = {
  item: HNItem;
  isLast: boolean;
  onHeaderClick?: () => void;
};

export default function Comment({ item, isLast, onHeaderClick }: CommentProps) {
  const author = item.by ?? '';
  const timestamp = item.time ?? 0;

  return (
    <div
      id={String(item.id)}
      style={{ marginBottom: spacing(!isLast ? 3 : 1) }}
    >
      <span onClick={onHeaderClick}>
        <b>{author}</b> • <Timestamp>{timestamp}</Timestamp>
      </span>
      <HNText text={item.text ?? ''} />
      <CommentReplies replyIDs={item.kids ?? []} />
    </div>
  );
}
