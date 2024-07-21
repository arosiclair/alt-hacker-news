import { getItemURL } from '../lib/misc';
import spacing from '../spacing';
import { HNItem } from '../types/hacker-news';
import Byline from './components/Byline';
import HNText from './components/HNText';
import PaginatedComments from './components/PaginatedComments';

type ItemPageProps = {
  item: HNItem;
  pageOffset: number;
};
export default async function CommentPage({ item, pageOffset }: ItemPageProps) {
  const hasText = !!item.text;
  const hasReplies = item.kids?.length ?? 0;

  return (
    <div>
      <Byline item={item} author timestamp replies />

      {hasText && (
        <div style={{ marginBottom: spacing(2) }}>
          <HNText>{item.text}</HNText>
        </div>
      )}

      {hasReplies && (
        <>
          <hr />
          <h3>Replies</h3>
          <PaginatedComments
            commentIDs={item.kids ?? []}
            pageOffset={pageOffset}
            baseURL={getItemURL(item.id)}
            areReplies
          />
        </>
      )}
    </div>
  );
}
