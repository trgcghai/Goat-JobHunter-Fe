
// Request/Response Types
import { api } from "@/services/api";
import { IBackendRes } from "@/types/api";

interface CreateGroupChatRequest {
  accountIds: number[];
  name?: string;
  avatar?: string;
}

interface UpdateGroupInfoRequest {
  name?: string;
  avatar?: string;
}

interface AddMemberRequest {
  accountId: number;
}

interface UpdateMemberRoleRequest {
  role: ChatRole;
}

type ChatRole = 'OWNER' | 'MODERATOR' | 'MEMBER';

interface ChatRoomResponse {
  id: string;
  name?: string;
  avatar?: string;
  type: 'DIRECT' | 'GROUP';
  createdAt: string;
}

interface ChatMemberResponse {
  id: string;
  accountId: string;
  role: ChatRole;
  joinedAt: string;
}

export const groupChatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createGroupChat: builder.mutation<IBackendRes<ChatRoomResponse>, CreateGroupChatRequest>({
      query: (data) => ({
        url: '/chatrooms/group',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['ChatRoom'],
    }),

    updateGroupInfo: builder.mutation<IBackendRes<ChatRoomResponse>, { chatroomId: string } & UpdateGroupInfoRequest>({
      query: ({ chatroomId, ...data }) => ({
        url: `/chatrooms/group/${chatroomId}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: (result, error, { chatroomId }) => [
        { type: 'ChatRoom', id: chatroomId },
      ],
    }),

    leaveGroupChat: builder.mutation<void, string>({
      query: (chatroomId) => ({
        url: `/chatrooms/group/${chatroomId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, chatroomId) => [
        { type: 'ChatRoom', id: chatroomId },
      ],
    }),

    addMemberToGroup: builder.mutation<IBackendRes<ChatMemberResponse>, { chatroomId: string } & AddMemberRequest>({
      query: ({ chatroomId, ...data }) => ({
        url: `/chatrooms/group/${chatroomId}/member`,
        method: 'POST',
        data,
      }),
      invalidatesTags: (result, error, { chatroomId }) => [
        { type: 'ChatRoom', id: chatroomId },
        { type: 'ChatMember' },
      ],
    }),

    removeMemberFromGroup: builder.mutation<void, { chatroomId: string; chatmemberId: string }>({
      query: ({ chatroomId, chatmemberId }) => ({
        url: `/chatrooms/group/${chatroomId}/member/${chatmemberId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { chatroomId, chatmemberId }) => [
        { type: 'ChatRoom', id: chatroomId },
        { type: 'ChatMember', id: chatmemberId },
      ],
    }),

    updateMemberRole: builder.mutation<IBackendRes<ChatMemberResponse>, { chatroomId: string; chatmemberId: string } & UpdateMemberRoleRequest>({
      query: ({ chatroomId, chatmemberId, ...data }) => ({
        url: `/chatrooms/group/${chatroomId}/member/${chatmemberId}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: (result, error, { chatroomId, chatmemberId }) => [
        { type: 'ChatRoom', id: chatroomId },
        { type: 'ChatMember', id: chatmemberId },
      ],
    }),
  }),
});

export const {
  useCreateGroupChatMutation,
  useUpdateGroupInfoMutation,
  useLeaveGroupChatMutation,
  useAddMemberToGroupMutation,
  useRemoveMemberFromGroupMutation,
  useUpdateMemberRoleMutation,
} = groupChatApi;
