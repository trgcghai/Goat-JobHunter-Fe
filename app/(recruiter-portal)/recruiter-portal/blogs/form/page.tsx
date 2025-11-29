"use client";

import BlogForm from "@/app/(recruiter-portal)/recruiter-portal/blogs/form/components/BlogForm";
import {
  BlogFormData,
  blogSchema
} from "@/app/(recruiter-portal)/recruiter-portal/blogs/form/components/schema";
import LoaderSpin from "@/components/LoaderSpin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useBlogActions from "@/hooks/useBlogActions";
import {
  useFetchBlogByIdQuery,
} from "@/services/blog/blogApi";
import { useUploadSingleFileMutation } from "@/services/upload/uploadApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function BlogFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("blogId");

  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { handleCreateBlog, handleUpdateBlog, isCreating, isUpdating } =
    useBlogActions();

  const [uploadFile, { isLoading: isUploading }] =
    useUploadSingleFileMutation();

  const {
    data: blogData,
    isLoading: isLoadingBlog,
    isError
  } = useFetchBlogByIdQuery(blogId!, {
    skip: !blogId
  });

  const blog = useMemo(() => blogData?.data, [blogData]);

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      tags: [],
      draft: false
    }
  });

  useEffect(() => {
    if (blog) {
      form.setValue("title", blog.title);
      form.setValue("description", blog.description);
      form.setValue("content", blog.content);
      form.setValue("tags", blog.tags);
      form.setValue("draft", blog.draft || false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBannerUrl(blog.banner || "");
    }
  }, [form, blog]);

  const handleUploadBanner = async (): Promise<string> => {
    if (!selectedFile) return bannerUrl;

    try {
      const response = await uploadFile({
        file: selectedFile,
        folderType: "blogs",
      }).unwrap();

      if (response.data?.url) {
        const uploadedUrl = response.data.url;
        setBannerUrl(uploadedUrl);
        setSelectedFile(null);
        return uploadedUrl;
      }

      return bannerUrl;
    } catch (error) {
      console.error("Failed to upload banner:", error);
      toast.error("Không thể tải ảnh lên. Vui lòng thử lại.");
      throw error;
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    try {
      let finalBannerUrl = bannerUrl;

      // Upload banner if file is selected
      if (selectedFile) {
        finalBannerUrl = await handleUploadBanner();
      }

      const blogData = {
        ...data,
        banner: finalBannerUrl,
      };

      if (blog) {
        await handleUpdateBlog(Number(blogId), blogData);
        toast.success("Cập nhật bài viết thành công");
      } else {
        await handleCreateBlog(blogData);
        toast.success("Tạo bài viết thành công");
      }

      router.push("/recruiter-portal/blogs");
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  if (isLoadingBlog) {
    return <LoaderSpin />;
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <Link href="/recruiter-portal/blogs">
          <Button variant="link" className="rounded-xl p-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </Link>
        <Card className="p-6">
          <div className="text-center">
            <p className="text-lg font-medium text-destructive">
              Không tìm thấy bài viết
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Bài viết không tồn tại hoặc đã bị xóa
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <Link href="/recruiter-portal/blogs">
          <Button variant="link" className="rounded-xl mb-4 p-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {blog ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {blog
            ? "Cập nhật thông tin bài viết"
            : "Điền thông tin để đăng bài viết mới"}
        </p>
      </div>

      <BlogForm
        form={form}
        onSubmit={onSubmit}
        isCreating={isCreating}
        isUpdating={isUpdating}
        isEditMode={!!blog}
        bannerUrl={bannerUrl}
        onBannerChange={setBannerUrl}
        onFileSelect={setSelectedFile}
        isUploading={isUploading}
      />
    </div>
  );
}