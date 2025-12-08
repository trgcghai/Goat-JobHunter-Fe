"use client";

import { useAIChat } from "@/hooks/useAIChat";
import { useParams } from "next/navigation";
import { useGetConversationMessagesQuery } from "@/services/ai/conversationApi";
import { useEffect } from "react";
import ErrorMessage from "@/components/common/ErrorMessage";
import { ChatContainer } from "@/app/(ai)/components/ChatContainer";

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

  const { data, isError } = useGetConversationMessagesQuery(conversationId, {
    skip: !conversationId
  });

  useEffect(() => {
    const pendingMessage = sessionStorage.getItem('pendingMessage');
    if (pendingMessage && conversationId) {
      sessionStorage.removeItem('pendingMessage');
      setInputMessage(pendingMessage);
    }
  }, [conversationId, setInputMessage]);

  useEffect(() => {
    if (data?.data?.result) {
      setMessages(data.data.result);
    }
  }, [data, setMessages]);

  useEffect(() => {
    if (inputMessage && messages.length === 0 && conversationId && !isLoading) {
      const timer = setTimeout(() => {
        handleChat(conversationId);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [inputMessage, messages.length, conversationId, isLoading, handleChat]);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleChat(conversationId);
    }
  };

  if (isError) {
    return (
      <div className="p-4">
        <ErrorMessage
          message="Không thể tải tin nhắn cuộc trò chuyện."
          variant="card"
        />
      </div>
    );
  }

  return (
    <ChatContainer
      messages={messages}
      inputMessage={inputMessage}
      isLoading={isLoading}
      parseMarkdown={parseMarkdown}
      messagesEndRef={messagesEndRef}
      onInputChange={setInputMessage}
      onSendMessage={() => handleChat(conversationId)}
      onKeyDown={handleKeyDown}
    />
  );
}