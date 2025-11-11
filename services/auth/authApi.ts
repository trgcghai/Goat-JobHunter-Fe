import { api } from "@/services/api";
import type {
  FetchAccountResponse,
  LogoutResponse,
  RefreshTokenResponse,
  ResendCodeRequest,
  ResendCodeResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  VerifyCodeRequest,
  VerifyCodeResponse,
} from "./authType";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (args) => {
        const { type, ...rest } = args;
        if (type === "recruiter") {
          return {
            url: "/auth/register/recruiter",
            method: "POST",
            data: { ...rest, type },
          };
        }
        return {
          url: "/auth/register/applicant",
          method: "POST",
          data: { ...rest, type },
        };
      },
    }),

    signin: builder.mutation<SignInResponse, SignInRequest>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        data: { email, password },
      }),
    }),

    fetchAccount: builder.query<FetchAccountResponse, void>({
      query: () => ({ url: "/auth/account", method: "GET" }),
    }),

    refreshToken: builder.query<RefreshTokenResponse, void>({
      query: () => ({ url: "/auth/refresh", method: "GET" }),
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
    }),

    verifyCode: builder.mutation<VerifyCodeResponse, VerifyCodeRequest>({
      query: ({ email, verificationCode }) => ({
        url: "/auth/verify",
        method: "POST",
        data: { email, verificationCode },
      }),
    }),

    resendCode: builder.mutation<ResendCodeResponse, ResendCodeRequest>({
      query: ({ email }) => ({
        url: `/auth/resend?email=${email}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useFetchAccountQuery,
  useRefreshTokenQuery,
  useLogoutMutation,
  useVerifyCodeMutation,
  useResendCodeMutation,
} = authApi;
