import { useSendMessageToChatRoomMutation, useSendMessageToNewChatRoomMutation } from '@/services/chatRoom/chatRoomApi';
import { toast } from 'sonner';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';

const useChatRoomAndMessageActions = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [sendMessageToChatRoom, { isLoading: isSendingMessage }] = useSendMessageToChatRoomMutation();
  const [sendMessageToNewChatRoom, { isLoading: isSendingNewMessage }] = useSendMessageToNewChatRoomMutation();

  const handleSendMessage = async (chatRoomId: number, content?: string, files?: File[]) => {
    try {

      if (!isSignedIn || !user) {
        toast.error('Vui lòng đăng nhập để gửi tin nhắn.');
        return;
      }

      if (!chatRoomId) {
        toast.error('Không tìm thấy đoạn chat.');
        return;
      }

      if ((content && content.trim()) || (files && files.length)) {
        console.log('Send message: ', { chatRoomId, content, files });
        await sendMessageToChatRoom({ chatRoomId, content, files }).unwrap();
      }


    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Gửi tin nhắn thất bại.');
    }
  };

  const handleSendMessageToNewChat = async (recipientId: string | null, content?: string, files?: File[]) => {
    // Implement the logic to create a new chat room and send the first message
    console.log(`Send "${content}" and ${files} to user with id: ${recipientId}`);

    if (!isSignedIn || !user) {
      toast.error('Vui lòng đăng nhập để gửi tin nhắn.');
      return;
    }

    // Validate recipientId
    if (!recipientId || isNaN(Number(recipientId))) {
      console.log('Invalid recipient ID');
      return;
    }

    // Avoid sending empty messages
    if ((content && content.trim()) || (files && files.length)) {
      console.log('Send message: ', { recipientId, content, files });
      const response = await sendMessageToNewChatRoom({
        accountId: Number(recipientId),
        content,
        files,
      }).unwrap();

      const roomId = response?.data?.roomId;

      if (roomId) {
        router.replace(`/messages/${roomId}`);
      }
    }
  };

  return {
    // Handlers
    handleSendMessage,
    handleSendMessageToNewChat,

    // States
    isSendingMessage,
    isSendingNewMessage,
  };
};

export default useChatRoomAndMessageActions;