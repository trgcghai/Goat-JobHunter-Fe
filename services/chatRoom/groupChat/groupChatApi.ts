// Request/Response Types
import { api } from "@/services/api";
import { IBackendRes } from "@/types/api";

interface CreateGroupChatRequest {
  accountIds: number[];
  name: string;
  avatar: File;
}

interface UpdateGroupInfoRequest {
  name?: string;
  avatar?: File;
}

interface AddMemberRequest {
  accountId: number;
}

interface UpdateMemberRoleRequest {
  role: ChatRole;
}

type ChatRole = "OWNER" | "MODERATOR" | "MEMBER";

interface ChatRoomResponse {
  aiModel: string | null;
  avatar: string;
  createdAt: string;
  createdBy: string;
  deletedAt: string | null;
  deleteBy: string | null;
  name: string
  roomId: number;
  type: "GROUP";
  updatedAt: string;
  updatedBy: string;
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
      query: (data) => {

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("avatar", data.avatar);
        data.accountIds.forEach((id) => {
          formData.append("accountIds", id.toString());
        });

        return {
          url: "/chatrooms/group",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: formData
        };
      },
      invalidatesTags: ["ChatRoom"]
    }),

    updateGroupInfo: builder.mutation<IBackendRes<ChatRoomResponse>, { chatroomId: string } & UpdateGroupInfoRequest>({
      query: ({ chatroomId, ...data }) => {

        const formData = new FormData();
        if (data.name) formData.append("name", data.name);
        if (data.avatar) formData.append("avatar", data.avatar);

        return {
          url: `/chatrooms/group/${chatroomId}`,
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data
        };
      },
      invalidatesTags: (result, error, { chatroomId }) => [
        { type: "ChatRoom", id: chatroomId }
      ]
    }),

    leaveGroupChat: builder.mutation<void, string>({
      query: (chatroomId) => ({
        url: `/chatrooms/group/${chatroomId}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, chatroomId) => [
        { type: "ChatRoom", id: chatroomId }
      ]
    }),

    addMemberToGroup: builder.mutation<IBackendRes<ChatMemberResponse>, { chatroomId: string } & AddMemberRequest>({
      query: ({ chatroomId, ...data }) => ({
        url: `/chatrooms/group/${chatroomId}/member`,
        method: "POST",
        data
      }),
      invalidatesTags: (result, error, { chatroomId }) => [
        { type: "ChatRoom", id: chatroomId },
        { type: "ChatMember" }
      ]
    }),

    removeMemberFromGroup: builder.mutation<void, { chatroomId: string; chatmemberId: string }>({
      query: ({ chatroomId, chatmemberId }) => ({
        url: `/chatrooms/group/${chatroomId}/member/${chatmemberId}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, { chatroomId, chatmemberId }) => [
        { type: "ChatRoom", id: chatroomId },
        { type: "ChatMember", id: chatmemberId }
      ]
    }),

    updateMemberRole: builder.mutation<IBackendRes<ChatMemberResponse>, {
      chatroomId: string;
      chatmemberId: string
    } & UpdateMemberRoleRequest>({
      query: ({ chatroomId, chatmemberId, ...data }) => ({
        url: `/chatrooms/group/${chatroomId}/member/${chatmemberId}`,
        method: "PUT",
        data
      }),
      invalidatesTags: (result, error, { chatroomId, chatmemberId }) => [
        { type: "ChatRoom", id: chatroomId },
        { type: "ChatMember", id: chatmemberId }
      ]
    })
  })
});

export const {
  useCreateGroupChatMutation,
  useUpdateGroupInfoMutation,
  useLeaveGroupChatMutation,
  useAddMemberToGroupMutation,
  useRemoveMemberFromGroupMutation,
  useUpdateMemberRoleMutation
} = groupChatApi;
