'use client';

import spacing from '../../spacing';
import { HNItem } from '../../types/hacker-news';
import Byline from './Byline';
import CommentReplies from './CommentReplies';
import HNText from './HNText';

type CommentProps = {
  item: HNItem;
  isLast: boolean;
  indent?: number;
};

export default function Comment({ item, isLast, indent = 0 }: CommentProps) {
  return (
    <div
      id={String(item.id)}
      className="comment"
      style={{ paddingBottom: spacing(!isLast ? 3 : 1), cursor: 'default' }}
      onClick={(event) => event.stopPropagation()}
    >
      <Byline item={item} author timestamp />
      <HNText>{item.text}</HNText>
      <CommentReplies
        itemID={item.id}
        replyIDs={item.kids ?? []}
        indent={indent + 1}
      />
    </div>
  );
}
