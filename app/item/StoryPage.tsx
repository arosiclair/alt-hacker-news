import DebugJSON from '../DebugJSON';
import { HNItem } from '../types/hacker-news';

type StoryPageProps = {
  item: HNItem;
};

export default function StoryPage({ item }: StoryPageProps) {
  const numComments = item.descendants ?? 0;
  const commentText = numComments === 1 ? 'comment' : 'comments';

  const storyParagraphs = (item.text ?? '').split('<p>');

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
      {storyParagraphs.map((paragraphText, index) => (
        <p key={index}>{paragraphText}</p>
      ))}

      <h3>Comments</h3>
    </div>
  );
}
