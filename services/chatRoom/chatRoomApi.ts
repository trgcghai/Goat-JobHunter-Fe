import { api } from "@/services/api";
import { FetchChatRoomsRequest, FetchChatRoomsResponse } from "@/services/chatRoom/chatRoomType";


export const chatRoomApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchChatRooms: builder.query<FetchChatRoomsResponse, FetchChatRoomsRequest>({
      query: () => ({
        url: "/chat-rooms/me",
        method: "GET"
      }),
      providesTags: ["ChatRoom"]
    })
  })
})

export const { useFetchChatRoomsQuery } = chatRoomApi;