import { fetchItems } from '../lib/API';
import spacing from '../spacing';
import { HNItem } from '../types/hacker-news';
import Comment from './Comment';
import Paragraphs from './Paragraphs';

type StoryPageProps = {
  item: HNItem;
};

export default async function StoryPage({ item }: StoryPageProps) {
  const numComments = item.descendants ?? 0;
  const commentText = numComments === 1 ? 'comment' : 'comments';
  const comments = await fetchItems(item.kids ?? []);
  const hasText = Boolean(item.text ?? '');

  return (
    <div>
      <h2>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </h2>
      <p>
        {item.score} points • by <b>{item.by}</b> • {item.time} • {numComments}{' '}
        {commentText}
      </p>

      {hasText && (
        <div
          style={{
            border: '1px solid black',
            padding: spacing(2),
            borderRadius: spacing(0.5),
            marginBottom: spacing(2),
          }}
        >
          <Paragraphs rawText={item.text ?? ''} noLastMargin />
        </div>
      )}

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
