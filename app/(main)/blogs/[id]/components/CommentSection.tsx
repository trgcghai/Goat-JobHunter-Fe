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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentSectionProps {
  totalComments: number;
  initialComments: NestedComment[];
  isLoading: boolean;
  isError: boolean;
  onComment: (comment: string) => void;
  onReply: (replyTo: number, comment: string) => void;
  onDelete: (commentId: number) => void;
}

export default function CommentSection({
  totalComments,
  initialComments,
  isLoading,
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
        <div className="flex gap-4">
          <Avatar className="h-12 w-12 flex-shrink-0 border-2">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt="Current User" />
            <AvatarFallback>{user?.fullName?.charAt(0) || user?.username?.charAt(0) || user?.contact.email.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Textarea
              placeholder="Viết bình luận của bạn..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-20 rounded-xl resize-none"
              rows={3}
            />
            <Button
              className="rounded-xl"
              onClick={handleComment}
              disabled={!comment.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {initialComments.map((comment) => (
          <CommentItem
            key={comment.commentId}
            comment={comment}
            onReply={onReply}
            onDelete={onDelete}
          />
        ))}
      </div>
    </Card>
  );
}