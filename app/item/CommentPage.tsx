import DebugJSON from '../DebugJSON';
import { fetchItems } from '../lib/API';
import spacing from '../spacing';
import { HNItem } from '../types/hacker-news';
import Comment from './Comment';
import HNText from './HNText';
import Timestamp from './Timestamp';

type ItemPageProps = {
  item: HNItem;
};
export default async function CommentPage({ item }: ItemPageProps) {
  const numReplies = item.kids?.length ?? 0;
  const replyText = numReplies === 1 ? 'reply' : 'replies';
  const hasText = !!item.text;

  const replies = await fetchItems(item.kids ?? []);

  return (
    <div>
      <p>
        by <b>{item.by}</b> • <Timestamp>{item.time ?? 0}</Timestamp> •{' '}
        {numReplies} {replyText}
      </p>

      {hasText && (
        <div style={{ marginBottom: spacing(2) }}>
          <HNText>{item.text}</HNText>
        </div>
      )}

      <hr />
      <h3>Replies</h3>
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
