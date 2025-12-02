"use client";

import CommentItem from "@/app/(main)/blogs/[id]/components/CommentItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";
import LoaderSpin from "@/components/common/LoaderSpin";
import ErrorMessage from "@/components/common/ErrorMessage";
import { NestedComment } from "@/app/(main)/blogs/[id]/components/utils/formatComments";

interface CommentSectionProps {
  totalComments: number;
  initialComments: NestedComment[];
  isLoading: boolean;
  isError: boolean;
}

export default function CommentSection({
  totalComments,
  initialComments,
  isLoading,
  isError
}: CommentSectionProps) {
  const [comment, setComment] = useState("");

  const handleComment = () => {
    if (!comment.trim()) return;
    // TODO: Implement create comment API call
    console.log("New comment:", comment);
    setComment("");
  };

  const handleReply = (commentId: number, replyContent: string) => {
    // TODO: Implement reply comment API call
    console.log("Reply to comment", commentId, ":", replyContent);
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
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src="/placeholder.svg" alt="Current User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Textarea
              placeholder="Viết bình luận của bạn..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-20 rounded-xl"
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
            onReply={handleReply}
          />
        ))}
      </div>
    </Card>
  );
}