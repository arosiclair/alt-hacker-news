'use client';

import { CSSProperties, useEffect, useState } from 'react';
import { HNItem } from '../types/hacker-news';
import { fetchItems } from '../lib/API';
import Comment from './Comment';
import spacing from '../spacing';

type CommentRepliesProps = {
  replyIDs: number[];
};

export default function CommentReplies({ replyIDs }: CommentRepliesProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [replies, setReplies] = useState<HNItem[]>([]);
  const toggleCollapsed = () => setIsCollapsed(!isCollapsed);
  const containerStyle: CSSProperties = {
    margin: spacing(1, 0),
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
        <CollapsedReplies numReplies={replyIDs.length} />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Indent />
      <div>
        {replies.map((reply, index) => (
          <Comment
            key={reply.id}
            item={reply}
            onHeaderClick={toggleCollapsed}
            isLast={index === replies.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

type CollapsedRepliesProps = {
  numReplies: number;
};

function CollapsedReplies({ numReplies }: CollapsedRepliesProps) {
  const replyText = numReplies === 1 ? 'reply' : 'replies';
  return (
    <span>
      ➕ Show {numReplies} {replyText}
    </span>
  );
}

function Indent() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: spacing(1), borderRight: '1px black solid' }} />
      <div style={{ width: spacing(2) }} />
    </div>
  );
}
