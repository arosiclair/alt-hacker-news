import DebugJSON from '../DebugJSON';
import { HNItem } from '../types/hacker-news';
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
  const replyIDs = item.kids ?? [];
  const numReplies = replyIDs.length;

  return (
    <div id={String(id)}>
      <DebugJSON>{item}</DebugJSON>
      <span>
        <b>{author}</b> • {timestamp}
      </span>
      <Paragraphs rawText={item.text ?? ''} />
      <div>➕ Show {numReplies} replies</div>
    </div>
  );
}
