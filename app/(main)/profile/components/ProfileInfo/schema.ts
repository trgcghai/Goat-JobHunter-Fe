import { Education, Gender, Level } from "@/types/enum";
import z from "zod";

const applicantSchema = z.object({
  fullName: z.string().min(1, "Họ tên không được để trống"),
  username: z.string().min(3, "Tên hiển thị phải có ít nhất 3 ký tự"),
  dob: z.instanceof(Date, { message: "Ngày sinh không hợp lệ" }),
  gender: z.enum(Gender).optional(),
  email: z.string().email("Email không hợp lệ"),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số")
    .optional()
    .or(z.literal("")),
  address: z.string().min(1, "Địa chỉ không được để trống").optional().or(z.literal("")),
  education: z.enum(Education).optional(),
  level: z.enum(Level).optional(),
});

type ApplicantFormData = z.infer<typeof applicantSchema>;

export { applicantSchema };
export type { ApplicantFormData };
