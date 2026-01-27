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
      providesTags: (result) =>
        result?.data?.result
          ? [
            ...result.data.result.map(({ roomId }) => ({
              type: 'ChatRoom' as const,
              id: roomId,
            })),
            { type: 'ChatRoom', id: 'LIST' },
          ]
          : [{ type: 'ChatRoom', id: 'LIST' }],
    }),

    fetchMessagesInChatRoom: builder.query<FetchMessagesInChatRoomResponse, FetchMessagesInChatRoomRequest>({
      query: ({ chatRoomId, page = 1, size = 50 }) => ({
        url: `/chatrooms/${chatRoomId}`,
        method: 'GET',
        params: { size, page },
      }),
      providesTags: (_, __, { chatRoomId }) => [
        { type: 'ChatRoom', id: `MESSAGES_${chatRoomId}` },
      ],
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
      invalidatesTags: (result, error, { chatRoomId }) => [
        { type: 'ChatRoom', id: `MESSAGES_${chatRoomId}` },
        { type: 'ChatRoom', id: 'LIST' }, // Update last message in list
      ],
    }),

    // Send message to a new chat room
    sendMessageToNewChatRoom: builder.mutation<IBackendRes<ChatRoom>, SendMessageToNewChatRoomRequest>({
      query: ({ accountId, content, files }) => {

        const formData = new FormData();

        // Add files nếu có
        if (files && files.length > 0) {
          files.forEach((file) => {
            formData.append('files', file);
          });
        }

        const requestData: { accountId: number, content?: string } = { accountId };
        if (content && content.trim()) {
          requestData.content = content;
        }

        // Add content nếu có (dưới dạng JSON part)
        const requestBlob = new Blob(
          [JSON.stringify(requestData)],
          { type: 'application/json' },
        );
        formData.append('request', requestBlob);

        return {
          url: `/chatrooms/messages`,
          method: 'POST',
          data: formData,
        };
      },
      invalidatesTags: [{ type: 'ChatRoom', id: 'LIST' }],
    }),

    // Check if chat room exists between two users, type of chat room is DIRECT
    checkExistingChatRoom: builder.query<IBackendRes<ChatRoom | null>, number>({
      query: (accountId) => ({
        url: `/chatrooms/direct/exists`,
        method: 'GET',
        params: { accountId },
      }),
      providesTags: (_, __, accountId) => [
        { type: 'ChatRoom', id: `EXISTS_${accountId}` },
      ],
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