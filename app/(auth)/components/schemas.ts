import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .nonempty("Email không được để trống")
    .email("Email không hợp lệ"),
  password: z.string().nonempty("Password không được để trống"),
});

export type TSignInSchema = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email không được để trống")
      .email("Email không hợp lệ"),
    password: z.string().nonempty("Password không được để trống"),
    confirmPassword: z
      .string()
      .nonempty("Xác nhận mật khẩu không được để trống"),
    type: z
      .enum(["applicant", "recruiter"], {
        error: "Vui lòng chọn loại tài khoản hợp lệ",
      })
      .nonoptional("Loại tài khoản không được để trống"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu và xác nhận mật khẩu không khớp",
  });

export type TSignUpSchema = z.infer<typeof SignUpSchema>;

export enum SignUpType {
  APPLICANT = "applicant",
  RECRUITER = "recruiter",
}

export const SignUpTypeOptions = [
  { label: "Ứng viên", value: SignUpType.APPLICANT },
  { label: "Nhà tuyển dụng", value: SignUpType.RECRUITER },
];
