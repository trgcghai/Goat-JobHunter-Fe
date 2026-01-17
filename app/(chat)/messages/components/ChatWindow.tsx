'use client';

import { MessageType, ChatRoom } from '@/types/model';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';
import { ChatDetailsPanel } from './ChatDetailsPanel';
import { useDetailsPanelState } from '../hooks/useDetailsPanelState';
import { ChatRoomType } from '@/types/enum';

interface ChatWindowProps {
  chatRoom: ChatRoom;
  messages: MessageType[];
  currentUserId?: string;
  onSendMessage: (text: string) => void;
}

export function ChatWindow({
  chatRoom,
  messages,
  currentUserId,
  onSendMessage,
}: Readonly<ChatWindowProps>) {
  const { isOpen: isDetailsOpen, toggle, close } = useDetailsPanelState();
  const isGroup = chatRoom.type === ChatRoomType.GROUP;

  return (
    <>
      <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
        <ChatHeader
          chatRoom={chatRoom}
          onToggleDetails={toggle}
          isDetailsOpen={isDetailsOpen}
        />
        <MessageList
          messages={messages}
          currentUserId={currentUserId}
          isGroup={isGroup}
        />
        <MessageInput onSendMessage={onSendMessage} />
      </div>

      {isDetailsOpen && (
        <ChatDetailsPanel
          chatRoom={chatRoom}
          isOpen={isDetailsOpen}
          onClose={close}
        />
      )}
    </>
  );
}