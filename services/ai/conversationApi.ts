import { api } from "@/services/api";
import {
  ConversationIdsRequest,
  ConversationPinnedResponse,
  ConversationResponse,
  ConversationUpdateRequest,
  GetConversationsParams,
  GetConversationsResponse, GetMessageOfConversationResponse
} from "@/services/ai/conversationType";

export const conversationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    aiChat: builder.mutation<string, { message: string, conversationId?: number }>({
      query: ({ message, conversationId }) => ({
        url: "/ai/chat",
        method: "POST",
        data: { message, conversationId }
      }),
      invalidatesTags: (result, error, { conversationId }) => [{ type: "Conversations", id: conversationId || "LIST" }, "Message"]
    }),
    // Get all conversations with filter
    getConversations: builder.query<GetConversationsResponse, GetConversationsParams>({
      query: (params) => ({
        url: "/conversations",
        method: "GET",
        params
      }),
      providesTags: [{ type: "Conversations", id: "LIST" }]
    }),

    // Get conversation by ID
    getConversationById: builder.query<ConversationResponse, number>({
      query: (id) => ({
        url: `/conversations/${id}`
      }),
      providesTags: (result, error, id) => [{ type: "Conversations", id }]
    }),

    // Create conversation
    createConversation: builder.mutation<ConversationResponse, void>({
      query: () => ({
        url: "/conversations",
        method: "POST"
      }),
      invalidatesTags: ["Conversations"]
    }),

    // Update conversation
    updateConversation: builder.mutation<ConversationResponse, ConversationUpdateRequest>({
      query: (body) => ({
        url: "/conversations",
        method: "PUT",
        data: body
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Conversations", id: arg.conversationId },
        { type: "Conversations", id: "LIST" }
      ]
    }),

    // Pin conversations
    pinConversations: builder.mutation<ConversationPinnedResponse, ConversationIdsRequest>({
      query: (body) => ({
        url: "/conversations/pin",
        method: "PATCH",
        data: body
      }),
      invalidatesTags: (result, error, arg) => [
        ...arg.conversationIds.map((id) => ({ type: "Conversations" as const, id })),
        { type: "Conversations", id: "LIST" }
      ]
    }),

    // Unpin conversations
    unpinConversations: builder.mutation<ConversationPinnedResponse, ConversationIdsRequest>({
      query: (body) => ({
        url: "/conversations/unpin",
        method: "PATCH",
        data: body
      }),
      invalidatesTags: (result, error, arg) => [
        ...arg.conversationIds.map((id) => ({ type: "Conversations" as const, id })),
        { type: "Conversations", id: "LIST" }
      ]
    }),

    // Delete conversations
    deleteConversations: builder.mutation<void, ConversationIdsRequest>({
      query: (body) => ({
        url: "/conversations",
        method: "DELETE",
        data: body
      }),
      invalidatesTags: [{ type: "Conversations", id: "LIST" }]
    }),

    // get message of a conversation by id
    getConversationMessages: builder.query<GetMessageOfConversationResponse, number>({
      query: (id) => ({
        url: `/conversations/${id}/messages`,
        method: "GET"
      }),
      providesTags: (result, error, id) => [{ type: "Conversations", id }, "Message"]
    })
  })
});

export const {
  useAiChatMutation,
  useGetConversationsQuery,
  useGetConversationByIdQuery,
  useCreateConversationMutation,
  useUpdateConversationMutation,
  usePinConversationsMutation,
  useUnpinConversationsMutation,
  useDeleteConversationsMutation,

  useGetConversationMessagesQuery
} = conversationApi;