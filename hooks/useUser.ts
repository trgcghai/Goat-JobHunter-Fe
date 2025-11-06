import {
  AuthStateUser,
  logout as logoutAction,
  setCredentials,
  updateUser as updateUserAction,
} from "@/lib/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  useFetchAccountQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResendCodeMutation,
  useVerifyCodeMutation,
} from "@/services/auth/authApi";
import { useUpdatePasswordMutation } from "@/services/user/userApi";
import type { Contact } from "@/types/model";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

export interface SignInParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  contact: Contact;
  password: string;
  type: "recruiter" | "applicant";
  username?: string;
  address?: string;
  fullName?: string;
}

export interface UpdatePasswordParams {
  currentPassword: string;
  newPassword: string;
  rePassword: string;
}

export interface VerifyCodeParams {
  email: string;
  verificationCode: string;
}

export function useUser() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Redux state
  const { user, token, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  // API mutations
  const [loginMutation, { isLoading: isSigningIn }] = useLoginMutation();
  const [registerMutation, { isLoading: isSigningUp }] = useRegisterMutation();
  const [logoutMutation, { isLoading: isSigningOut }] = useLogoutMutation();
  const [verifyCodeMutation, { isLoading: isVerifying }] =
    useVerifyCodeMutation();
  const [resendCodeMutation, { isLoading: isResending }] =
    useResendCodeMutation();
  const [updatePasswordMutation, { isLoading: isUpdatingPassword }] =
    useUpdatePasswordMutation();

  // Fetch account on mount if token exists
  const { data: accountData, isLoading: isLoadingAccount } =
    useFetchAccountQuery(undefined, { skip: !token });

  // Update user from account data
  useEffect(() => {
    if (accountData?.data) {
      const userData = accountData.data.user;
      dispatch(updateUserAction(userData));
    }
  }, [accountData, dispatch]);

  /**
   * Sign in user
   */
  const signIn = useCallback(
    async ({ email, password }: SignInParams) => {
      try {
        const response = await loginMutation({ email, password }).unwrap();

        console.log("response", response);

        if (response.statusCode === 200 && response.message == "Success") {
          const access_token = response.data?.access_token;

          // Store token in localStorage
          localStorage.setItem("access_token", access_token as string);

          dispatch(
            setCredentials({
              user: response?.data?.user as AuthStateUser,
              token: access_token as string,
            }),
          );

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
    [dispatch, loginMutation],
  );

  /**
   * Sign up new user
   */
  const signUp = useCallback(
    async (params: SignUpParams) => {
      try {
        const response = await registerMutation(params).unwrap();

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
    [registerMutation],
  );

  /**
   * Sign out user
   */
  const signOut = useCallback(async () => {
    try {
      await logoutMutation().unwrap();

      // Clear local storage
      localStorage.removeItem("access_token");

      // Clear Redux state
      dispatch(logoutAction());

      toast.success("Đăng xuất thành công!");
      router.push("/");

      return { success: true };
    } catch (error) {
      // Even if API fails, clear local state
      localStorage.removeItem("access_token");
      dispatch(logoutAction());
      router.push("/");

      console.error("error sign out:", error);
      return { success: false };
    }
  }, [logoutMutation, dispatch, router]);

  /**
   * Verify email code
   */
  const verifyCode = useCallback(
    async ({ email, verificationCode }: VerifyCodeParams) => {
      try {
        const response = await verifyCodeMutation({
          email,
          verificationCode,
        }).unwrap();

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

  /**
   * Update user password
   */
  const updatePassword = useCallback(
    async (params: UpdatePasswordParams) => {
      try {
        const response = await updatePasswordMutation(params).unwrap();

        if (response.statusCode === 200) {
          toast.success("Đổi mật khẩu thành công!");
          return { success: true };
        }

        toast.error("Đổi mật khẩu thất bại!");
        return { success: false, error: "Update failed" };
      } catch (error) {
        console.error("error update password:", error);
        toast.error("Đổi mật khẩu thất bại!");
        return { success: false };
      }
    },
    [updatePasswordMutation],
  );

  /**
   * Update user info
   */
  const updateUser = useCallback(
    (userData: AuthStateUser) => {
      dispatch(updateUserAction(userData));
    },
    [dispatch],
  );

  return {
    // User data
    user,
    isSignedIn: isAuthenticated,
    isLoaded: !isLoadingAccount,

    // Auth methods
    signIn,
    signUp,
    signOut,
    verifyCode,
    resendCode,

    // User methods
    updateUser,
    updatePassword,

    // Loading states
    isSigningIn,
    isSigningUp,
    isSigningOut,
    isVerifying,
    isResending,
    isUpdatingPassword,
  };
}
