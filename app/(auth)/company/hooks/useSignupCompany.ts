import { useUser } from '@/hooks/useUser';
import { useUploadSingleFileMutation } from '@/services/upload/uploadApi';
import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { toast } from 'sonner';
import { TCompanySignUpSchema } from '../../components/schemas';
import { useRouter } from 'next/navigation';

interface UseSignupCompanyReturn {
  setValue: UseFormSetValue<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    description: string;
    logo: string;
    coverPhoto: string;
    phone: string;
    size: 'STARTUP' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE';
    country: string;
    industry: string;
    workingDays: string;
    overtimePolicy: string;
    addresses: {
      province: string;
      fullAddress: string;
    }[];
    website?: string;
  }>;
}

export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const ACCEPTED_IMAGE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
};

const useSignupCompany = ({ setValue }: UseSignupCompanyReturn) => {
  const router = useRouter();
  const [uploadFile, { isLoading: isUploadingFile }] = useUploadSingleFileMutation();

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);

  const { companySignUp } = useUser();

  const isSubmitting = isUploadingFile;

  const handleLogoDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`Kích thước ảnh không được vượt quá ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        return;
      }

      setLogoFile(file);
      setValue('logo', 'pending-upload', { shouldValidate: true });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`Kích thước ảnh không được vượt quá ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        return;
      }

      setCoverPhotoFile(file);
      setValue('coverPhoto', 'pending-upload', { shouldValidate: true });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    setValue('logo', '');
  };

  const handleRemoveCoverPhoto = () => {
    setCoverPhotoFile(null);
    setCoverPhotoPreview(null);
    setValue('coverPhoto', '');
  };

  const handleError = (error: Error) => {
    if (error.message.includes('File type must be one of')) {
      toast.error('Định dạng ảnh không hợp lệ');
      return;
    }

    if (error.message.includes('File is larger than')) {
      toast.error(`Kích thước ảnh không được vượt quá ${MAX_FILE_SIZE / 1024 / 1024}MB`);
      return;
    }

    console.error('Dropzone error:', error);
    toast.error('Lỗi khi chọn ảnh. Vui lòng thử lại.');
  };

  const handleSubmit = async (data: TCompanySignUpSchema) => {
    try {
      if (!logoFile || !coverPhotoFile) {
        toast.error('Vui lòng chọn cả logo và ảnh bìa cho công ty');
        return;
      }

      const uploadLogo = toast.loading('Đang tải ảnh lên...', {
        duration: 2000,
      });
      try {
        const uploadResponse = await uploadFile({
          file: logoFile,
          folderType: 'company-logos',
        }).unwrap();

        if (uploadResponse?.data?.url) {
          data.logo = uploadResponse.data.url;
          toast.success('Tải logo lên thành công!', { id: uploadLogo });
        }
      } catch (error) {
        console.error('Error uploading logo:', error);
        toast.error('Không thể tải logo lên', { id: uploadLogo, duration: 2000 });
        return;
      }

      const uploadCoverPhoto = toast.loading('Đang tải ảnh lên...', {
        duration: 2000,
      });
      try {
        const uploadResponse = await uploadFile({
          file: coverPhotoFile,
          folderType: 'company-covers',
        }).unwrap();

        if (uploadResponse?.data?.url) {
          data.coverPhoto = uploadResponse.data.url;
          toast.success('Tải ảnh bìa lên thành công!', { id: uploadCoverPhoto });
        }
      } catch (error) {
        console.error('Error uploading cover photo:', error);
        toast.error('Không thể tải ảnh bìa lên', { id: uploadCoverPhoto });
        return;
      }

      const result = await companySignUp(data);

      if (result.success) {
        router.push('/otp?email=' + encodeURIComponent(data.email));
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau');
    }
  };

  return {
    logoFile,
    coverPhotoFile,
    logoPreview,
    coverPhotoPreview,

    isUploadingFile,
    isSubmitting,

    handleLogoDrop,
    handleCoverPhotoDrop,
    handleRemoveLogo,
    handleRemoveCoverPhoto,
    handleError,
    handleSubmit,
  };
};

export default useSignupCompany;
