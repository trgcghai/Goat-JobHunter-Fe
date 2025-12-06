"use client";

import { BlogFormData } from "@/app/(recruiter-portal)/recruiter-portal/blogs/form/components/schema";
import BannerUpload from "@/app/(recruiter-portal)/recruiter-portal/blogs/form/components/BannerUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import RichTextEditor from "@/components/RichText/Editor";
import React, { useState } from "react";
import { toast } from "sonner";
import { useGenerateDescriptionMutation, useGenerateTagsMutation } from "@/services/api";

interface BlogFormProps {
  form: UseFormReturn<BlogFormData>;
  onSubmit: (data: BlogFormData) => void;
  isCreating: boolean;
  isUpdating: boolean;
  isEditMode: boolean;
  bannerUrl: string;
  onBannerChange: (url: string) => void;
  onFileSelect: (file: File | null) => void;
  isUploading: boolean;
}

const MAX_AI_CALLS = 3;

const BlogForm = ({
  form,
  onSubmit,
  isCreating,
  isUpdating,
  isEditMode,
  bannerUrl,
  onBannerChange,
  onFileSelect,
  isUploading
}: BlogFormProps) => {
  const isSubmitting = isCreating || isUpdating || isUploading;

  const [descriptionCalls, setDescriptionCalls] = useState(0);
  const [tagsCalls, setTagsCalls] = useState(0);

  const [generateDescription, { isLoading: isGeneratingDescription }] = useGenerateDescriptionMutation();
  const [generateTags, { isLoading: isGeneratingTags }] = useGenerateTagsMutation();

  const handleGenerateDescription = async () => {
    const content = form.getValues("content");

    if (!content || content.trim().length < 50) {
      toast.error("Vui lòng nhập nội dung bài viết trước (tối thiểu 50 ký tự)");
      return;
    }

    if (descriptionCalls >= MAX_AI_CALLS) {
      toast.error(`Bạn đã sử dụng hết ${MAX_AI_CALLS} lần tạo mô tả AI`);
      return;
    }

    try {
      const result = await generateDescription(content).unwrap();
      if (result) {
        form.setValue("description", result);
        setDescriptionCalls(prev => prev + 1);
        toast.success("Tạo mô tả AI thành công");
      }
    } catch (error) {
      toast.error("Không thể tạo mô tả AI. Vui lòng thử lại.");
      console.error(error);
    }
  };

  const handleGenerateTags = async () => {
    const content = form.getValues("content");

    if (!content || content.trim().length < 50) {
      toast.error("Vui lòng nhập nội dung bài viết trước (tối thiểu 50 ký tự)");
      return;
    }

    if (tagsCalls >= MAX_AI_CALLS) {
      toast.error(`Bạn đã sử dụng hết ${MAX_AI_CALLS} lần tạo thẻ AI`);
      return;
    }

    try {
      const result = await generateTags(content).unwrap();
      if (result.data && Array.isArray(result.data)) {
        form.setValue("tags", result.data);
        setTagsCalls(prev => prev + 1);
        toast.success("Tạo thẻ AI thành công");
      }
    } catch (error) {
      toast.error("Không thể tạo thẻ AI. Vui lòng thử lại.");
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Banner bài viết</CardTitle>
          </CardHeader>
          <CardContent>
            <BannerUpload
              value={bannerUrl}
              onChange={onBannerChange}
              onFileSelect={onFileSelect}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Banner là không bắt buộc
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Tiêu đề bài viết</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="VD: 5 xu hướng công nghệ nổi bật năm 2024"
                      className="rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Tối thiểu 10 ký tự</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Nội dung bài viết</FormLabel>
                  <FormControl>
                    <RichTextEditor {...field} value={field.value!} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>Tối thiểu 50 ký tự</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Mô tả ngắn</FormLabel>
                    <Button
                      type="button"
                      size="sm"
                      className="rounded-xl"
                      onClick={handleGenerateDescription}
                      disabled={isGeneratingDescription || descriptionCalls >= MAX_AI_CALLS}
                    >
                      {isGeneratingDescription ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      Tạo AI ({descriptionCalls}/{MAX_AI_CALLS})
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Tóm tắt nội dung bài viết..."
                      className="rounded-xl min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Không bắt buộc. Nếu bỏ trống, hệ thống sẽ tự động tạo mô tả.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Thẻ (Tags)</FormLabel>
                    <Button
                      type="button"
                      size="sm"
                      className="rounded-xl"
                      onClick={handleGenerateTags}
                      disabled={isGeneratingTags || tagsCalls >= MAX_AI_CALLS}
                    >
                      {isGeneratingTags ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      Tạo AI ({tagsCalls}/{MAX_AI_CALLS})
                    </Button>
                  </div>
                  <FormControl>
                    <MultipleSelector
                      options={[]}
                      value={field.value?.map((tag) => ({
                        label: tag,
                        value: tag
                      })) || []}
                      onChange={(selectedOptions: Option[]) => {
                        field.onChange(selectedOptions.map((opt) => opt.value));
                      }}
                      placeholder="Nhập tên thẻ..."
                      emptyIndicator={
                        <p className="text-center text-sm text-muted-foreground py-2">
                          Nhập ít nhất 3 ký tự để tạo thẻ
                        </p>
                      }
                      className="rounded-xl"
                      hidePlaceholderWhenSelected
                      maxSelected={10}
                      onMaxSelected={(maxLimit) => {
                        toast.info(`Chỉ có thể chọn tối đa ${maxLimit} thẻ`);
                      }}
                      creatable={true}
                    />
                  </FormControl>
                  <FormDescription>
                    Không bắt buộc. Nếu bỏ trống, hệ thống sẽ tự động tạo thẻ.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="draft"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel required>Trạng thái</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === "true")}
                      value={field.value ? "true" : "false"}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Công khai - <span
                          className="text-muted-foreground">Bài viết sẽ được hiển thị ngay lập tức</span>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Bản nháp - <span className="text-muted-foreground">Chỉ bạn có thể xem</span>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            disabled={isSubmitting}
            onClick={() => {
              form.reset();
              form.clearErrors();
            }}
          >
            Hủy
          </Button>
          <Button
            type="submit"
            className="rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                {isEditMode ? "Đang cập nhật..." : "Đang tạo..."}
              </>
            ) : isEditMode ? (
              "Cập nhật bài viết"
            ) : (
              "Tạo bài viết"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BlogForm;