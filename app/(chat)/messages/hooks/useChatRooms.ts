import { useFetchChatRoomsQuery } from "@/services/chatRoom/chatRoomApi";
import { ChatRoom } from "@/types/model";

export function useChatRooms() {
  const { data, isLoading, isError, refetch } = useFetchChatRoomsQuery({});

  const chatRooms: ChatRoom[] = data?.data?.result || [];
  const total = data?.data?.meta?.total || 0;

  return {
    chatRooms,
    total,
    isLoading,
    isError,
    refetch
  };
}