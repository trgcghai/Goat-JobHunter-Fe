import { clearUser, setUser, useAuthSlice } from "@/lib/features/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useUpdateApplicantMutation } from "@/services/applicant/applicantApi";
import {
  useApplicantSignupMutation,
  useLogoutMutation,
  useRecruiterSignupMutation,
  useResendCodeMutation,
  useSigninMutation,
  useVerifyCodeMutation
} from "@/services/auth/authApi";
import {
  ApplicantSignUpRequest,
  RecruiterSignUpRequest,
  SignInRequest,
  VerifyCodeRequest
} from "@/services/auth/authType";
import { useUpdatePasswordMutation } from "@/services/user/userApi";
import { Applicant, Recruiter, User } from "@/types/model";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import { useUpdateRecruiterMutation } from "@/services/recruiter/recruiterApi";

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
  const [updatePasswordMutation, { isLoading: isUpdatingPassword }] =
    useUpdatePasswordMutation();
  const [updateApplicant, { isLoading: isUpdatingApplicant }] = useUpdateApplicantMutation();
  const [updateRecruiter, { isLoading: isUpdatingRecruiter }] = useUpdateRecruiterMutation();

  /**
   * Sign in user
   */
  const signIn = useCallback(
    async (params: SignInRequest) => {
      try {
        const response = await signinMutation(params).unwrap();

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
              }
            }
          });
          return { success: false, error: "Account is locked" };
        }

        // @ts-expect-error ts-ignore
        if (error.status === 400 && error.data.message == "Bad credentials") {
          return { success: false, error: "Bad credentials" };
        }

        toast.error("Đăng nhập thất bại!");
        return { success: false };
      }
    },
    [dispatch, signinMutation, router]
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
    [applicantSignupMutation]
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
    [recruiterSignupMutation]
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
    [verifyCodeMutation]
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
    [resendCodeMutation]
  );

  /**
   * Update password (for logged-in users)
   */
  const updatePassword = useCallback(
    async (params: {
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => {
      try {
        const response = await updatePasswordMutation({
          currentPassword: params.oldPassword,
          newPassword: params.newPassword,
          rePassword: params.confirmPassword
        }).unwrap();

        if (response.statusCode === 200) {
          toast.success("Cập nhật mật khẩu thành công!");
          return { success: true };
        }

        toast.error("Mật khẩu cũ không đúng!");
        return { success: false, error: "Invalid old password" };
      } catch (error) {
        console.error("error update password:", error);

        // @ts-expect-error ts-ignore
        if (error.status === 400) {
          toast.error("Mật khẩu cũ không đúng!");
          return { success: false, error: "Invalid old password" };
        }

        toast.error("Cập nhật mật khẩu thất bại!");
        return { success: false };
      }
    },
    [updatePasswordMutation]
  );

  /**
   * Reset password (for forgotten password)
   */
  const resetPassword = useCallback(async () => {
    // try {
    //   const response = await resetPasswordMutation(params).unwrap();

    //   if (response.statusCode === 200) {
    //     toast.success("Đặt lại mật khẩu thành công!");
    //     return { success: true };
    //   }

    //   toast.error("Email không tồn tại!");
    //   return { success: false, error: "Email not found" };
    // } catch (error) {
    //   console.error("error reset password:", error);

    //   // @ts-expect-error ts-ignore
    //   if (error.status === 404) {
    //     toast.error("Email không tồn tại!");
    //     return { success: false, error: "Email not found" };
    //   }

    //   toast.error("Đặt lại mật khẩu thất bại!");
    //   return { success: false };
    // }
    console.log("Đặt lại mật khẩu");
    return { success: false };
  }, []);

  /**
   * Update applicant information
   */
  const handleUpdateApplicant = useCallback(
    async (userId: number, data: Partial<Applicant>) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedData: Record<string, any> = {};

        // Chỉ thêm các field không undefined/null
        for (const key in data) {
          const value = data[key as keyof Applicant];
          if (value) {
            updatedData[key] = value;
          }
        }

        // Nếu không có field nào để update
        if (Object.keys(updatedData).length === 0) {
          return;
        }

        // @ts-expect-error Không cần check kỹ lưỡng kiểu dữ liệu ở đây
        const response = await updateApplicant({
          userId,
          ...updatedData,
        });

        if (response.error) {
          throw new Error("Cập nhật thông tin thất bại. Vui lòng thử lại sau.");
        }

        // Update Redux state
        if (response.data?.data) {
          dispatch(setUser({ user: response.data.data as User }));
        }

        toast.success("Cập nhật thông tin thành công!");
      } catch (error) {
        console.error("Failed to update applicant:", error);
        toast.error("Cập nhật thông tin thất bại. Vui lòng thử lại sau.");
      }
    },
    [updateApplicant, dispatch]
  );

  /**
   * Update recruiter information
   */
  const handleUpdateRecruiter = useCallback(
    async (userId: number, data: Partial<Recruiter>) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedData: Record<string, any> = {};

        // Chỉ thêm các field không undefined/null
        for (const key in data) {
          const value = data[key as keyof Recruiter];
          if (value) {
            updatedData[key] = value;
          }
        }

        // Nếu không có field nào để update
        if (Object.keys(updatedData).length === 0) {
          return;
        }

        console.log("check updatedData:", {
          userId,
          ...updatedData,
        });

        // @ts-expect-error Không cần check kỹ lưỡng kiểu dữ liệu ở đây
        const response = await updateRecruiter({
          userId,
          ...updatedData,
        });

        if (response.error) {
          throw new Error("Cập nhật thông tin thất bại. Vui lòng thử lại sau.");
        }

        // Update Redux state
        if (response.data?.data) {
          dispatch(setUser({ user: response.data.data as User }));
        }

        toast.success("Cập nhật thông tin thành công!");
      } catch (error) {
        console.error("Failed to update recruiter:", error);
        toast.error("Cập nhật thông tin thất bại. Vui lòng thử lại sau.");
      }
    },
    [updateRecruiter, dispatch]
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
    updatePassword,
    resetPassword,

    // Loading states
    isSigningIn,
    isSigningUp: isApplicantSigningUp || isRecruiterSigningUp,
    isSigningOut,
    isVerifying,
    isResending,
    isUpdatingPassword,

    // Update applicant
    handleUpdateApplicant,
    isUpdatingApplicant,

    // Update recruiter
    handleUpdateRecruiter,
    isUpdatingRecruiter
  };
}
