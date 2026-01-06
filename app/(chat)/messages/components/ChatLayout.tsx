'use client';

import { Sidebar } from '@/app/(chat)/messages/components/sidebar';
import type { Conversation, Message, SharedMedia, SharedLink } from '../utils/types';
import { ChatWindow } from './ChatWindow';

interface ChatLayoutProps {
  currentUserId: string;
  currentUserName: string;
  currentUserAvatar: string;
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: Message[];
  activeUser: Conversation['user'] | null;
  onConversationSelect: (id: string) => void;
  onSendMessage: (text: string) => void;
  sharedMedia: SharedMedia[];
  sharedLinks: SharedLink[];
  isDetailsOpen: boolean;
  onToggleDetails: () => void;
}

export function ChatLayout({
  currentUserId,
  currentUserName,
  currentUserAvatar,
  conversations,
  activeConversationId,
  messages,
  activeUser,
  onConversationSelect,
  onSendMessage,
  sharedMedia,
  sharedLinks,
  isDetailsOpen,
  onToggleDetails,
}: ChatLayoutProps) {
  return (
    <div className="h-screen flex">
      <div className="w-full md:w-[450px] shrink-0 border-r border-border">
        <Sidebar
          currentUser={{ id: currentUserId, name: currentUserName, avatar: currentUserAvatar, online: true }}
          conversations={conversations}
          activeConversationId={activeConversationId}
          onConversationSelect={onConversationSelect}
        />
      </div>

      <div className="flex-1 hidden md:flex min-w-0">
        {activeUser ? (
          <ChatWindow
            user={activeUser}
            messages={messages}
            currentUserId={currentUserId}
            onSendMessage={onSendMessage}
            sharedMedia={sharedMedia}
            sharedLinks={sharedLinks}
            isDetailsOpen={isDetailsOpen}
            onToggleDetails={onToggleDetails}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-background">
            <div className="text-center text-muted-foreground">
              <p className="text-lg">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
