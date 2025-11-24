import { setUser } from "@/lib/features/authSlice";
import { api } from "@/services/api";
import { User } from "@/types/model";
import type {
  ApplicantSignUpRequest,
  FetchAccountResponse,
  LogoutResponse,
  RecruiterSignUpRequest,
  RefreshTokenResponse,
  ResendCodeRequest,
  ResendCodeResponse,
  SignInRequest,
  SignInResponse,
  SignUpResponse,
  VerifyCodeRequest,
  VerifyCodeResponse,
} from "./authType";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    applicantSignup: builder.mutation<SignUpResponse, ApplicantSignUpRequest>({
      query: (args) => ({
        url: "/auth/register/applicant",
        method: "POST",
        data: args,
      }),
    }),
    recruiterSignup: builder.mutation<SignUpResponse, RecruiterSignUpRequest>({
      query: (args) => ({
        url: "/auth/register/recruiter",
        method: "POST",
        data: args,
      }),
    }),

    signin: builder.mutation<SignInResponse, SignInRequest>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        data: { email, password },
      }),
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

    getMyAccount: builder.query<FetchAccountResponse, void>({
      query: () => ({ url: "/auth/account", method: "GET" }),
      providesTags: ["Account", "Applicant", "Recruiter"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Dispatch action to save user data to slice
          dispatch(setUser({ user: data?.data?.user as User }));
        } catch (error) {
          console.error("Failed to fetch account:", error);
        }
      },
    }),
  }),
});

export const {
  useApplicantSignupMutation,
  useRecruiterSignupMutation,
  useSigninMutation,
  useRefreshTokenQuery,
  useLogoutMutation,
  useVerifyCodeMutation,
  useResendCodeMutation,
  useGetMyAccountQuery,
} = authApi;
