'use client';

import { ChatLayout } from '@/app/(chat)/messages/components/ChatLayout';
import {
  conversations as initialConversations,
  currentUser,
  messagesByConversation,
  sharedMediaByConversation,
  sharedLinksByConversation,
} from './utils/mock-data';
import type { Conversation, Message } from './utils/types';
import { useState } from 'react';

export default function HomePage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messageState, setMessageState] = useState<Record<string, Message[]>>(messagesByConversation);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);
  const messages = activeConversationId ? messageState[activeConversationId] || [] : [];
  const sharedMedia = activeConversationId ? sharedMediaByConversation[activeConversationId] || [] : [];
  const sharedLinks = activeConversationId ? sharedLinksByConversation[activeConversationId] || [] : [];

  const handleConversationSelect = (id: string) => {
    setActiveConversationId(id);
    setIsDetailsOpen(false);

    // Clear unread count when conversation is selected
    setConversations((prev) => prev.map((conv) => (conv.id === id ? { ...conv, unreadCount: 0 } : conv)));
  };

  const handleSendMessage = (text: string) => {
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date(),
    };

    // Add message to message state
    setMessageState((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), newMessage],
    }));

    // Update conversation list with new last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              lastMessage: text,
              timestamp: new Date(),
            }
          : conv,
      ),
    );
  };

  const handleToggleDetails = () => {
    setIsDetailsOpen((prev) => !prev);
  };

  return (
    <ChatLayout
      currentUserId={currentUser.id}
      currentUserName={currentUser.name}
      currentUserAvatar={currentUser.avatar}
      conversations={conversations}
      activeConversationId={activeConversationId}
      messages={messages}
      activeUser={activeConversation?.user || null}
      onConversationSelect={handleConversationSelect}
      onSendMessage={handleSendMessage}
      sharedMedia={sharedMedia}
      sharedLinks={sharedLinks}
      isDetailsOpen={isDetailsOpen}
      onToggleDetails={handleToggleDetails}
    />
  );
}
