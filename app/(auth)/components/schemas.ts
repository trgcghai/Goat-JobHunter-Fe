import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .nonempty("Email không được để trống")
    .email("Email không hợp lệ"),
  password: z.string().nonempty("Password không được để trống"),
});

export type TSignInSchema = z.infer<typeof SignInSchema>;

export const ApplicantSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email không được để trống")
      .email("Email không hợp lệ"),
    password: z.string().nonempty("Password không được để trống"),
    confirmPassword: z
      .string()
      .nonempty("Xác nhận mật khẩu không được để trống"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu và xác nhận mật khẩu không khớp",
  });

export type TApplicantSchema = z.infer<typeof ApplicantSchema>;

export const RecruiterSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email không được để trống")
      .email("Email không hợp lệ"),
    fullName: z.string().nonempty("Họ và tên không được để trống"),
    username: z.string().nonempty("Tên người dùng không được để trống"),
    phone: z
      .string()
      .nonempty("Số điện thoại không được để trống")
      .regex(/^\d{10}$/, "Số điện thoại không hợp lệ"),
    address: z.string().nonempty("Địa chỉ không được để trống"),
    password: z.string().nonempty("Password không được để trống"),
    confirmPassword: z
      .string()
      .nonempty("Xác nhận mật khẩu không được để trống"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu và xác nhận mật khẩu không khớp",
  });

export type TRecruiterSchema = z.infer<typeof RecruiterSchema>;

export enum SignUpType {
  APPLICANT = "applicant",
  RECRUITER = "recruiter",
}

export const SignUpTypeOptions = [
  { label: "Ứng viên", value: SignUpType.APPLICANT },
  { label: "Nhà tuyển dụng", value: SignUpType.RECRUITER },
];
