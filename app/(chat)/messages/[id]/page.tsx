'use client';

import { ChatWindow } from '@/app/(chat)/messages/components/ChatWindow';
import { useParams } from 'next/navigation';
import { useFetchChatRoomsQuery, useFetchMessagesInChatRoomQuery } from '@/services/chatRoom/chatRoomApi';
import { useEffect, useMemo } from 'react';
import { subscribeToChatRoom, unsubscribeFromChatRoom } from '@/services/chatRoom/message/messageApi';
import { useUser } from '@/hooks/useUser';

export default function ChatRoomPage() {
  const params = useParams();
  const chatRoomId = params?.id as string;
  const { user } = useUser();

  // Subscribe vào chat room khi component mount
  useEffect(() => {
    if (chatRoomId && !isNaN(Number(chatRoomId))) {
      subscribeToChatRoom(Number(chatRoomId));

      return () => {
        unsubscribeFromChatRoom(Number(chatRoomId));
      };
    }
  }, [chatRoomId]);

  const { data: messagesData, isLoading } = useFetchMessagesInChatRoomQuery({
    chatRoomId: Number(chatRoomId),
    size: 50,
    page: 1,
  }, { skip: !chatRoomId || isNaN(Number(chatRoomId)) });

  const { data: chatRoomsData } = useFetchChatRoomsQuery({});

  const currentChatRoom = useMemo(() => {
    return chatRoomsData?.data?.result?.find(
      (room) => room.chatRoomId === Number(chatRoomId)
    );
  }, [chatRoomsData, chatRoomId]);

  const messages = useMemo(() => {
    return messagesData?.data || [];
  }, [messagesData]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  if (!currentChatRoom) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <p className="text-lg text-muted-foreground">Không tìm thấy đoạn chat</p>
      </div>
    );
  }

  return (
    <ChatWindow
      chatRoom={currentChatRoom}
      messages={messages}
      currentUserId={user?.accountId?.toString()}
      onSendMessage={(text) => {
        // TODO: Implement send message via WebSocket
        console.log('Send message:', text);
      }}
    />
  );
}