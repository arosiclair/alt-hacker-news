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
      <div
        style={{
          ...containerStyle,
          cursor: 'pointer',
        }}
        onClick={toggleCollapsed}
      >
        <CollapsedReplies numReplies={replyIDs.length} />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Indent onClick={toggleCollapsed} />
      <div>
        {replies.map((reply, index) => (
          <Comment
            key={reply.id}
            item={reply}
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
    <div>
      ➕ show {numReplies} {replyText}
    </div>
  );
}

type IndentProps = {
  onClick?: () => void;
};

function Indent({ onClick }: IndentProps) {
  return (
    <div style={{ display: 'flex', cursor: 'pointer' }} onClick={onClick}>
      <div style={{ width: spacing(2), borderRight: '1px black solid' }} />
      <div style={{ width: spacing(3) }} />
    </div>
  );
}
