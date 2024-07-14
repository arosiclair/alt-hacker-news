import { fetchItems } from '../lib/API';
import spacing from '../spacing';
import { HNItem } from '../types/hacker-news';
import Byline from './components/Byline';
import Comment from './components/Comment';
import HNText from './components/HNText';

type ItemPageProps = {
  item: HNItem;
};
export default async function CommentPage({ item }: ItemPageProps) {
  const hasText = !!item.text;

  const replies = await fetchItems(item.kids ?? []);

  return (
    <div>
      <Byline item={item} author timestamp replies />

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
