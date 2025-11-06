import { api } from "@/services/api";
import { IBackendRes } from "@/types/api";
import type {
  Account,
  Applicant,
  Contact,
  GetAccount,
  Recruiter,
} from "@/types/model";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      IBackendRes<Recruiter | Applicant>,
      {
        contact: Contact;
        password: string;
        type: "recruiter" | "applicant";
        username?: string;
        address?: string;
        fullName?: string;
      }
    >({
      query: (args) => {
        const { type, ...rest } = args;
        if (type === "recruiter") {
          return {
            url: "/api/v1/auth/register/recruiter",
            method: "POST",
            data: { ...rest, type },
          };
        }
        return {
          url: "/api/v1/auth/register/applicant",
          method: "POST",
          data: { ...rest, type },
        };
      },
    }),

    login: builder.mutation<
      IBackendRes<Account>,
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        data: { email, password },
      }),
    }),

    fetchAccount: builder.query<IBackendRes<GetAccount>, void>({
      query: () => ({ url: "/api/v1/auth/account", method: "GET" }),
    }),

    refreshToken: builder.query<IBackendRes<Account>, void>({
      query: () => ({ url: "/api/v1/auth/refresh", method: "GET" }),
    }),

    logout: builder.mutation<IBackendRes<string>, void>({
      query: () => ({ url: "/api/v1/auth/logout", method: "POST" }),
    }),

    verifyCode: builder.mutation<
      IBackendRes<unknown>,
      { email: string; verificationCode: string }
    >({
      query: ({ email, verificationCode }) => ({
        url: "/api/v1/auth/verify",
        method: "POST",
        data: { email, verificationCode },
      }),
    }),

    resendCode: builder.mutation<IBackendRes<unknown>, { email: string }>({
      query: ({ email }) => ({
        url: `/api/v1/auth/resend?email=${email}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useFetchAccountQuery,
  useRefreshTokenQuery,
  useLogoutMutation,
  useVerifyCodeMutation,
  useResendCodeMutation,
} = authApi;
