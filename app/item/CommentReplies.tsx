'use client';

import { useEffect, useState } from 'react';
import { HNItem } from '../types/hacker-news';
import { fetchItems } from '../lib/API';
import Comment from './Comment';

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
      <div onClick={toggleCollapsed}>➕ Show {replyIDs.length} replies</div>
    );
  }

  return (
    <div onClick={toggleCollapsed}>
      {replies.map((reply) => (
        <Comment key={reply.id} item={reply} />
      ))}
    </div>
  );
}
