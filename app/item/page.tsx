import { PageProps } from '../types/misc';

export default function ItemPage({ searchParams }: PageProps) {
  const itemID = searchParams?.['id'] ?? '';
  return (
    <>
      <h1>Hello, ItemPage!</h1>
      <h2>ID: {itemID}</h2>
    </>
  );
}
