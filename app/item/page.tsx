import { HNItem } from '../types/hacker-news';
import { PageProps } from '../types/misc';

export default async function ItemPage({ searchParams }: PageProps) {
  const itemID = searchParams?.['id'] ?? '';
  if (!itemID) {
    return <h1>Not Found</h1>;
  }

  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${itemID}.json`,
  );
  const item = (await response.json()) as HNItem;

  return (
    <>
      <h1>Hello, ItemPage!</h1>
      <h2>ID: {item.id}</h2>
      <h3>JSON:</h3>
      <pre>{JSON.stringify(item, null, 4)}</pre>
    </>
  );
}
