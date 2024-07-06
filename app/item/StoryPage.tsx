import { fetchItems } from '../lib/API';
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

  return (
    <div>
      <h1>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </h1>
      <h2>
        by {item.by} • {item.time} • {item.score} points • {numComments}{' '}
        {commentText}
      </h2>

      <Paragraphs rawText={item.text ?? ''} />

      <h3>Comments</h3>
      {comments.map((comment) => (
        <Comment key={comment.id} item={comment} />
      ))}
    </div>
  );
}
