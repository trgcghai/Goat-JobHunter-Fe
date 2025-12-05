import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { User } from "@/types/model";
import CommentAvatar from "@/app/(main)/blogs/[id]/components/utils/CommentAvatar";

interface Props {
  user: User | null;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const CommentInput = ({
  user,
  value: comment,
  onChange: setComment,
  onSubmit: handleComment
}: Props) => {
  return (
    <div className="flex gap-4">
      <CommentAvatar
        src={user?.avatar || "/placeholder.svg"}
        alt={"Current User"}
        fallback={user?.fullName?.charAt(0) || user?.username?.charAt(0) || user?.contact.email.charAt(0)}
      />
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
  );
};
export default CommentInput;
