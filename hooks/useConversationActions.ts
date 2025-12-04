import {
  useCreateConversationMutation,
  useUpdateConversationMutation,
  usePinConversationsMutation,
  useUnpinConversationsMutation,
  useDeleteConversationsMutation
} from "@/services/ai/conversationApi";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";

export function useConversationActions() {
  const { user, isSignedIn } = useUser();
  const [createConversation, { isLoading: isCreating }] = useCreateConversationMutation();
  const [updateConversation, { isLoading: isUpdating }] = useUpdateConversationMutation();
  const [pinConversations, { isLoading: isPinning }] = usePinConversationsMutation();
  const [unpinConversations, { isLoading: isUnpinning }] = useUnpinConversationsMutation();
  const [deleteConversations, { isLoading: isDeleting }] = useDeleteConversationsMutation();

  const handleCreateConversation = async () => {
    try {
      return await createConversation().unwrap();
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const handleUpdateConversation = async (conversationId: number, title: string) => {
    if (!user || !isSignedIn) {
      toast.error("Vui lòng đăng nhập để thực hiện hành động này.");
      return;
    }
    try {
      const result = await updateConversation({ conversationId, title }).unwrap();
      toast.success("Đã cập nhật cuộc trò chuyện");
      return result;
    } catch (error) {
      toast.error("Không thể cập nhật cuộc trò chuyện");
      console.error(error)
      return;
    }
  };

  const handleTogglePin = async (conversationId: number, isPinned: boolean) => {
    if (!user || !isSignedIn) {
      toast.error("Vui lòng đăng nhập để thực hiện hành động này.");
      return;
    }
    try {
      if (isPinned) {
        await unpinConversations({ conversationIds: [conversationId] }).unwrap();
        toast.success("Đã bỏ ghim cuộc trò chuyện");
      } else {
        await pinConversations({ conversationIds: [conversationId] }).unwrap();
        toast.success("Đã ghim cuộc trò chuyện");
      }
    } catch (error) {
      toast.error("Không thể thay đổi trạng thái ghim");
      console.error(error)
      return;
    }
  };

  const handleDeleteConversation = async (conversationId: number) => {
    if (!user || !isSignedIn) {
      toast.error("Vui lòng đăng nhập để thực hiện hành động này.");
      return;
    }
    try {
      await deleteConversations({ conversationIds: [conversationId] }).unwrap();
      toast.success("Đã xóa cuộc trò chuyện");
    } catch (error) {
      toast.error("Không thể xóa cuộc trò chuyện");
      console.error(error)
      return;
    }
  };

  return {
    isCreating,
    isUpdating,
    isPinning,
    isUnpinning,
    isDeleting,
    handleCreateConversation,
    handleUpdateConversation,
    handleTogglePin,
    handleDeleteConversation
  };
}