import DebugJSON from '../DebugJSON';
import { fetchItem } from '../lib/API';
import spacing from '../spacing';
import CommentReplies from './CommentReplies';
import Paragraphs from './Paragraphs';

type CommentProps = {
  id: number;
};

export default async function Comment({ id }: CommentProps) {
  const item = await fetchItem(id);

  const author = item.by ?? '';
  const timestamp = item.time ?? '';

  return (
    <div id={String(id)} style={{ margin: spacing(3) }}>
      <DebugJSON>{item}</DebugJSON>
      <span>
        <b>{author}</b> • {timestamp}
      </span>
      <Paragraphs rawText={item.text ?? ''} />
      <CommentReplies replyIDs={item.kids ?? []} />
    </div>
  );
}
