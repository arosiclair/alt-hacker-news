import { fetchItems } from '../lib/API';
import spacing from '../spacing';
import { HNItem } from '../types/hacker-news';
import Byline from './Byline';
import Comment from './Comment';
import HNText from './HNText';

type StoryPageProps = {
  item: HNItem;
};

export default async function StoryPage({ item }: StoryPageProps) {
  const comments = await fetchItems(item.kids ?? []);
  const hasText = Boolean(item.text ?? '');

  return (
    <div>
      <h1>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </h1>

      <Byline item={item} score author timestamp comments />

      {hasText && (
        <div style={{ marginBottom: spacing(2) }}>
          <HNText>{item.text}</HNText>
        </div>
      )}

      <hr />
      <h3>Comments</h3>
      <div>
        {comments.map((comment, index) => (
          <Comment
            key={comment.id}
            item={comment}
            isLast={index === comments.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
