"use client";

import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface BlogActionsProps {
  totalLikes?: number;
  totalComments?: number;
  isLiked?: boolean;
  onLike: () => void;
  onShare: () => void;
}

export default function BlogActions({
  totalLikes = 0,
  totalComments = 0,
  isLiked = false,
  onLike,
  onShare
}: BlogActionsProps) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl p-6 border">
      <Button
        variant={isLiked ? "default" : "outline"}
        size="sm"
        onClick={onLike}
        className="rounded-xl"
      >
        <Heart
          className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
        />
        <span className="ml-2">{totalLikes}</span>
      </Button>

      <Button variant="outline" size="sm" className="rounded-xl">
        <MessageCircle className="w-4 h-4" />
        <span className="ml-2">{totalComments}</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onShare}
        className="rounded-xl"
      >
        <Share2 className="w-4 h-4" />
        <span className="ml-2">Chia sẻ</span>
      </Button>
    </div>
  );
}