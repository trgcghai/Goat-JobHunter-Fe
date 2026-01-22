import { api } from '@/services/api';
import {
  FetchChatRoomsRequest,
  FetchChatRoomsResponse,
  FetchMessagesInChatRoomRequest,
  FetchMessagesInChatRoomResponse, SendMessageToChatRoomRequest, SendMessageToNewChatRoomRequest,
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
    sendMessageToChatRoom: builder.mutation<MessageType, SendMessageToChatRoomRequest>({
      query: ({ chatRoomId, content, files }) => {

        const formData = new FormData();

        // Add files nếu có
        if (files && files.length > 0) {
          files.forEach((file) => {
            formData.append('files', file);
          });
        }

        // Add content nếu có (dưới dạng JSON part)
        if (content && content.trim()) {
          const requestBlob = new Blob(
            [JSON.stringify({ content })],
            { type: 'application/json' },
          );
          formData.append('request', requestBlob);
        }

        return {
          url: `/chatrooms/${chatRoomId}/messages`,
          method: 'POST',
          data: formData,
        };
      },
      invalidatesTags: ['ChatRoom'],
    }),

    // Send message to a new chat room
    sendMessageToNewChatRoom: builder.mutation<IBackendRes<ChatRoom>, SendMessageToNewChatRoomRequest>({
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