import { useState } from "react";
import { Message } from "@/app/(chat)/messages/utils/types";
import {
  conversations,
  messagesByConversation,
  sharedLinksByConversation,
  sharedMediaByConversation
} from "@/app/(chat)/messages/utils/mock-data";

export default function useConversations(conversationId?: string) {
  const [messageState, setMessageState] = useState<Record<string, Message[]>>(messagesByConversation);

  const activeConversation = conversationId
    ? conversations.find((c) => c.id === conversationId)
    : null;

  const messages = conversationId ? messageState[conversationId] || [] : [];
  const sharedMedia = conversationId ? sharedMediaByConversation[conversationId] || [] : [];
  const sharedLinks = conversationId ? sharedLinksByConversation[conversationId] || [] : [];

  const handleSendMessage = (text: string) => {
    if (!conversationId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      senderId: 'currentUserId',
      timestamp: new Date(),
    };

    setMessageState((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage],
    }));
  };

  return {
    conversations,
    activeConversation,
    messages,
    sharedMedia,
    sharedLinks,
    sendMessage: handleSendMessage,
  };
}