import { IBackendRes, IModelPaginate } from "@/types/api";
import { ChatRoom } from "@/types/model";

export type FetchChatRoomsRequest = {
  page?: number
  size?: number
}

export type FetchChatRoomsResponse = IBackendRes<IModelPaginate<ChatRoom>>