"use client";

import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/utils/formatDate";
import { CornerDownRight, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { NestedComment } from "@/app/(main)/blogs/[id]/components/utils/formatComments";
import { useUser } from "@/hooks/useUser";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import CommentInput from "@/app/(main)/blogs/[id]/components/CommentInput";
import CommentAvatar from "@/app/(main)/blogs/[id]/components/utils/CommentAvatar";

interface CommentItemProps {
  comment: NestedComment;
  onReply: (replyTo: number, comment: string) => void;
  onDelete: (commentId: number) => void;
}

export default function CommentItem({ comment, onReply, onDelete }: CommentItemProps) {
  const { user } = useUser();
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Calculate margin based on level (max 3 levels: 0, 1, 2)
  const marginClass = useMemo(() => {
    if (comment.level === 0) return "";
    if (comment.level <= 2) return "ml-14";
    return ""; // Level 3+ has no margin
  }, [comment.level]);

  const author = useMemo(() => {
    return comment.commentedBy.fullName || comment.commentedBy.username || "Người dùng ẩn danh";
  }, [comment.commentedBy]);

  const replyTo = useMemo(() => {
    return comment.parent?.commentedBy.fullName || comment.parent?.commentedBy.username || "Người dùng ẩn danh";
  }, [comment.parent?.commentedBy]);

  const handleReply = async () => {
    await onReply(comment.commentId, replyContent);
    setIsReplying(false);
    setReplyContent("");
  };

  return (
    <>
      <div className={`space-y-4 ${marginClass}`}>
        <div className="flex gap-4">
          <CommentAvatar
            className={"h-12 w-12 flex-shrink-0 border-2"}
            src={comment.commentedBy.avatar || "/placeholder.svg"}
            alt={author}
            fallback={author.charAt(0).toUpperCase()}
          />
          <div className="flex-1 min-w-0">
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-foreground truncate">
                  {author}
                </p>
                <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {comment.createdAt ? formatDateTime(comment.createdAt) : "-"}
                </p>
              </div>
              {comment.parent && (
                <p className="text-xs text-primary mb-2">
                  <span className={"font-light"}>Trả lời </span>
                  <span className={"font-bold text-sm"}>{replyTo}</span>
                </p>
              )}
              <p className="text-foreground break-words">{comment.comment}</p>
            </div>

            <div className="flex items-center justify-between gap-4 mt-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-primary"
                onClick={() => setIsReplying(!isReplying)}
              >
                <CornerDownRight className="h-3 w-3 mr-1" />
                Trả lời
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`text-xs text-destructive hover:text-destructive ${user && user?.userId === comment.commentedBy.userId ? "block" : "hidden"}`}
                onClick={() => setIsDeleteOpen(true)}
              >
                <Trash2 className={"h-3 w-3"} />
              </Button>
            </div>

            {isReplying && (
              <div className="mt-4 ml-4">
                <div className="mb-4 flex items-center justify-between bg-primary/5 p-3 rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    Đang trả lời {author || "bình luận này"}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => {
                      setIsReplying(false);
                      setReplyContent("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CommentInput
                  user={user}
                  value={replyContent}
                  onChange={setReplyContent}
                  onSubmit={handleReply}
                />
              </div>
            )}
          </div>
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.commentId}
                comment={reply}
                onReply={onReply}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title={`Xóa comment này?`}
        description="Hành động này không thể hoàn tác."
        confirmText="Xóa"
        confirmBtnClass="bg-destructive text-white"
        onConfirm={() => onDelete(comment.commentId)}
      />
    </>
  );
}