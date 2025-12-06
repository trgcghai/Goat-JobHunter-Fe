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
import React, { useEffect, useState } from "react";
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

const COOLDOWN_DURATION = 60; // seconds
const DESCRIPTION_KEY = "blog_description_cooldown";
const TAGS_KEY = "blog_tags_cooldown";

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

  const [descriptionCooldown, setDescriptionCooldown] = useState(0);
  const [tagsCooldown, setTagsCooldown] = useState(0);

  const [generateDescription, { isLoading: isGeneratingDescription }] = useGenerateDescriptionMutation();
  const [generateTags, { isLoading: isGeneratingTags }] = useGenerateTagsMutation();

  // Check cooldown on mount and set up intervals
  useEffect(() => {
    const checkCooldown = (key: string, setCooldown: (value: number) => void) => {
      const storedTime = localStorage.getItem(key);
      if (storedTime) {
        const elapsed = Math.floor((Date.now() - parseInt(storedTime)) / 1000);
        const remaining = COOLDOWN_DURATION - elapsed;
        if (remaining > 0) {
          setCooldown(remaining);
        } else {
          localStorage.removeItem(key);
        }
      }
    };

    checkCooldown(DESCRIPTION_KEY, setDescriptionCooldown);
    checkCooldown(TAGS_KEY, setTagsCooldown);
  }, []);

  // Countdown timer for description
  useEffect(() => {
    if (descriptionCooldown <= 0) return;

    const timer = setInterval(() => {
      setDescriptionCooldown((prev) => {
        const newValue = prev - 1;
        if (newValue <= 0) {
          localStorage.removeItem(DESCRIPTION_KEY);
          return 0;
        }
        return newValue;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [descriptionCooldown]);

  // Countdown timer for tags
  useEffect(() => {
    if (tagsCooldown <= 0) return;

    const timer = setInterval(() => {
      setTagsCooldown((prev) => {
        const newValue = prev - 1;
        if (newValue <= 0) {
          localStorage.removeItem(TAGS_KEY);
          return 0;
        }
        return newValue;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [tagsCooldown]);

  const handleGenerateDescription = async () => {
    const content = form.getValues("content");

    if (!content || content.trim().length < 50) {
      toast.error("Vui lòng nhập nội dung bài viết trước (tối thiểu 50 ký tự)");
      return;
    }

    if (descriptionCooldown > 0) {
      toast.error(`Vui lòng đợi ${descriptionCooldown}s trước khi tạo lại`);
      return;
    }

    try {
      const result = await generateDescription(content).unwrap();
      if (result) {
        form.setValue("description", result);
        toast.success("Tạo mô tả AI thành công");

        // Set cooldown
        localStorage.setItem(DESCRIPTION_KEY, Date.now().toString());
        setDescriptionCooldown(COOLDOWN_DURATION);
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

    if (tagsCooldown > 0) {
      toast.error(`Vui lòng đợi ${tagsCooldown}s trước khi tạo lại`);
      return;
    }

    try {
      const result = await generateTags(content).unwrap();
      if (result.data && Array.isArray(result.data)) {
        form.setValue("tags", result.data);
        toast.success("Tạo thẻ AI thành công");

        // Set cooldown
        localStorage.setItem(TAGS_KEY, Date.now().toString());
        setTagsCooldown(COOLDOWN_DURATION);
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
                      disabled={isGeneratingDescription || descriptionCooldown > 0}
                    >
                      {isGeneratingDescription ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      {descriptionCooldown > 0
                        ? `Đợi ${descriptionCooldown}s`
                        : "Tạo AI"}
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
                      disabled={isGeneratingTags || tagsCooldown > 0}
                    >
                      {isGeneratingTags ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      {tagsCooldown > 0
                        ? `Đợi ${tagsCooldown}s`
                        : "Tạo AI"}
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