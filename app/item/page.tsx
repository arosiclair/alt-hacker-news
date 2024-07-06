import { fetchItem } from '../lib/API';
import { PageProps } from '../types/misc';
import StoryPage from './StoryPage';

export default async function ItemPage({ searchParams }: PageProps) {
  const idParam = searchParams?.['id'] ?? '';
  if (!idParam) {
    return <h1>Not Found</h1>;
  }

  const itemID = Array.isArray(idParam) ? idParam.join(',') : idParam;
  const item = await fetchItem(itemID);

  switch (item.type) {
    case 'story':
      return <StoryPage item={item} />;
    default:
      return <h1>Unsupported item type &apos;{item.type}&apos; 😢</h1>;
  }
}
