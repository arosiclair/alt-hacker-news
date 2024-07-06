'use client';

import { useEffect, useState } from 'react';
import { HNItem } from '../types/hacker-news';
import { fetchItems } from '../lib/API';
import DebugJSON from '../DebugJSON';

type CommentRepliesProps = {
  replyIDs: number[];
};

export default function CommentReplies({ replyIDs }: CommentRepliesProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [items, setItems] = useState<HNItem[]>([]);
  const toggleCollapsed = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    if (!isCollapsed && !items.length) {
      fetchItems(replyIDs).then(setItems);
    }
  }, [isCollapsed, items.length, replyIDs]);

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
      <DebugJSON>{items}</DebugJSON>
    </div>
  );
}
