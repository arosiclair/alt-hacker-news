'use client';

import {
  MouseEventHandler,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { HNItem } from '../../types/hacker-news';
import Comment from './Comment';
import spacing from '../../spacing';
import ItemLink from './ItemLink';
import { proxyItems } from '@/app/lib/proxy';

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
  const repliesContainerRef: MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  const scrollToRoot: MouseEventHandler<HTMLDivElement> = (event) => {
    const rootComment = document.getElementById(String(itemID));
    rootComment?.scrollIntoView({ behavior: 'smooth' });

    // Temporarily add the active class to make the gutter blink on press
    repliesContainerRef.current?.classList.add('active');
    setTimeout(() => {
      repliesContainerRef.current?.classList.remove('active');
    }, 750);

    event.stopPropagation();
  };

  useEffect(() => {
    if (!isCollapsed && !replies.length) {
      proxyItems(replyIDs).then(setReplies);
    }
  }, [isCollapsed, replies.length, replyIDs]);

  if (!replyIDs.length) {
    return null;
  }

  if (indent === 5) {
    return <RepliesLink numReplies={replyIDs.length} itemID={itemID} />;
  }

  return (
    <div>
      <RepliesHeader
        numReplies={replyIDs.length}
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapsed}
      />
      <div
        className="replies-container"
        style={{
          display: isCollapsed ? 'none' : 'block',
          marginTop: spacing(1),
          marginLeft: spacing(1),
          paddingLeft: spacing(3),
          cursor: 'pointer',
        }}
        onClick={scrollToRoot}
        ref={repliesContainerRef}
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
    </div>
  );
}

type RepliesHeaderProps = {
  numReplies: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

function RepliesHeader({
  numReplies,
  isCollapsed,
  onToggleCollapse,
}: RepliesHeaderProps) {
  const showHideEmoji = isCollapsed ? '➕' : '➖';
  const showHideText = isCollapsed ? 'show' : 'hide';
  const replyText = numReplies === 1 ? 'reply' : 'replies';
  return (
    <div>
      <span onClick={onToggleCollapse} style={{ cursor: 'pointer' }}>
        {showHideEmoji} {showHideText} {numReplies} {replyText}
      </span>
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
