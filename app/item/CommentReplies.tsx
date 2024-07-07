'use client';

import { CSSProperties, useEffect, useState } from 'react';
import { HNItem } from '../types/hacker-news';
import { fetchItems } from '../lib/API';
import Comment from './Comment';
import spacing from '../spacing';
import CommentCollapsedReplies from './CommentCollapsedReplies';

type CommentRepliesProps = {
  replyIDs: number[];
};

export default function CommentReplies({ replyIDs }: CommentRepliesProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [replies, setReplies] = useState<HNItem[]>([]);
  const toggleCollapsed = () => setIsCollapsed(!isCollapsed);
  const containerStyle: CSSProperties = {
    margin: spacing(1, 0, 1, 1),
    display: 'flex',
  };

  useEffect(() => {
    if (!isCollapsed && !replies.length) {
      fetchItems(replyIDs).then(setReplies);
    }
  }, [isCollapsed, replies.length, replyIDs]);

  if (!replyIDs.length) {
    return null;
  }

  if (isCollapsed) {
    return (
      <div style={containerStyle} onClick={toggleCollapsed}>
        <CommentCollapsedReplies numReplies={replyIDs.length} />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div
        style={{ padding: spacing(0, 2), borderLeft: '1px black solid' }}
      ></div>
      <div>
        {replies.map((reply) => (
          <Comment
            key={reply.id}
            item={reply}
            onHeaderClick={toggleCollapsed}
          />
        ))}
      </div>
    </div>
  );
}
