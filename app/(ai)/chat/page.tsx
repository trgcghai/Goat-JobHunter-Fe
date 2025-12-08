"use client";

import { Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAIChat } from "@/hooks/useAIChat";
import { MessageTypeRole } from "@/types/enum";
import { useUser } from "@/hooks/useUser";
import { useConversationActions } from "@/hooks/useConversationActions";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function NewChatPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const { handleCreateConversation } = useConversationActions();
  const isCreatingConversation = useRef(false);

  const {
    inputMessage,
    setInputMessage,
    messagesEndRef,
    parseMarkdown,
    isLoading,
    handleChat,
    messages
  } = useAIChat();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // User chưa đăng nhập - chat trực tiếp không có conversation
    if (!isSignedIn) {
      await handleChat();
      return;
    }

    // User đã đăng nhập - tạo conversation và redirect
    if (isCreatingConversation.current) return;

    try {
      isCreatingConversation.current = true;

      const result = await handleCreateConversation();

      if (result?.data?.conversationId) {
        // Lưu tin nhắn hiện tại vào sessionStorage để gửi sau khi redirect
        sessionStorage.setItem('pendingMessage', inputMessage);
        router.push(`/chat/conversation/${result.data.conversationId}`);
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
    } finally {
      isCreatingConversation.current = false;
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <ScrollArea className="flex-1 overflow-y-auto px-6 py-0 pt-4">
        {messages.length === 0 ? (
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
                {!isSignedIn && (
                  <p className="text-xs text-muted-foreground pt-2">
                    💡 Đăng nhập để lưu lịch sử trò chuyện của bạn
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.messageId}
                className={cn(
                  "flex",
                  message.role === MessageTypeRole.User ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-xl px-4 py-2 prose prose-sm",
                    message.role === MessageTypeRole.User
                      ? "bg-primary text-white prose-invert"
                      : "bg-muted"
                  )}
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(message.content)
                  }}
                />
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-xl px-4 py-2 bg-muted flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    Đang suy nghĩ...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      <div className="py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-card rounded-2xl border border-border p-1 transition-all hover:shadow-xl focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 shadow-lg">
            <Input
              placeholder="Nhập câu hỏi của bạn..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading || isCreatingConversation.current}
              className="flex-1 bg-transparent border-none text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
            />
            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-xl shrink-0"
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim() || isCreatingConversation.current}
            >
              {isLoading || isCreatingConversation.current ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}