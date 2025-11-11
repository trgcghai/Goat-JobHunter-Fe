import { clearUser, setUser, useAuthSlice } from "@/lib/features/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import {
  useLogoutMutation,
  useResendCodeMutation,
  useSigninMutation,
  useSignupMutation,
  useVerifyCodeMutation,
} from "@/services/auth/authApi";
import {
  SignInRequest,
  SignUpRequest,
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
  const [signupMutation, { isLoading: isSigningUp }] = useSignupMutation();
  const [logoutMutation, { isLoading: isSigningOut }] = useLogoutMutation();
  const [verifyCodeMutation, { isLoading: isVerifying }] =
    useVerifyCodeMutation();
  const [resendCodeMutation, { isLoading: isResending }] =
    useResendCodeMutation();

  /**
   * Sign in user
   */
  const signIn = useCallback(
    async (params: SignInRequest) => {
      try {
        const response = await signinMutation(params).unwrap();

        if (response.statusCode === 200 && response.message == "Success") {
          dispatch(setUser({ user: response?.data?.user as User }));

          toast.success("Đăng nhập thành công!");
          return { success: true, user: response?.data?.user };
        }
        return { success: false, error: "Login failed" };
      } catch (error) {
        console.error("error sigin:", error);
        toast.error("Đăng nhập thất bại!");
        return { success: false };
      }
    },
    [dispatch, signinMutation],
  );

  /**
   * Sign up new user
   */
  const signUp = useCallback(
    async (params: SignUpRequest) => {
      try {
        const response = await signupMutation(params).unwrap();

        if (response.data) {
          toast.success("Đăng ký thành công! Vui lòng xác thực email.");
          return { success: true, user: response.data };
        }

        toast.error("Đăng ký thất bại!");
        return { success: false, error: "Registration failed" };
      } catch (error) {
        console.error("error sign up:", error);
        toast.error("Đăng ký thất bại!");
        return { success: false };
      }
    },
    [signupMutation],
  );

  /**
   * Sign out user
   */
  const signOut = useCallback(async () => {
    try {
      await logoutMutation().unwrap();

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
  }, [logoutMutation, dispatch, router]);

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
    signUp,
    signOut,
    verifyCode,
    resendCode,

    // Loading states
    isSigningIn,
    isSigningUp,
    isSigningOut,
    isVerifying,
    isResending,
  };
}
