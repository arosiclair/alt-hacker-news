import { HNItem } from '../types/hacker-news';
import { PageProps } from '../types/misc';
import StoryPage from './StoryPage';

export default async function ItemPage({ searchParams }: PageProps) {
  const itemID = searchParams?.['id'] ?? '';
  if (!itemID) {
    return <h1>Not Found</h1>;
  }

  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${itemID}.json`,
  );
  const item = (await response.json()) as HNItem;

  switch (item.type) {
    case 'story':
      return <StoryPage item={item} />;
    default:
      return <h1>Unsupported item type &apos;{item.type}&apos; 😢</h1>;
  }
}
