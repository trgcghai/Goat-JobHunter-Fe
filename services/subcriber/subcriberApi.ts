import { api } from "@/services/api";
import type {
  CreateSubscriberRequest,
  CreateSubscriberResponse,
  DeleteSubscriberRequest,
  DeleteSubscriberResponse,
  FetchSubscriberByIdRequest,
  FetchSubscriberByIdResponse,
  FetchSubscribersRequest,
  FetchSubscribersResponse,
  GetSubscriberSkillsResponse,
  UpdateSubscriberRequest,
  UpdateSubscriberResponse,
} from "./subcriberType";

export const subscriberApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSubscriber: builder.mutation<
      CreateSubscriberResponse,
      CreateSubscriberRequest
    >({
      query: (data) => ({
        url: "/subscribers",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Subscriber"],
    }),

    updateSubscriber: builder.mutation<
      UpdateSubscriberResponse,
      UpdateSubscriberRequest
    >({
      query: (data) => ({
        url: "/subscribers",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Subscriber"],
    }),

    deleteSubscriber: builder.mutation<
      DeleteSubscriberResponse,
      DeleteSubscriberRequest
    >({
      query: (id) => ({
        url: `/subscribers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscriber"],
    }),

    fetchSubscriberById: builder.query<
      FetchSubscriberByIdResponse,
      FetchSubscriberByIdRequest
    >({
      query: (id) => ({
        url: `/subscribers/${id}`,
        method: "GET",
      }),
      providesTags: ["Subscriber"],
    }),

    fetchSubscribers: builder.query<
      FetchSubscribersResponse,
      FetchSubscribersRequest
    >({
      query: (params) => ({
        url: "/subscribers",
        method: "GET",
        params,
      }),
      providesTags: ["Subscriber"],
    }),

    getCurrentUserSubscriberSkills: builder.query<
      GetSubscriberSkillsResponse,
      void
    >({
      query: () => ({
        url: "/subscribers/skills",
        method: "GET",
      }),
      providesTags: ["Subscriber"],
    }),
  }),
});

export const {
  useCreateSubscriberMutation,
  useUpdateSubscriberMutation,
  useDeleteSubscriberMutation,
  useFetchSubscriberByIdQuery,
  useFetchSubscribersQuery,
  useGetCurrentUserSubscriberSkillsQuery,
} = subscriberApi;
