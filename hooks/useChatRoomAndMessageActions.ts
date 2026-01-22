import { useSendMessageToChatRoomMutation } from '@/services/chatRoom/chatRoomApi';
import { toast } from 'sonner';
import { useUser } from '@/hooks/useUser';

const useChatRoomAndMessageActions = () => {
  const { user, isSignedIn } = useUser();
  const [sendMessageToChatRoom, { isLoading: isSendingMessage }] = useSendMessageToChatRoomMutation();

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
        console.log("Send message: ", { chatRoomId, content, files });
        await sendMessageToChatRoom({ chatRoomId, content, files }).unwrap();
      }


    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Gửi tin nhắn thất bại.');
    }
  };

  return {
    // Handlers
    handleSendMessage,

    // States
    isSendingMessage,
  };
};

export default useChatRoomAndMessageActions;