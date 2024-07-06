import DebugJSON from '../DebugJSON';
import { HNItem } from '../types/hacker-news';
import Paragraphs from './Paragraphs';

type StoryPageProps = {
  item: HNItem;
};

export default function StoryPage({ item }: StoryPageProps) {
  const numComments = item.descendants ?? 0;
  const commentText = numComments === 1 ? 'comment' : 'comments';

  return (
    <div>
      <div>
        <h1>Hello, StoryPage!</h1>
        <h2>ID: {item.id}</h2>
        <h3>JSON:</h3>
        <DebugJSON>{item}</DebugJSON>
      </div>

      <h1>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </h1>
      <h2>
        by {item.by} • {item.time} • {item.descendants} {commentText}
      </h2>

      <Paragraphs rawText={item.text ?? ''} />

      <h3>Comments</h3>
    </div>
  );
}
