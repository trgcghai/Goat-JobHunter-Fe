"use client";

import { Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAIChat } from "@/hooks/useAIChat";
import { useParams } from "next/navigation";
import { useGetConversationMessagesQuery } from "@/services/ai/conversationApi";
import { useEffect } from "react";

export default function ConversationPage() {
  const params = useParams();
  const conversationId = Number(params.id);

  const {
    inputMessage,
    setInputMessage,
    messagesEndRef,
    parseMarkdown,
    isLoading,
    handleChat,
    messages,
    setMessages
  } = useAIChat();

  const { data } = useGetConversationMessagesQuery(conversationId, {
    skip: !conversationId
  });

  useEffect(() => {
    if (data?.data?.result) {
      setMessages(data.data.result);
    }
  }, [data, setMessages]);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleChat();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <ScrollArea className="flex-1 overflow-y-auto px-6 py-0 pt-4">
        {messages.length === 0 ? (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-muted-foreground text-sm">
              Bắt đầu cuộc trò chuyện của bạn...
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.messageId}
                className={cn(
                  "flex",
                  message.role === "User" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-xl px-4 py-2 prose prose-sm",
                    message.role === "User"
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
              disabled={isLoading}
              className="flex-1 bg-transparent border-none text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
            />
            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-xl shrink-0"
              onClick={handleChat}
              disabled={isLoading || !inputMessage.trim()}
            >
              {isLoading ? (
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