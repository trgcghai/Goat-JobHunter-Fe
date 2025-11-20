import { clearUser, setUser, useAuthSlice } from "@/lib/features/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useClearCookiesMutation } from "@/services/api";
import {
  useApplicantSignupMutation,
  useLogoutMutation,
  useRecruiterSignupMutation,
  useResendCodeMutation,
  useSigninMutation,
  useVerifyCodeMutation,
} from "@/services/auth/authApi";
import {
  ApplicantSignUpRequest,
  RecruiterSignUpRequest,
  SignInRequest,
  VerifyCodeRequest,
} from "@/services/auth/authType";
import { User } from "@/types/model";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

export function useUser() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, isAuthenticated } = useAuthSlice();

  // API mutations
  const [signinMutation, { isLoading: isSigningIn }] = useSigninMutation();
  const [applicantSignupMutation, { isLoading: isApplicantSigningUp }] =
    useApplicantSignupMutation();
  const [recruiterSignupMutation, { isLoading: isRecruiterSigningUp }] =
    useRecruiterSignupMutation();
  const [logoutMutation, { isLoading: isSigningOut }] = useLogoutMutation();
  const [verifyCodeMutation, { isLoading: isVerifying }] =
    useVerifyCodeMutation();
  const [resendCodeMutation, { isLoading: isResending }] =
    useResendCodeMutation();
  const [clearCookies] = useClearCookiesMutation();

  /**
   * Sign in user
   */
  const signIn = useCallback(
    async (params: SignInRequest) => {
      try {
        const response = await signinMutation(params).unwrap();

        console.log("response sign in", response);

        if (response.statusCode === 400) {
          throw new Error("Tài khoản đang bị khóa");
        }

        if (response.statusCode === 200) {
          dispatch(setUser({ user: response?.data?.user as User }));

          toast.success("Đăng nhập thành công!");
          return { success: true, user: response?.data?.user };
        }
        return { success: false };
      } catch (error) {
        console.error("error sigin:", error);

        // @ts-expect-error ts-ignore
        if (error.status === 400 && error.data.message == "Account is locked") {
          toast("Tài khoản của bạn đã bị khóa. Vui lòng kích hoạt lại.", {
            action: {
              label: "Kích hoạt ngay",
              onClick: () => {
                router.push("/otp?email=" + params.email);
              },
            },
          });
          return { success: false };
        }

        toast.error("Đăng nhập thất bại!");
        return { success: false };
      }
    },
    [dispatch, signinMutation, router],
  );

  /**
   * Sign up new applicant
   */
  const applicantSignUp = useCallback(
    async (params: ApplicantSignUpRequest) => {
      try {
        const response = await applicantSignupMutation(params).unwrap();

        if (response.statusCode === 201) {
          toast.success("Đăng ký thành công!");
          return { success: true };
        }
        return { success: false };
      } catch (error) {
        console.error("error sign up applicant:", error);
        toast.error("Đăng ký thất bại!");
        return { success: false };
      }
    },
    [applicantSignupMutation],
  );

  /**
   * Sign up new recruiter
   */
  const recruiterSignUp = useCallback(
    async (params: RecruiterSignUpRequest) => {
      try {
        const response = await recruiterSignupMutation(params).unwrap();

        if (response.statusCode === 201) {
          toast.success("Đăng ký thành công!");
          return { success: true };
        }
        return { success: false };
      } catch (error) {
        console.error("error sign up applicant:", error);
        toast.error("Đăng ký thất bại!");
        return { success: false };
      }
    },
    [recruiterSignupMutation],
  );

  /**
   * Sign out user
   */
  const signOut = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
      await clearCookies().unwrap();

      // Clear Redux state
      dispatch(clearUser());

      toast.success("Đăng xuất thành công!");
      router.push("/");

      return { success: true };
    } catch (error) {
      dispatch(clearUser());
      router.push("/");

      console.error("error sign out:", error);
      return { success: false };
    }
  }, [logoutMutation, clearCookies, dispatch, router]);

  /**
   * Verify email code
   */
  const verifyCode = useCallback(
    async (params: VerifyCodeRequest) => {
      try {
        const response = await verifyCodeMutation(params).unwrap();

        if (response.statusCode === 200) {
          toast.success("Xác thực email thành công!");
          return { success: true };
        }

        toast.error("Mã xác thực không đúng!");
        return { success: false, error: "Invalid code" };
      } catch (error) {
        console.error("error verify code:", error);
        toast.error("Xác thực thất bại!");
        return { success: false };
      }
    },
    [verifyCodeMutation],
  );

  /**
   * Resend verification code
   */
  const resendCode = useCallback(
    async (email: string) => {
      try {
        await resendCodeMutation({ email }).unwrap();
        toast.success("Đã gửi lại mã xác thực!");
        return { success: true };
      } catch (error) {
        console.error("error resend code:", error);
        toast.error("Gửi lại mã thất bại!");
        return { success: false };
      }
    },
    [resendCodeMutation],
  );

  return {
    // User data
    user,
    isSignedIn: isAuthenticated,

    // Auth methods
    signIn,
    applicantSignUp,
    recruiterSignUp,
    signOut,
    verifyCode,
    resendCode,

    // Loading states
    isSigningIn,
    isSigningUp: isApplicantSigningUp || isRecruiterSigningUp,
    isSigningOut,
    isVerifying,
    isResending,
  };
}
