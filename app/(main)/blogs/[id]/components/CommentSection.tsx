import LoaderSpin from "@/components/common/LoaderSpin";
import ErrorMessage from "@/components/common/ErrorMessage";
import { NestedComment } from "@/app/(main)/blogs/[id]/components/utils/formatComments";
import { CommentItem } from "@/app/(main)/blogs/[id]/components/index";

interface CommentSectionProps {
  comments: NestedComment[];
  isLoading: boolean;
  isError: boolean;
  isCommenting: boolean;
  onReply: (replyTo: number, comment: string) => void;
  onDelete: (commentId: number) => void;
}

export default function CommentSection({
  comments,
  isLoading,
  isError,
  isCommenting,
  onReply,
  onDelete
}: CommentSectionProps) {
  if (isLoading) {
    return (
      <div className="py-4">
        <LoaderSpin />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-4">
        <ErrorMessage message="Không thể tải bình luận." />
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Chưa có bình luận nào
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.commentId}
          comment={comment}
          onReply={onReply}
          onDelete={onDelete}
          isCommenting={isCommenting}
        />
      ))}
    </div>
  );
}