import { IBackendRes } from "@/types/api";
import { Conversation } from "@/types/model";

export type GetConversationsParams = {
  title?: string;
  page?: number;
  size?: number;
}

export type ConversationUpdateRequest = {
  conversationId: number;
  title?: string;
}

export type ConversationIdsRequest = {
  conversationIds: number[];
}

export type GetConversationsResponse = IBackendRes<Conversation[]>

export type ConversationResponse = IBackendRes<Conversation>;

export type ConversationPinnedResponse = IBackendRes<{ conversationId: number, pinnned: boolean }[]>