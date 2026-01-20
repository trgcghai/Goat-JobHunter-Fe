'use client';

import { ChatWindow } from '@/app/(chat)/messages/components/ChatWindow';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { useMemo } from 'react';
import { ChatRoom } from '@/types/model';
import { ChatRoomType } from '@/types/enum';
import { useFetchUserByIdQuery } from '@/services/user/userApi';
import { useSendMessageToNewChatRoomMutation } from '@/services/chatRoom/chatRoomApi';

export default function NewChatRoomPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const recipientId = searchParams.get('recipient');
  const { user } = useUser();

  const [sendMessageToNewChatRoom] = useSendMessageToNewChatRoomMutation();

  const { data } = useFetchUserByIdQuery(Number(recipientId), {
    skip: !recipientId || isNaN(Number(recipientId)),
  });

  const chatRoom: ChatRoom = useMemo(() => {
    return {
      roomId: 1000, // Temporary ID for client-side only
      avatar: data?.data?.avatar || '',
      lastMessagePreview: 'Chưa có tin nhắn',
      name: data?.data?.fullName || data?.data?.username || 'C',
      type: ChatRoomType.DIRECT,
      lastMessageTime: null,
      memberCount: 2,
    };
  }, [data?.data?.avatar, data?.data?.fullName, data?.data?.username]);

  const handleSendMessageToNewChat = async (text: string) => {
    // Implement the logic to create a new chat room and send the first message
    console.log(`Send "${text}" to user with id: ${recipientId}`);

    // Avoid sending empty messages
    if (!text.trim()) {
      return;
    }

    // Validate recipientId
    if (isNaN(Number(recipientId))) {
      console.log('Invalid recipient ID');
      return;
    }

    const response = await sendMessageToNewChatRoom({
      accountId: Number(recipientId),
      content: text,
    }).unwrap();

    const roomId = response?.data?.roomId;

    if (roomId) {
      router.replace(`/messages/${roomId}`);
    }
  };

  return (
    <ChatWindow
      chatRoom={chatRoom}
      messages={[]}
      currentUserId={user?.accountId?.toString()}
      onSendMessage={handleSendMessageToNewChat}
    />
  );
}