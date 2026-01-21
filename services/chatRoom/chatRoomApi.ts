import { api } from '@/services/api';
import {
  FetchChatRoomsRequest,
  FetchChatRoomsResponse,
  FetchMessagesInChatRoomRequest,
  FetchMessagesInChatRoomResponse,
} from '@/services/chatRoom/chatRoomType';
import { ChatRoom, MessageType } from '@/types/model';
import { IBackendRes } from '@/types/api';


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

    // Send message to a existed chat room
    sendMessageToChatRoom: builder.mutation<MessageType, { chatRoomId: number; content: string }>({
      query: ({ chatRoomId, content }) => ({
        url: `/chatrooms/${chatRoomId}/messages`,
        method: 'POST',
        data: { content },
      }),
      invalidatesTags: ['ChatRoom'],
    }),

    // Send message to a new chat room
    sendMessageToNewChatRoom: builder.mutation<IBackendRes<ChatRoom>, { accountId: number; content: string }>({
      query: ({ accountId, content }) => ({
        url: `/chatrooms/messages`,
        method: 'POST',
        data: { content, accountId },
      }),
      invalidatesTags: ['ChatRoom'],
    }),

    // Check if chat room exists between two users, type of chat room is DIRECT
    checkExistingChatRoom: builder.query<IBackendRes<ChatRoom | null>, number>({
      query: (accountId) => ({
        url: `/chatrooms/direct/exists`,
        method: 'GET',
        params: { accountId },
      }),
      providesTags: ['ChatRoom'],
    }),
  }),
});

export const {
  useFetchChatRoomsQuery,
  useFetchMessagesInChatRoomQuery,
  useSendMessageToChatRoomMutation,
  useSendMessageToNewChatRoomMutation,
  useLazyCheckExistingChatRoomQuery,
} = chatRoomApi;