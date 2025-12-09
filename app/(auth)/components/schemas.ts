import { z } from "zod";

const MIN_LENGTH = 8;
const RE_LOWER = /[a-z]/;
const RE_UPPER = /[A-Z]/;
const RE_NUMBER = /\d/;
const RE_SPECIAL = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export const isPasswordStrong = (pwd: string | undefined): boolean => {
  if (!pwd) return false;
  return (
    pwd.length >= MIN_LENGTH &&
    RE_LOWER.test(pwd) &&
    RE_UPPER.test(pwd) &&
    RE_NUMBER.test(pwd) &&
    RE_SPECIAL.test(pwd)
  );
};

export const getPasswordChecks = (pwd: string | undefined) => ({
  minLength: Boolean(pwd && pwd.length >= MIN_LENGTH),
  lowercase: Boolean(pwd && RE_LOWER.test(pwd)),
  uppercase: Boolean(pwd && RE_UPPER.test(pwd)),
  number: Boolean(pwd && RE_NUMBER.test(pwd)),
  special: Boolean(pwd && RE_SPECIAL.test(pwd)),
});

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
  .refine((data) => isPasswordStrong(data.password), {
    message:
      "Mật khẩu phải có ít nhất 8 ký tự, chữ hoa, chữ thường, số và ký tự đặc biệt",
    path: ["password"],
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
  .refine((data) => isPasswordStrong(data.password), {
    message:
      "Mật khẩu phải có ít nhất 8 ký tự, chữ hoa, chữ thường, số và ký tự đặc biệt",
    path: ["password"],
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
