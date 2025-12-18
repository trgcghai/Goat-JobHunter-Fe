import { setUser } from "@/lib/features/authSlice";
import { api } from "@/services/api";
import type {
  FetchAccountResponse,
  LogoutResponse,
  ResendCodeRequest,
  ResendCodeResponse,
  SignInRequest,
  SignInResponse,
  VerifyCodeRequest,
  VerifyCodeResponse,
} from "./authType";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userSignUp: builder.mutation({
      query: (args) => ({
        url: "/auth/register/users",
        method: "POST",
        data: args,
      })
    }),

    signin: builder.mutation<SignInResponse, SignInRequest>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        data: { email, password },
      }),
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
          dispatch(setUser({ user: data?.data }));
        } catch (error) {
          console.error("Failed to fetch account:", error);
        }
      },
    }),
  }),
});

export const {
  useUserSignUpMutation,
  useSigninMutation,
  useLogoutMutation,
  useVerifyCodeMutation,
  useResendCodeMutation,
  useGetMyAccountQuery,
} = authApi;
