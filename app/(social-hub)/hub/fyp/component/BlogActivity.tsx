import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, MessageCircle, ThumbsUp } from "lucide-react";
import { Blog } from "@/types/model";
import { cn } from "@/lib/utils";

interface BlogActivityProps {
  blog: Blog;
  onLikeClick: () => void;
  onCommentClick: () => void;
  className?: string;
}

const BlogActivity = ({ blog, onCommentClick, onLikeClick, className }: BlogActivityProps) => {
  return (
    <div className={cn("flex items-center justify-between px-4 py-3", className)}>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center rounded-full gap-1"
          onClick={onLikeClick}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{blog.activity?.totalLikes || 0}</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center rounded-full gap-1"
          onClick={onCommentClick}
        >
          <MessageCircle className="h-4 w-4" />
          <span>{blog.activity?.totalComments || 0}</span>
        </Button>
      </div>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Eye className="h-4 w-4" />
        <span>{blog.activity?.totalReads || 0} lượt xem</span>
      </div>
    </div>
  );
};
export default BlogActivity;
