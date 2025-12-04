import { api } from "@/services/api";
import {
  ConversationIdsRequest,
  ConversationPinnedResponse,
  ConversationResponse,
  ConversationUpdateRequest,
  GetConversationsParams,
  GetConversationsResponse
} from "@/services/ai/conversationType";

export const conversationApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    aiChat: builder.mutation<string, string>({
      query: (message: string) => ({
        url: "/ai/chat",
        method: "POST",
        data: { message }
      })
    }),
    // Get all conversations with filter
    getConversations: builder.query<GetConversationsResponse, GetConversationsParams>({
      query: (params) => ({
        url: "/conversations",
        method: "GET",
        params,
      }),
      providesTags:  ["Conversations"]
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
  useDeleteConversationsMutation
} = conversationApi;