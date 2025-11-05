"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

interface BlogActionsProps {
  initialLikes?: number;
  totalComments?: number;
  onShare?: () => void;
}

export default function BlogActions({
  initialLikes = 0,
  totalComments = 0,
  onShare,
}: BlogActionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    // TODO: Call API to like/unlike blog
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    }
    // TODO: Implement share functionality
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant={isLiked ? "default" : "outline"}
            className="rounded-xl"
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            {likeCount} Thích
          </Button>
          <Button variant="outline" className="rounded-xl">
            <MessageCircle className="h-4 w-4" />
            {totalComments} Bình luận
          </Button>
        </div>
        <Button variant="outline" className="rounded-xl" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
          Chia sẻ
        </Button>
      </div>
    </Card>
  );
}
