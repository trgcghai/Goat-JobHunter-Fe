"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/utils/formatDate";
import { CornerDownRight, Send, X } from "lucide-react";
import { useState } from "react";
import { NestedComment } from "@/app/(main)/blogs/[id]/components/utils/formatComments";

interface CommentItemProps {
  comment: NestedComment;
  onReply: (commentId: number, replyContent: string) => void;
}

export default function CommentItem({ comment, onReply }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = () => {
    if (!replyContent.trim()) return;
    onReply(comment.commentId, replyContent);
    setReplyContent("");
    setIsReplying(false);
  };

  // Calculate margin based on level (max 3 levels)
  const marginClass = comment.level > 0 ? "ml-14" : "";
  const showReplyButton = comment.level < 2; // Only show reply for levels 0 and 1

  return (
    <div className={`space-y-4 ${marginClass}`}>
      <div className="flex gap-4">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage
            src={comment.commentedBy?.avatar || "/placeholder.svg"}
            alt={comment.commentedBy?.email || "User"}
          />
          <AvatarFallback>
            {comment.commentedBy?.email?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-foreground truncate">
                {comment.commentedBy?.email || "Anonymous"}
              </p>
              <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                {comment.createdAt ? formatDate(comment.createdAt)  : "-"}
              </p>
            </div>
            {comment.parent && (
              <p className="text-xs text-primary mb-2">
                Trả lời {comment.parent.comment}
              </p>
            )}
            <p className="text-foreground break-words">{comment.comment}</p>
          </div>

          {showReplyButton && (
            <div className="flex items-center gap-4 mt-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-primary"
                onClick={() => setIsReplying(!isReplying)}
              >
                <CornerDownRight className="h-3 w-3 mr-1" />
                Trả lời
              </Button>
            </div>
          )}

          {isReplying && (
            <div className="mt-4 ml-4">
              <div className="mb-4 flex items-center justify-between bg-primary/5 p-3 rounded-lg">
                <span className="text-sm text-muted-foreground">
                  Đang trả lời {comment.commentedBy?.email || "bình luận này"}
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
              <div className="flex gap-4">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src="/placeholder.svg" alt="Current User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Textarea
                    placeholder="Viết câu trả lời..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-20 rounded-xl"
                    autoFocus
                  />
                  <Button
                    className="rounded-xl"
                    onClick={handleReply}
                    disabled={!replyContent.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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
            />
          ))}
        </div>
      )}
    </div>
  );
}