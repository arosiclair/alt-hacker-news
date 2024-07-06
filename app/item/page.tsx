import { PageProps } from '../types/misc';

export default async function ItemPage({ searchParams }: PageProps) {
  const itemID = searchParams?.['id'] ?? '';
  if (!itemID) {
    return <h1>Not Found</h1>;
  }

  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${itemID}.json`,
  );
  const json = await response.json();

  return (
    <>
      <h1>Hello, ItemPage!</h1>
      <h2>ID: {itemID}</h2>
      <h2>JSON: {JSON.stringify(json)}</h2>
    </>
  );
}
