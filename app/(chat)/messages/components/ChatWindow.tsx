'use client';

import type { Message, User, SharedMedia, SharedLink } from '../utils/types';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';
import { ChatDetailsPanel } from './ChatDetailsPanel';
import { useState } from 'react';

interface ChatWindowProps {
  user: User;
  messages: Message[];
  onSendMessage: (text: string) => void;
  sharedMedia: SharedMedia[];
  sharedLinks: SharedLink[];
}

export function ChatWindow({ user, messages, onSendMessage, sharedMedia, sharedLinks }: ChatWindowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      <div className="flex-1 flex flex-col bg-background min-w-0">
        <ChatHeader user={user} onToggleDetails={() => setIsDetailsOpen(!isDetailsOpen)} isDetailsOpen={isDetailsOpen} />
        <MessageList messages={messages} />
        <MessageInput onSendMessage={onSendMessage} />
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isDetailsOpen ? 'w-[450px] opacity-100' : 'w-0 opacity-0 overflow-hidden'
        }`}
      >
        <ChatDetailsPanel
          user={user}
          sharedMedia={sharedMedia}
          sharedLinks={sharedLinks}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      </div>
    </>
  );
}