'use client';

import spacing from '../spacing';
import { HNItem } from '../types/hacker-news';
import CommentReplies from './CommentReplies';
import Paragraphs from './Paragraphs';

type CommentProps = {
  item: HNItem;
  onHeaderClick?: () => void;
};

export default function Comment({ item, onHeaderClick }: CommentProps) {
  const author = item.by ?? '';
  const timestamp = item.time ?? '';

  return (
    <div id={String(item.id)} style={{ margin: spacing(3) }}>
      <span onClick={onHeaderClick}>
        <b>{author}</b> • {timestamp}
      </span>
      <Paragraphs rawText={item.text ?? ''} />
      <CommentReplies replyIDs={item.kids ?? []} />
    </div>
  );
}
