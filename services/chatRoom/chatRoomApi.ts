import { api } from '@/services/api';
import {
  FetchChatRoomsRequest,
  FetchChatRoomsResponse,
  FetchMessagesInChatRoomRequest,
  FetchMessagesInChatRoomResponse,
} from '@/services/chatRoom/chatRoomType';


export const chatRoomApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchChatRooms: builder.query<FetchChatRoomsResponse, FetchChatRoomsRequest>({
      query: ({ page = 1, size = 50 }) => ({
        url: '/chatrooms/me',
        method: 'GET',
        params: { page, size },
      }),
      providesTags: ['ChatRoom'],
    }),
    fetchMessagesInChatRoom: builder.query<FetchMessagesInChatRoomResponse, FetchMessagesInChatRoomRequest>({
      query: ({ chatRoomId, page = 1, size = 50 }) => ({
        url: `/chatrooms/${chatRoomId}`,
        method: 'GET',
        params: { size, page },
      }),
      providesTags: ['ChatRoom'],
    }),
  }),
});

export const { useFetchChatRoomsQuery, useFetchMessagesInChatRoomQuery } = chatRoomApi;