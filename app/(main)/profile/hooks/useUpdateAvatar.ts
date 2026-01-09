import { useUser } from "@/hooks/useUser";
import { useUploadSingleFileMutation } from "@/services/upload/uploadApi";
import { useState } from "react";
import { toast } from "sonner";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"]
};

const useUpdateAvatar = (type: "applicant" | "recruiter") => {
  const [uploadFile, { isLoading: isUploadingFile }] =
    useUploadSingleFileMutation();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { user, handleUpdateApplicant, isUpdatingApplicant, handleUpdateRecruiter, isUpdatingRecruiter } = useUser();

  const isSubmitting = isUploadingFile || isUpdatingApplicant || isUpdatingRecruiter;

  const handleImageDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          `Kích thước ảnh không được vượt quá ${MAX_FILE_SIZE / 1024 / 1024}MB`
        );
        return;
      }

      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedImage) {
        toast.error("Vui lòng chọn ảnh");
        return;
      }

      // Step 1: Upload image
      const upload = toast.loading("Đang tải ảnh lên...", {
        duration: 2000
      });

      let avatarUrl: string;
      try {
        const uploadResponse = await uploadFile({
          file: selectedImage,
          folderType: "avatars"
        }).unwrap();

        if (!uploadResponse?.data?.url) {
          throw new Error("Invalid upload response");
        }

        avatarUrl = uploadResponse.data.url;
        toast.success("Tải ảnh lên thành công!", {
          id: upload,
          duration: 2000
        });

      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        toast.error("Không thể tải ảnh lên. Vui lòng thử lại", {
          id: upload,
          duration: 3000
        });
        return;
      }

      // Step 2: Update user avatar
      const loading = toast.loading("Đang cập nhật ảnh đại diện...", {
        duration: 2000
      });

      try {
        if (!user?.accountId) {
          throw new Error("User ID is missing");
        }

        if (type == "applicant") {
          await handleUpdateApplicant(user.accountId, {
            avatar: avatarUrl
          });
        } else {
          await handleUpdateRecruiter(user.accountId, {
            avatar: avatarUrl
          });
        }

        toast.success("Cập nhật ảnh đại diện thành công!", {
          id: loading,
          duration: 2000
        });

        handleRemoveImage();
      } catch (updateError) {
        console.error("Error updating avatar:", updateError);
        toast.error("Không thể cập nhật ảnh đại diện. Vui lòng thử lại sau", {
          id: loading,
          duration: 2000
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau");
    }
  };

  const handleError = (error: Error) => {
    if (error.message.includes("File type must be one of")) {
      toast.error("Định dạng ảnh không hợp lệ");
      return;
    }

    if (error.message.includes("File is larger than")) {
      toast.error(
        `Kích thước ảnh không được vượt quá ${MAX_FILE_SIZE / 1024 / 1024}MB`
      );
      return;
    }

    console.error("Dropzone error:", error);
    toast.error("Lỗi khi chọn ảnh. Vui lòng thử lại.");
  };

  return {
    selectedImage,
    previewUrl,
    isSubmitting,
    isUploadingFile,
    handleImageDrop,
    handleRemoveImage,
    handleSubmit,
    handleError
  };
};

export default useUpdateAvatar;
