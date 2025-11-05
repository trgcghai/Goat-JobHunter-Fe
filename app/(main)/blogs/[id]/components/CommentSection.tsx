"use client";

import CommentItem, {
  Comment,
} from "@/app/(main)/blogs/[id]/components/CommentItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";

interface CommentSectionProps {
  initialComments?: Comment[];
}

export default function CommentSection({
  initialComments = [],
}: CommentSectionProps) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleComment = () => {
    if (!comment.trim()) return;

    const newComment: Comment = {
      id: (comments.length + 1).toString(),
      author: "Current User",
      avatar: "/placeholder.svg",
      content: comment,
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
    setComment("");
  };

  const handleReply = (commentId: string, replyContent: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [
              ...(c.replies || []),
              {
                id: `${c.id}-${(c.replies?.length || 0) + 1}`,
                author: "Current User",
                avatar: "/placeholder.svg",
                content: replyContent,
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }
        return c;
      }),
    );
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Bình luận ({comments.length})
      </h2>

      <div className="mb-8">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
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
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
          />
        ))}
      </div>
    </Card>
  );
}
