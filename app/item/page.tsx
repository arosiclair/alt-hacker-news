import { Metadata } from 'next';
import { fetchItem } from '../lib/API';
import { PageProps, PageSearchParams } from '../types/misc';
import CommentPage from './CommentPage';
import StoryPage from './StoryPage';
import { stripHTML } from '../lib/misc';

export default async function ItemPage({ searchParams }: PageProps) {
  const itemID = getItemID(searchParams);
  const item = await fetchItem(itemID);

  if (!item) {
    return <h1>Not Found</h1>;
  }

  const pageNum = getPageNumber(searchParams);
  const pageOffset = Math.max(pageNum - 1, 0);

  switch (item.type) {
    case 'story':
      return <StoryPage item={item} pageOffset={pageOffset} />;
    case 'comment':
      return <CommentPage item={item} pageOffset={pageOffset} />;
    default:
      return <h1>Unsupported item type &apos;{item.type}&apos; 😢</h1>;
  }
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const itemID = getItemID(searchParams);
  const item = await fetchItem(itemID);

  if (!item) {
    return {
      title: 'Not Found | alt Hacker News',
    };
  }

  if (item.type === 'comment') {
    if (!item.text) {
      return { title: 'alt Hacker News' };
    }

    const text =
      item.text.length > 100 ? item.text.substring(0, 100) + '...' : item.text;
    return {
      title: `${stripHTML(text, ' ')} | alt Hacker News`,
    };
  }

  return {
    title: `${item.title} | alt Hacker News`,
  };
}

function getItemID(searchParams?: PageSearchParams): string {
  const idParam = searchParams?.['id'] ?? '';
  if (!idParam) {
    return '';
  }

  return Array.isArray(idParam) ? idParam.join(',') : idParam;
}

function getPageNumber(searchParams?: PageSearchParams): number {
  let pageParam = searchParams?.['p'] ?? '';
  pageParam = Array.isArray(pageParam) ? pageParam.join(',') : pageParam;

  const pageNum = Number(pageParam);
  return Number.isNaN(pageNum) ? 0 : pageNum;
}
