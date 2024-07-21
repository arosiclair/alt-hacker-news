import spacing from '../spacing';
import { HNItem } from '../types/hacker-news';
import Byline from './components/Byline';
import HNText from './components/HNText';
import PaginatedComments from './components/PaginatedComments';
import { getItemURL } from '../lib/misc';

type StoryPageProps = {
  item: HNItem;
  pageOffset: number;
};

export default async function StoryPage({ item, pageOffset }: StoryPageProps) {
  const hasText = Boolean(item.text ?? '');

  return (
    <div>
      <h1>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </h1>

      <Byline item={item} score author timestamp comments />

      {hasText && (
        <div style={{ marginBottom: spacing(2) }}>
          <HNText>{item.text}</HNText>
        </div>
      )}

      <hr />
      <h3>Comments</h3>
      <PaginatedComments
        commentIDs={item.kids ?? []}
        pageOffset={pageOffset}
        baseURL={getItemURL(item.id)}
      />
    </div>
  );
}
