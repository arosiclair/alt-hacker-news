import DebugJSON from '../DebugJSON';
import spacing from '../spacing';
import { HNItem } from '../types/hacker-news';
import CommentReplies from './CommentReplies';
import Paragraphs from './Paragraphs';

type CommentProps = {
  id: number;
};

export default async function Comment({ id }: CommentProps) {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  );
  const item = (await response.json()) as HNItem;

  const author = item.by ?? '';
  const timestamp = item.time ?? '';

  return (
    <div id={String(id)} style={{ marginBottom: spacing(3) }}>
      <DebugJSON>{item}</DebugJSON>
      <span>
        <b>{author}</b> • {timestamp}
      </span>
      <Paragraphs rawText={item.text ?? ''} />
      <CommentReplies replyIDs={item.kids ?? []} />
    </div>
  );
}
