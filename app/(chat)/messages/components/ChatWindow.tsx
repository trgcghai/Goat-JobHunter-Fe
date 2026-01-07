'use client';

import type { Message, User, Group, SharedMedia, SharedLink, SharedFile } from '../utils/types';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';
import { ChatDetailsPanel } from './ChatDetailsPanel';
import { GroupDetailsPanel } from './GroupDetailsPanel';
import { useDetailsPanelState } from '../hooks/useDetailsPanelState';

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
  const { isOpen: isDetailsOpen, toggle, close } = useDetailsPanelState();

  return (
    <>
      <div className="flex-1 flex flex-col bg-background min-w-0 min-h-0">
        <ChatHeader
          user={user}
          group={group}
          isGroup={isGroup}
          onToggleDetails={toggle}
          isDetailsOpen={isDetailsOpen}
        />
        <MessageList messages={messages} currentUserId={currentUserId} isGroup={isGroup} />
        <MessageInput onSendMessage={onSendMessage} />
      </div>

      {isDetailsOpen && (
        <div className="shrink-0 h-full min-h-0">
          {isGroup && group ? (
            <GroupDetailsPanel
              group={group}
              sharedMedia={sharedMedia}
              sharedLinks={sharedLinks}
              sharedFiles={sharedFiles}
              isOpen={isDetailsOpen}
              onClose={close}
              currentUserId={currentUserId}
            />
          ) : (
            user && (
              <ChatDetailsPanel
                user={user}
                sharedMedia={sharedMedia}
                sharedLinks={sharedLinks}
                isOpen={isDetailsOpen}
                onClose={close}
              />
            )
          )}
        </div>
      )}
    </>
  );
}