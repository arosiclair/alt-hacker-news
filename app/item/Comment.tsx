'use client';

import spacing from '../spacing';
import { HNItem } from '../types/hacker-news';
import CommentReplies from './CommentReplies';
import HNText from './HNText';
import Timestamp from './Timestamp';

type CommentProps = {
  item: HNItem;
  isLast: boolean;
};

export default function Comment({ item, isLast }: CommentProps) {
  const author = item.by ?? '';
  const timestamp = item.time ?? 0;

  return (
    <div
      id={String(item.id)}
      style={{ marginBottom: spacing(!isLast ? 3 : 1) }}
    >
      <div>
        <b>{author}</b> • <Timestamp>{timestamp}</Timestamp>
      </div>
      <HNText>{item.text}</HNText>
      <CommentReplies replyIDs={item.kids ?? []} />
    </div>
  );
}
