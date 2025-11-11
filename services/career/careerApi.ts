import { api } from "@/services/api";
import type {
  CreateCareerRequest,
  CreateCareerResponse,
  DeleteCareerRequest,
  DeleteCareerResponse,
  FetchCareersRequest,
  FetchCareersResponse,
  UpdateCareerRequest,
  UpdateCareerResponse,
} from "./careerType";

export const careerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCareer: builder.mutation<CreateCareerResponse, CreateCareerRequest>({
      query: ({ name }) => ({
        url: "/careers",
        method: "POST",
        data: { name },
      }),
      invalidatesTags: ["Career"],
    }),

    updateCareer: builder.mutation<UpdateCareerResponse, UpdateCareerRequest>({
      query: ({ careerId, name }) => ({
        url: "/careers",
        method: "PUT",
        data: { careerId, name },
      }),
      invalidatesTags: ["Career"],
    }),

    deleteCareer: builder.mutation<DeleteCareerResponse, DeleteCareerRequest>({
      query: (careerId) => ({
        url: `/careers/${careerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Career"],
    }),

    fetchCareers: builder.query<FetchCareersResponse, FetchCareersRequest>({
      query: (params) => ({
        url: "/careers",
        method: "GET",
        params,
      }),
      providesTags: ["Career"],
    }),
  }),
});

export const {
  useCreateCareerMutation,
  useUpdateCareerMutation,
  useDeleteCareerMutation,
  useFetchCareersQuery,
} = careerApi;
