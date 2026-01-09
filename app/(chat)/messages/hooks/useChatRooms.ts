import { useFetchChatRoomsQuery } from "@/services/chatRoom/chatRoomApi";
import { ChatRoom } from "@/types/model";

export function useChatRooms() {
  const { data, isLoading, error, refetch } = useFetchChatRoomsQuery({
    page: 1,
    size: 50
  });

  const chatRooms: ChatRoom[] = data?.data?.result || [];
  const total = data?.data?.meta?.total || 0;

  return {
    chatRooms,
    total,
    isLoading,
    error,
    refetch
  };
}