'use client';

import { useEffect, useState } from 'react';
import { HNItem } from '../../types/hacker-news';
import { fetchItems } from '../../lib/API';
import Comment from './Comment';
import spacing from '../../spacing';
import ItemLink from './ItemLink';

type CommentRepliesProps = {
  itemID: number;
  replyIDs: number[];
  indent: number;
};

export default function CommentReplies({
  itemID,
  replyIDs,
  indent,
}: CommentRepliesProps) {
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

  if (indent === 5) {
    return <RepliesLink numReplies={replyIDs.length} itemID={itemID} />;
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
      className="replies-container"
      style={{
        marginTop: spacing(1.5),
        marginLeft: spacing(1),
        paddingLeft: spacing(3),
        cursor: 'pointer',
      }}
      onClick={toggleCollapsed}
    >
      {replies.map((reply, index) => (
        <Comment
          key={reply.id}
          item={reply}
          isLast={index === replies.length - 1}
          indent={indent}
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

type RepliesLinkProps = {
  numReplies: number;
  itemID: number;
};

function RepliesLink({ numReplies, itemID }: RepliesLinkProps) {
  const replyText = numReplies === 1 ? 'reply' : 'replies';
  return (
    <div>
      🔗{' '}
      <ItemLink id={itemID} className="quiet">
        <span>
          view {numReplies} {replyText}
        </span>
      </ItemLink>
    </div>
  );
}
