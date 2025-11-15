import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Subscriber } from "@/types/model";

// Create Subscriber
export type CreateSubscriberRequest = Subscriber;

export type CreateSubscriberResponse = IBackendRes<Subscriber>;

// Update Subscriber
export type UpdateSubscriberRequest = Subscriber;

export type UpdateSubscriberResponse = IBackendRes<Subscriber>;

// Delete Subscriber
export type DeleteSubscriberRequest = string; // subscriberId

export type DeleteSubscriberResponse = IBackendRes<Subscriber>;

// Fetch Subscribers (with pagination)
export type FetchSubscribersRequest = {
  page?: number;
  size?: number;
  sortBy?: string;
  keyword?: string;
  email?: string;
};

export type FetchSubscribersResponse = IBackendRes<IModelPaginate<Subscriber>>;

// Fetch Subscriber By Id
export type FetchSubscriberByIdRequest = string; // subscriberId

export type FetchSubscriberByIdResponse = IBackendRes<Subscriber>;

// Get Subscriber Skills
export type GetSubscriberSkillsResponse = IBackendRes<Subscriber>;
