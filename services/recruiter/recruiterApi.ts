import { api } from "@/services/api";
import { IBackendRes, IModelPaginate } from "@/types/api";
import type { Contact, Recruiter } from "@/types/model";

export const recruiterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createRecruiter: builder.mutation<
      IBackendRes<Recruiter>,
      {
        fullName: string;
        password: string;
        username: string;
        contact: Contact;
        address: string;
        enabled: boolean;
        description?: string;
        avatar?: string;
        role?: { roleId: string; name: string };
        website?: string;
      }
    >({
      query: (data) => ({
        url: "/api/v1/recruiters",
        method: "POST",
        data: { ...data, type: "recruiter" },
      }),
      invalidatesTags: ["Recruiter"],
    }),

    updateRecruiter: builder.mutation<
      IBackendRes<Recruiter>,
      {
        recruiterId: string;
        fullName: string;
        password: string;
        username: string;
        contact: Contact;
        address: string;
        enabled: boolean;
        description?: string;
        avatar?: string;
        role?: { roleId: string; name: string };
        website?: string;
      }
    >({
      query: ({ recruiterId, ...data }) => ({
        url: "/api/v1/recruiters",
        method: "PUT",
        data: { userId: recruiterId, ...data, type: "recruiter" },
      }),
      invalidatesTags: ["Recruiter"],
    }),

    deleteRecruiter: builder.mutation<IBackendRes<Recruiter>, string>({
      query: (recruiterId) => ({
        url: `/api/v1/recruiters/${recruiterId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recruiter"],
    }),

    fetchRecruiter: builder.query<
      IBackendRes<IModelPaginate<Recruiter>>,
      string
    >({
      query: (query) => ({ url: `/api/v1/recruiters?${query}`, method: "GET" }),
      providesTags: ["Recruiter"],
    }),

    fetchRecruiterById: builder.query<IBackendRes<Recruiter>, string>({
      query: (recruiterId) => ({
        url: `/api/v1/recruiters/${recruiterId}`,
        method: "GET",
      }),
      providesTags: ["Recruiter"],
    }),
  }),
});

export const {
  useCreateRecruiterMutation,
  useUpdateRecruiterMutation,
  useDeleteRecruiterMutation,
  useFetchRecruiterQuery,
  useFetchRecruiterByIdQuery,
} = recruiterApi;
