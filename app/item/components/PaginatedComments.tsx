import Comment from './Comment';
import { fetchItems } from '@/app/lib/API';
import spacing from '@/app/spacing';
import BetterLink from '@/app/components/BetterLink';

const PAGE_LIMIT = 50;

type PaginatedCommentsProps = {
  commentIDs: number[];
  pageOffset: number;
  baseURL: string;
  areReplies?: boolean;
};

export default async function PaginatedComments({
  commentIDs,
  pageOffset,
  baseURL,
  areReplies,
}: PaginatedCommentsProps) {
  const commentsStart = PAGE_LIMIT * pageOffset;
  const commentsEnd = commentsStart + PAGE_LIMIT;
  const pageCommentIDs = commentIDs.slice(commentsStart, commentsEnd);
  const pageComments = await fetchItems(pageCommentIDs);

  const totalComments = commentIDs.length ?? 0;
  const numMoreComments = Math.max(totalComments - commentsEnd, 0);
  const hasMoreComments = !!numMoreComments;
  const numNextPageComments = Math.min(numMoreComments, PAGE_LIMIT);
  const nextPageURL = `${baseURL}&p=${pageOffset + 2}`;

  let nextPageText = `View ${numNextPageComments} more `;
  if (numNextPageComments > 1) {
    nextPageText += areReplies ? 'replies' : 'comments';
  } else {
    nextPageText += areReplies ? 'reply' : 'comment';
  }

  return (
    <>
      <div>
        {pageComments.map((comment, index) => (
          <Comment
            key={comment.id}
            item={comment}
            isLast={index === pageComments.length - 1}
          />
        ))}
      </div>

      {hasMoreComments && (
        <h3 style={{ marginTop: spacing(2) }}>
          🔗 <BetterLink href={nextPageURL}>{nextPageText}</BetterLink>
        </h3>
      )}
    </>
  );
}
