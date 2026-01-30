import { useSendMessageToChatRoomMutation, useSendMessageToNewChatRoomMutation } from "@/services/chatRoom/chatRoomApi";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { usePendingMessages } from "@/contexts/PendingMessagesContext";

const useChatRoomAndMessageActions = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const { addPendingMessage, removePendingMessage } = usePendingMessages();
  const [sendMessageToChatRoom, { isLoading: isSendingMessage }] = useSendMessageToChatRoomMutation();
  const [sendMessageToNewChatRoom, { isLoading: isSendingNewMessage }] = useSendMessageToNewChatRoomMutation();

  const handleSendMessage = async (chatRoomId: number, content?: string, files?: File[]) => {
    let pendingId: string | null = null;

    try {
      if (!isSignedIn || !user) {
        toast.error("Vui lòng đăng nhập để gửi tin nhắn.");
        return;
      }

      if (!chatRoomId) {
        toast.error("Không tìm thấy đoạn chat.");
        return;
      }

      if ((content && content.trim()) || (files && files.length)) {
        pendingId = addPendingMessage(content, files);
        console.log("Send message: ", { chatRoomId, content, files });
        await sendMessageToChatRoom({ chatRoomId, content, files }).unwrap();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Gửi tin nhắn thất bại.");
    } finally {
      if (pendingId) {
        removePendingMessage(pendingId);
      }
    }
  };

  const handleSendMessageToNewChat = async (recipientId: string | null, content?: string, files?: File[]) => {
    let pendingId: string | null = null;

    try {
      if (!isSignedIn || !user) {
        toast.error("Vui lòng đăng nhập để gửi tin nhắn.");
        return;
      }

      if (!recipientId || isNaN(Number(recipientId))) {
        console.log("Invalid recipient ID");
        return;
      }

      if ((content && content.trim()) || (files && files.length)) {
        pendingId = addPendingMessage(content, files);
        console.log("Send message: ", { recipientId, content, files });
        const response = await sendMessageToNewChatRoom({
          accountId: Number(recipientId),
          content,
          files
        }).unwrap();

        const roomId = response?.data?.roomId;

        if (roomId) {
          router.replace(`/messages/${roomId}`);
        }
      }
    } catch (error) {
      console.error("Error sending message to new chat:", error);
      toast.error("Gửi tin nhắn thất bại.");
    } finally {
      if (pendingId) {
        removePendingMessage(pendingId);
      }
    }
  };

  return {
    handleSendMessage,
    handleSendMessageToNewChat,
    isSendingMessage,
    isSendingNewMessage
  };
};

export default useChatRoomAndMessageActions;