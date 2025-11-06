import { api } from "@/services/api";
import { IBackendRes, IModelPaginate } from "@/types/api";
import type { Applicant, Contact } from "@/types/model";
import dayjs from "dayjs";

export const applicantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createApplicant: builder.mutation<
      IBackendRes<Applicant>,
      {
        fullName: string;
        address: string;
        contact: Contact;
        dob: Date;
        gender: string;
        password: string;
        username: string;
        availableStatus: boolean;
        enabled: boolean;
        education?: string;
        level?: string;
        role?: { roleId: string; name: string };
        avatar?: string;
        resumeUrl?: string;
      }
    >({
      query: (data) => ({
        url: "/api/v1/applicants",
        method: "POST",
        data: {
          ...data,
          dob: data.dob ? dayjs(data.dob).format("YYYY-MM-DD") : undefined,
          type: "applicant",
        },
      }),
      invalidatesTags: ["Applicant"],
    }),

    updateApplicant: builder.mutation<
      IBackendRes<Applicant>,
      {
        applicantId: string;
        fullName: string;
        address: string;
        contact: Contact;
        dob: Date;
        gender: string;
        password: string;
        username: string;
        availableStatus: boolean;
        enabled: boolean;
        education?: string;
        level?: string;
        role?: { roleId: string; name: string };
        avatar?: string;
        resumeUrl?: string;
      }
    >({
      query: ({ applicantId, ...data }) => ({
        url: "/api/v1/applicants",
        method: "PUT",
        data: {
          userId: applicantId,
          ...data,
          dob: data.dob ? dayjs(data.dob).format("YYYY-MM-DD") : undefined,
          type: "applicant",
        },
      }),
      invalidatesTags: ["Applicant"],
    }),

    deleteApplicant: builder.mutation<IBackendRes<Applicant>, string>({
      query: (applicantId) => ({
        url: `/api/v1/applicants/${applicantId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Applicant"],
    }),

    fetchApplicant: builder.query<
      IBackendRes<IModelPaginate<Applicant>>,
      string
    >({
      query: (query) => ({ url: `/api/v1/applicants?${query}`, method: "GET" }),
      providesTags: ["Applicant"],
    }),

    fetchApplicantById: builder.query<IBackendRes<Applicant>, string>({
      query: (applicantId) => ({
        url: `/api/v1/applicants/${applicantId}`,
        method: "GET",
      }),
      providesTags: ["Applicant"],
    }),
  }),
});

export const {
  useCreateApplicantMutation,
  useUpdateApplicantMutation,
  useDeleteApplicantMutation,
  useFetchApplicantQuery,
  useFetchApplicantByIdQuery,
} = applicantApi;
