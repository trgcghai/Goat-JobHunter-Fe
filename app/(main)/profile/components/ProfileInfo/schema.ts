import { Gender } from "@/types/enum";
import z from "zod";

const recruiterSchema = z.object({
  fullName: z.string().min(1, "Họ tên không được để trống"),
  username: z.string().min(3, "Tên hiển thị phải có ít nhất 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  avatar: z.string().optional(),
  contactEmail: z
    .string()
    .email("Email liên hệ không hợp lệ")
    .optional()
    .or(z.literal("")),
  contactPhone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số")
    .optional()
    .or(z.literal("")),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  description: z
    .string()
    .min(10, "Mô tả phải có ít nhất 10 ký tự")
    .optional()
    .or(z.literal("")),
});

// Applicant Schema
const applicantSchema = z.object({
  fullName: z.string().min(1, "Họ tên không được để trống"),
  username: z.string().min(3, "Tên hiển thị phải có ít nhất 3 ký tự"),
  dob: z.instanceof(Date, { message: "Ngày sinh không hợp lệ" }),
  gender: z.enum(Gender),
  avatar: z.string().optional(),
  email: z.string().email("Email không hợp lệ"),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số")
    .optional()
    .or(z.literal("")),
});

type RecruiterFormData = z.infer<typeof recruiterSchema>;
type ApplicantFormData = z.infer<typeof applicantSchema>;

export { applicantSchema, recruiterSchema };
export type { ApplicantFormData, RecruiterFormData };
