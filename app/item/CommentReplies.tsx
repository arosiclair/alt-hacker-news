'use client';

import { useState } from 'react';
import DebugJSON from '../DebugJSON';

type CommentRepliesProps = {
  replyIDs: number[];
};

export default function CommentReplies({ replyIDs }: CommentRepliesProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapsed = () => setIsCollapsed(!isCollapsed);

  if (isCollapsed) {
    return (
      <div onClick={toggleCollapsed}>➕ Show {replyIDs.length} replies</div>
    );
  }

  return (
    <div onClick={toggleCollapsed}>
      <DebugJSON>{replyIDs}</DebugJSON>
    </div>
  );
}
