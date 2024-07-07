type CommentCollapsedRepliesProps = {
  numReplies: number;
};

export default function CommentCollapsedReplies({
  numReplies,
}: CommentCollapsedRepliesProps) {
  const replyText = numReplies === 1 ? 'reply' : 'replies';
  return (
    <span>
      ➕ Show {numReplies} {replyText}
    </span>
  );
}
