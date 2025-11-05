import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .nonempty("Email không được để trống")
    .email("Email không hợp lệ"),
  password: z.string().nonempty("Password không được để trống"),
});

export type TSignInSchema = z.infer<typeof SignInSchema>;
