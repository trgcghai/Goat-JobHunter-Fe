import * as z from "zod";

export const acceptSchema = z.object({
  interviewAt: z.string().min(1, "Vui lòng chọn thời gian phỏng vấn"),
  location: z.string().min(1, "Vui lòng nhập địa điểm phỏng vấn"),
  notes: z.string().optional(),
});

export const rejectSchema = z.object({
  reason: z.string().min(10, "Lý do từ chối phải có ít nhất 10 ký tự"),
});

export type AcceptFormData = z.infer<typeof acceptSchema>;
export type RejectFormData = z.infer<typeof rejectSchema>;
