import { api } from "@/services/api";
import { IBackendRes, IModelPaginate } from "@/types/api";
import type { Subscriber } from "@/types/model";

export const subscriberApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSubscriber: builder.mutation<IBackendRes<Subscriber>, Subscriber>({
      query: (subs) => ({
        url: "/api/v1/subscribers",
        method: "POST",
        data: subs,
      }),
      invalidatesTags: ["Subscriber"],
    }),

    updateSubscriber: builder.mutation<IBackendRes<Subscriber>, Subscriber>({
      query: (subs) => ({
        url: "/api/v1/subscribers",
        method: "PUT",
        data: subs,
      }),
      invalidatesTags: ["Subscriber"],
    }),

    deleteSubscriber: builder.mutation<IBackendRes<Subscriber>, string>({
      query: (id) => ({
        url: `/api/v1/subscribers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscriber"],
    }),

    fetchSubscriberById: builder.query<IBackendRes<Subscriber>, string>({
      query: (id) => ({ url: `/api/v1/subscribers/${id}`, method: "GET" }),
      providesTags: ["Subscriber"],
    }),

    fetchSubscriber: builder.query<
      IBackendRes<IModelPaginate<Subscriber>>,
      string
    >({
      query: (query) => ({
        url: `/api/v1/subscribers?${query}`,
        method: "GET",
      }),
      providesTags: ["Subscriber"],
    }),

    getSubscriberSkills: builder.mutation<IBackendRes<Subscriber>, void>({
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
  useFetchSubscriberQuery,
  useGetSubscriberSkillsMutation,
} = subscriberApi;
