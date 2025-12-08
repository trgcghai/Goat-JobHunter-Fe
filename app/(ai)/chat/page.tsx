"use client";

import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConversationActions } from "@/hooks/useConversationActions";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";

export default function NewChatPage() {
  const { handleCreateConversation, isCreating } = useConversationActions();
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleStartConversation = async () => {
    if (!isSignedIn) {
      toast.error("Vui lòng đăng nhập để tạo cuộc trò chuyện");
      return;
    }

    try {
      const result = await handleCreateConversation();

      if (result?.data?.conversationId) {
        router.push(`/chat/conversation/${result.data.conversationId}`);
      }
    } catch (e) {
      console.error("Error creating conversation:", e);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-semibold text-primary bg-clip-text">
              Chào bạn!
            </h1>
            <p className="text-muted-foreground text-sm">
              Tôi là trợ lý AI thông minh của &#34;Goat Tìm Kiếm Việc Làm&#34;,
              rất vui được hỗ trợ bạn.
            </p>
          </div>
          <Button
            onClick={handleStartConversation}
            size="lg"
            className="gap-2 rounded-xl"
            disabled={isCreating}
          >
            <MessageSquarePlus className="w-5 h-5" />
            {isCreating ? "Đang tạo..." : "Bắt đầu trò chuyện"}
          </Button>
        </div>
      </div>
    </div>
  );
}