import { HNItem } from '../types/hacker-news';

type StoryPageProps = {
  item: HNItem;
};

export default function StoryPage({ item }: StoryPageProps) {
  return (
    <div>
      <div>
        <h1>Hello, StoryPage!</h1>
        <h2>ID: {item.id}</h2>
        <h3>JSON:</h3>
        <pre>{JSON.stringify(item, null, 4)}</pre>
      </div>

      <h1>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </h1>
      <h2>
        by {item.by} • {item.time} • {item.descendants} comments
      </h2>
    </div>
  );
}
