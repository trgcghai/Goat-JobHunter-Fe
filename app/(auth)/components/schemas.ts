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

export const SignInSchema = z.object({
  email: z
    .string()
    .nonempty("Email không được để trống")
    .email("Email không hợp lệ"),
  password: z.string().nonempty("Password không được để trống"),
});

export type TSignInSchema = z.infer<typeof SignInSchema>;

export const UserSignUpSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email không được để trống")
      .email("Email không hợp lệ"),
    fullName: z.string().nonempty("Họ tên không được để trống"),
    username: z.string().nonempty("Tên hiển thị không được để trống"),
    phone: z
      .string()
      .regex(/^\d{10}$/, "Số điện thoại không hợp lệ"),
    password: z.string().nonempty("Mật khẩu không được để trống"),
    confirmPassword: z
      .string()
      .nonempty("Xác nhận mật khẩu không được để trống"),
    type: z.enum(["applicant", "recruiter"]),
  })
  .refine((data) => isPasswordStrong(data.password), {
    message:
      "Mật khẩu phải có ít nhất 8 ký tự, chữ hoa, chữ thường, số và ký tự đặc biệt",
    path: ["password"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu và xác nhận mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type TUserSignUpSchema = z.infer<typeof UserSignUpSchema>;

export enum SignUpType {
  APPLICANT = "applicant",
  RECRUITER = "recruiter",
}

export const SignUpTypeOptions = [
  { label: "Ứng viên", value: SignUpType.APPLICANT },
  { label: "Nhà tuyển dụng", value: SignUpType.RECRUITER },
];