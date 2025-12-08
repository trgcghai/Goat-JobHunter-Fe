"use client";

import CommentItem from "@/app/(main)/blogs/[id]/components/CommentItem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";
import LoaderSpin from "@/components/common/LoaderSpin";
import ErrorMessage from "@/components/common/ErrorMessage";
import { NestedComment } from "@/app/(main)/blogs/[id]/components/utils/formatComments";
import { useUser } from "@/hooks/useUser";
import CommentInput from "@/app/(main)/blogs/[id]/components/CommentInput";

interface CommentSectionProps {
  totalComments: number;
  initialComments: NestedComment[];
  isLoading: boolean;
  isCommenting: boolean;
  isError: boolean;
  onComment: (comment: string) => void;
  onReply: (replyTo: number, comment: string) => void;
  onDelete: (commentId: number) => void;
}

export default function CommentSection({
  totalComments,
  initialComments,
  isLoading,
  isCommenting,
  isError,
  onComment,
  onReply,
  onDelete
}: CommentSectionProps) {
  const { user } = useUser();
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    await onComment(comment);
    setComment("");
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <LoaderSpin />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <ErrorMessage message="Không thể tải bình luận. Vui lòng thử lại sau." />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Bình luận ({totalComments})
      </h2>

      <div className="mb-8">
        <CommentInput
          user={user}
          value={comment}
          onChange={setComment}
          onSubmit={handleComment}
          isCommenting={isCommenting}
        />
      </div>

      <div className="space-y-6">
        {initialComments.map((comment) => (
          <CommentItem
            key={comment.commentId}
            comment={comment}
            onReply={onReply}
            onDelete={onDelete}
            isCommenting={isCommenting}
          />
        ))}
      </div>
    </Card>
  );
}