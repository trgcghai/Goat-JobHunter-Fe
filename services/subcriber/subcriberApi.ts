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
      query: (subs) => ({
        url: "/api/v1/subscribers",
        method: "POST",
        data: subs,
      }),
      invalidatesTags: ["Subscriber"],
    }),

    updateSubscriber: builder.mutation<
      UpdateSubscriberResponse,
      UpdateSubscriberRequest
    >({
      query: (subs) => ({
        url: "/api/v1/subscribers",
        method: "PUT",
        data: subs,
      }),
      invalidatesTags: ["Subscriber"],
    }),

    deleteSubscriber: builder.mutation<
      DeleteSubscriberResponse,
      DeleteSubscriberRequest
    >({
      query: (id) => ({
        url: `/api/v1/subscribers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscriber"],
    }),

    fetchSubscriberById: builder.query<
      FetchSubscriberByIdResponse,
      FetchSubscriberByIdRequest
    >({
      query: (id) => ({
        url: `/api/v1/subscribers/${id}`,
        method: "GET",
      }),
      providesTags: ["Subscriber"],
    }),

    fetchSubscribers: builder.query<
      FetchSubscribersResponse,
      FetchSubscribersRequest
    >({
      query: (params) => ({
        url: "/api/v1/subscribers",
        method: "GET",
        params,
      }),
      providesTags: ["Subscriber"],
    }),

    getSubscriberSkills: builder.mutation<GetSubscriberSkillsResponse, void>({
      query: () => ({
        url: "/api/v1/subscribers/skills",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateSubscriberMutation,
  useUpdateSubscriberMutation,
  useDeleteSubscriberMutation,
  useFetchSubscriberByIdQuery,
  useFetchSubscribersQuery,
  useGetSubscriberSkillsMutation,
} = subscriberApi;
