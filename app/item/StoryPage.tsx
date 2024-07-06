import { HNItem } from '../types/hacker-news';

type StoryPageProps = {
  item: HNItem;
};

export default function StoryPage({ item }: StoryPageProps) {
  return (
    <>
      <h1>Hello, StoryPage!</h1>
      <h2>ID: {item.id}</h2>
      <h3>JSON:</h3>
      <pre>{JSON.stringify(item, null, 4)}</pre>
    </>
  );
}
