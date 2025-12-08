"use client";

import { useAIChat } from "@/hooks/useAIChat";
import { useUser } from "@/hooks/useUser";
import { useConversationActions } from "@/hooks/useConversationActions";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { ChatContainer } from "@/app/(ai)/components/ChatContainer";

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

    if (!isSignedIn) {
      await handleChat();
      return;
    }

    if (isCreatingConversation.current) return;

    try {
      isCreatingConversation.current = true;

      const result = await handleCreateConversation();

      if (result?.data?.conversationId) {
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

  const welcomeMessage = (
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
  );

  return (
    <ChatContainer
      messages={messages}
      inputMessage={inputMessage}
      isLoading={isLoading}
      isCreatingConversation={isCreatingConversation.current}
      parseMarkdown={parseMarkdown}
      messagesEndRef={messagesEndRef}
      onInputChange={setInputMessage}
      onSendMessage={handleSendMessage}
      onKeyDown={handleKeyDown}
      welcomeMessage={welcomeMessage}
    />
  );
}