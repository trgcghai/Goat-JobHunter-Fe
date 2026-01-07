'use client';

import type { Message, User, Group, SharedMedia, SharedLink, SharedFile } from '../utils/types';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';
import { ChatDetailsPanel } from './ChatDetailsPanel';
import { GroupDetailsPanel } from './GroupDetailsPanel';
import { useState } from 'react';

interface ChatWindowProps {
  user?: User;
  group?: Group;
  isGroup?: boolean;
  messages: Message[];
  onSendMessage: (text: string) => void;
  sharedMedia: SharedMedia[];
  sharedLinks: SharedLink[];
  sharedFiles?: SharedFile[];
  currentUserId?: string;
}

export function ChatWindow({
  user,
  group,
  isGroup = false,
  messages,
  onSendMessage,
  sharedMedia,
  sharedLinks,
  sharedFiles = [],
  currentUserId = 'me',
}: ChatWindowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      <div className="flex-1 flex flex-col bg-background min-w-0">
        <ChatHeader
          user={user}
          group={group}
          isGroup={isGroup}
          onToggleDetails={() => setIsDetailsOpen(!isDetailsOpen)}
          isDetailsOpen={isDetailsOpen}
        />
        <MessageList messages={messages} currentUserId={currentUserId} isGroup={isGroup} />
        <MessageInput onSendMessage={onSendMessage} />
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isDetailsOpen ? 'w-[450px] opacity-100' : 'w-0 opacity-0 overflow-hidden'
        }`}
      >
        {isGroup && group ? (
          <GroupDetailsPanel
            group={group}
            sharedMedia={sharedMedia}
            sharedLinks={sharedLinks}
            sharedFiles={sharedFiles}
            isOpen={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
            currentUserId={currentUserId}
          />
        ) : (
          user && (
            <ChatDetailsPanel
              user={user}
              sharedMedia={sharedMedia}
              sharedLinks={sharedLinks}
              isOpen={isDetailsOpen}
              onClose={() => setIsDetailsOpen(false)}
            />
          )
        )}
      </div>
    </>
  );
}