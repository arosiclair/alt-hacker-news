import { HNItem } from '../types/hacker-news';
import Comment from './Comment';
import Paragraphs from './Paragraphs';

type StoryPageProps = {
  item: HNItem;
};

export default function StoryPage({ item }: StoryPageProps) {
  const numComments = item.descendants ?? 0;
  const commentText = numComments === 1 ? 'comment' : 'comments';

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
      {item.kids?.map((commentID) => (
        <Comment key={commentID} id={commentID} />
      ))}
    </div>
  );
}
