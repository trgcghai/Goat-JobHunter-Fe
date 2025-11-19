import { api } from "@/services/api";
import dayjs from "dayjs";
import type {
  CreateApplicantRequest,
  CreateApplicantResponse,
  DeleteApplicantRequest,
  DeleteApplicantResponse,
  FetchApplicantByIdRequest,
  FetchApplicantByIdResponse,
  FetchApplicantsRequest,
  FetchApplicantsResponse,
  UpdateApplicantRequest,
  UpdateApplicantResponse,
} from "./applicantType";

export const applicantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createApplicant: builder.mutation<
      CreateApplicantResponse,
      CreateApplicantRequest
    >({
      query: (data) => ({
        url: "/applicants",
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
      UpdateApplicantResponse,
      UpdateApplicantRequest
    >({
      query: (data) => ({
        url: "/applicants",
        method: "PUT",
        data: {
          type: "applicant",
          password: "12345678", // for validation at backend, this field will be ignored
          ...data,
        },
      }),
      invalidatesTags: ["Applicant", "Account"],
    }),

    deleteApplicant: builder.mutation<
      DeleteApplicantResponse,
      DeleteApplicantRequest
    >({
      query: (applicantId) => ({
        url: `/applicants/${applicantId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Applicant"],
    }),

    fetchApplicant: builder.query<
      FetchApplicantsResponse,
      FetchApplicantsRequest
    >({
      query: (params) => ({ url: `/applicants`, method: "GET", params }),
      providesTags: ["Applicant"],
    }),

    fetchApplicantById: builder.query<
      FetchApplicantByIdResponse,
      FetchApplicantByIdRequest
    >({
      query: (applicantId) => ({
        url: `/applicants/${applicantId}`,
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
