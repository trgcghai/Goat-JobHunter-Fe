import { api } from "@/services/api";
import { IBackendRes, IModelPaginate } from "@/types/api";
import type { Career } from "@/types/model";

export const careerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCareer: builder.mutation<IBackendRes<Career>, { name: string }>({
      query: ({ name }) => ({
        url: "/api/v1/careers",
        method: "POST",
        data: { name },
      }),
      invalidatesTags: ["Career"],
    }),

    updateCareer: builder.mutation<
      IBackendRes<Career>,
      { careerId: string; name: string }
    >({
      query: ({ careerId, name }) => ({
        url: "/api/v1/careers",
        method: "PUT",
        data: { careerId, name },
      }),
      invalidatesTags: ["Career"],
    }),

    deleteCareer: builder.mutation<IBackendRes<Career>, string>({
      query: (careerId) => ({
        url: `/api/v1/careers/${careerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Career"],
    }),

    fetchAllCareer: builder.query<IBackendRes<IModelPaginate<Career>>, string>({
      query: (query) => ({ url: `/api/v1/careers?${query}`, method: "GET" }),
      providesTags: ["Career"],
    }),
  }),
});

export const {
  useCreateCareerMutation,
  useUpdateCareerMutation,
  useDeleteCareerMutation,
  useFetchAllCareerQuery,
} = careerApi;
