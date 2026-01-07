'use client';

import { ChatWindow } from '@/app/(chat)/messages/components/ChatWindow';
import useConversations from "@/app/(chat)/messages/hooks/useConversations";
import { useParams } from 'next/navigation';

export default function ConversationPage() {
  const params = useParams();
  const conversationId = params?.id as string;

  const { activeConversation, messages, sharedMedia, sharedLinks, sendMessage } = useConversations(conversationId);

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">
          <p className="text-lg">Conversation not found</p>
        </div>
      </div>
    );
  }

  return (
    <ChatWindow
      user={activeConversation.user}
      messages={messages}
      onSendMessage={sendMessage}
      sharedMedia={sharedMedia}
      sharedLinks={sharedLinks}
    />
  );
}