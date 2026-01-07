import { useState } from 'react';
import { Message } from '@/app/(chat)/messages/utils/types';
import {
  conversations,
  messagesByConversation,
  mockSharedMedia,
  mockSharedLinks,
  mockSharedFiles,
} from '@/app/(chat)/messages/utils/mock-data';

export default function useConversations(conversationId?: string) {
  const [messageState, setMessageState] = useState<Record<string, Message[]>>(messagesByConversation);

  const activeConversation = conversationId ? conversations.find((c) => c.id === conversationId) : null;

  const messages = conversationId ? messageState[conversationId] || [] : [];

  const handleSendMessage = (text: string) => {
    if (!conversationId || !activeConversation) return;

    const senderId = 'user-1';
    const senderName = 'You';

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      senderId,
      senderName: activeConversation.isGroup ? senderName : undefined,
      senderAvatar: activeConversation.isGroup ? '/diverse-user-avatars.png' : undefined,
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
    sharedMedia: mockSharedMedia,
    sharedLinks: mockSharedLinks,
    sharedFiles: mockSharedFiles,
    sendMessage: handleSendMessage,
  };
}