import * as z from "zod";

const recruiterSchema = z.object({
  fullName: z.string().min(1, "Họ tên không được để trống"),
  username: z.string().min(3, "Tên hiển thị phải có ít nhất 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số"),
  address: z.string().min(1, "Địa chỉ không được để trống").optional().or(z.literal("")),
  description: z
    .string()
    .min(10, "Mô tả phải có ít nhất 10 ký tự")
    .optional()
    .or(z.literal("")),
  website: z.string().url("URL không hợp lệ").optional().or(z.literal(""))
});

type RecruiterFormData = z.infer<typeof recruiterSchema>;

export { recruiterSchema };
export type { RecruiterFormData };