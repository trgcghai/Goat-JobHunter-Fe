import { z } from "zod";

export const blogSchema = z
  .object({
    title: z
      .string()
      .max(255, "Tiêu đề không được vượt quá 255 ký tự")
      .min(10, "Tiêu đề phải có ít nhất 10 ký tự"),
    description: z
      .string()
      .min(50, "Mô tả phải có ít nhất 50 ký tự")
      .optional()
      .or(z.literal("")),
    content: z
      .string()
      .min(1, "Nội dung không được để trống")
      .min(100, "Nội dung phải có ít nhất 100 ký tự"),
    tags: z
      .array(z
        .string()
        .min(2, "Độ dài thẻ tối đa 2 ký tự")
        .max(255, "Độ dài thẻ đối đa 255 ký tự")
      )
      .min(1, "Phải chọn ít nhất 1 thẻ")
      .max(10, "Chỉ được chọn tối đa 10 thẻ")
      .optional()
      .or(z.array(z.string()).length(0)),
    draft: z
      .boolean("Trạng thái bản nháp không hợp lệ")
  });

export type BlogFormData = z.infer<typeof blogSchema>;
