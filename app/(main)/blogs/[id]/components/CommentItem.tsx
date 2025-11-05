"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/utils/formatDate";
import { CornerDownRight, Send, X } from "lucide-react";
import { useState } from "react";

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string, replyContent: string) => void;
}

export default function CommentItem({ comment, onReply }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = () => {
    if (!replyContent.trim()) return;
    onReply(comment.id, replyContent);
    setReplyContent("");
    setIsReplying(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={comment.avatar} alt={comment.author} />
          <AvatarFallback>
            {comment.author.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-foreground">{comment.author}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(comment.createdAt)}
              </p>
            </div>
            <p className="text-foreground">{comment.content}</p>
          </div>
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

          {isReplying && (
            <div className="mt-4 ml-4">
              <div className="mb-4 flex items-center justify-between bg-primary/5 p-3 rounded-lg">
                <span className="text-sm text-muted-foreground">
                  Đang trả lời {comment.author}
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
                <Avatar className="h-8 w-8">
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
        <div className="ml-14 space-y-4">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={reply.avatar} alt={reply.author} />
                <AvatarFallback>
                  {reply.author.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-foreground text-sm">
                      {reply.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(reply.createdAt)}
                    </p>
                  </div>
                  <p className="text-foreground text-sm">{reply.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
