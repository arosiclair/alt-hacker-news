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
        className="collapsed-replies-container"
        style={{ cursor: 'pointer' }}
        onClick={toggleCollapsed}
      >
        <CollapsedReplies numReplies={replyIDs.length} />
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: spacing(1.5),
        marginLeft: spacing(1),
        paddingLeft: spacing(3),
        borderLeft: '1px black solid',
        cursor: 'pointer',
      }}
      onClick={toggleCollapsed}
    >
      {replies.map((reply, index) => (
        <Comment
          key={reply.id}
          item={reply}
          isLast={index === replies.length - 1}
        />
      ))}
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
