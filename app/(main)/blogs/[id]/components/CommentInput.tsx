import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useAppSelector } from "@/lib/hooks";
import { toast } from "sonner";
import useCommentActions from "@/hooks/useCommentActions";

const CommentInput = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const { blog } = useAppSelector((state) => state.blogDetail);
  const { handleCommentBlog, isCommenting } = useCommentActions();

  const handleSendComment = async () => {
    if (!blog) {
      toast.error("Không tìm thấy bài viết để bình luận.");
      return;
    }

    if (!input.trim()) {
      toast.info("Vui lòng nhập nội dung bình luận.");
      return;
    }

    await handleCommentBlog(Number(blog.blogId), input);
    setInput("");
  };

  return (
    <div className="w-full flex items-start gap-2">
      <Textarea
        className="rounded-xl resize-none max-h-24 overflow-y-auto"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Bình luận với tên ${user?.fullName || user?.username}...`}
        rows={3}
        disabled={isCommenting}
      />
      <Button
        className="rounded-xl"
        size="icon"
        onClick={handleSendComment}
        disabled={isCommenting || !input.trim()}
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default CommentInput;