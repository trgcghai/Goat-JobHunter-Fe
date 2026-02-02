import { useUser } from '@/hooks/useUser';
import {
  useCreateResumeMutation,
  useDefaultResumeMutation,
  useDeleteResumeMutation,
  useDownloadResumeMutation,
  usePrivateResumeMutation,
  usePublicResumeMutation,
  useUnDefaultResumeMutation,
  useUpdateTitleMutation,
} from '@/services/resume/resumeApi';
import { useFetchResumesByCurrentUserQuery } from '@/services/user/userApi';
import { Resume } from '@/types/model';
import { useCallback } from 'react';
import { toast } from 'sonner';

export const useResumeAction = () => {
  const { user, isSignedIn } = useUser();

  const {
    data: resumesData,
    isLoading: isFetchingResumes,
    refetch: refetchResumes,
  } = useFetchResumesByCurrentUserQuery(
    {
      page: 0,
      size: 100,
    },
    {
      skip: !isSignedIn,
    },
  );

  const [createResume, { isLoading: isCreating }] = useCreateResumeMutation();
  const [deleteResume, { isLoading: isDeleting }] = useDeleteResumeMutation();
  const [updateTitle, { isLoading: isUpdatingTitle }] = useUpdateTitleMutation();
  const [defaultResume, { isLoading: isSettingDefault }] = useDefaultResumeMutation();
  const [unDefaultResume, { isLoading: isUnsettingDefault }] = useUnDefaultResumeMutation();
  const [publicResume, { isLoading: isSettingPublic }] = usePublicResumeMutation();
  const [privateResume, { isLoading: isSettingPrivate }] = usePrivateResumeMutation();
  const [downloadResume, { isLoading: isDownloading }] = useDownloadResumeMutation();

  const handleCreateResume = useCallback(
    async (formData: FormData) => {
      try {
        if (!isSignedIn || !user) {
          toast.error('Bạn phải đăng nhập để thực hiện chức năng này.');
          return;
        }

        const response = await createResume(formData).unwrap();

        if (response.data) {
          toast.success('Tải lên CV thành công!');
          await refetchResumes();
          return response.data;
        }
      } catch (error) {
        console.error('Failed to create resume:', error);
        toast.error('Không thể tải lên CV. Vui lòng thử lại sau.');
        throw error;
      }
    },
    [createResume, user, isSignedIn, refetchResumes],
  );

  const handleDeleteResume = useCallback(
    async (resumeId: string) => {
      try {
        if (!isSignedIn || !user) {
          toast.error('Bạn phải đăng nhập để thực hiện chức năng này.');
          return;
        }

        await deleteResume({ resumeId }).unwrap();
        toast.success('Xóa CV thành công!');
        await refetchResumes();
        return true;
      } catch (error) {
        console.error('Failed to delete resume:', error);
        toast.error('Không thể xóa CV. Vui lòng thử lại sau.');
        throw error;
      }
    },
    [deleteResume, user, isSignedIn, refetchResumes],
  );

  const handleUpdateTitle = useCallback(
    async (resumeId: number, title: string) => {
      try {
        if (!isSignedIn || !user) {
          toast.error('Bạn phải đăng nhập để thực hiện chức năng này.');
          return;
        }

        const response = await updateTitle({ resumeId, title }).unwrap();

        if (response.data) {
          toast.success('Cập nhật tiêu đề CV thành công!');
          await refetchResumes();
          return response.data;
        }
      } catch (error) {
        console.error('Failed to update resume title:', error);
        toast.error('Không thể cập nhật tiêu đề CV. Vui lòng thử lại sau.');
        throw error;
      }
    },
    [updateTitle, user, isSignedIn, refetchResumes],
  );

  const handleSetDefaultResume = useCallback(
    async (resumeId: string) => {
      try {
        if (!isSignedIn || !user) {
          toast.error('Bạn phải đăng nhập để thực hiện chức năng này.');
          return;
        }

        const response = await defaultResume({ resumeId }).unwrap();

        if (response.data) {
          toast.success('Đã đặt CV làm mặc định!');
          await refetchResumes();
          return response.data;
        }
      } catch (error) {
        console.error('Failed to set default resume:', error);
        toast.error('Không thể đặt CV làm mặc định. Vui lòng thử lại sau.');
        throw error;
      }
    },
    [defaultResume, user, isSignedIn, refetchResumes],
  );

  const handleUnsetDefaultResume = useCallback(
    async (resumeId: string) => {
      try {
        if (!isSignedIn || !user) {
          toast.error('Bạn phải đăng nhập để thực hiện chức năng này.');
          return;
        }

        const response = await unDefaultResume({ resumeId }).unwrap();

        if (response.data) {
          toast.success('Đã bỏ đặt CV mặc định!');
          await refetchResumes();
          return response.data;
        }
      } catch (error) {
        console.error('Failed to unset default resume:', error);
        toast.error('Không thể bỏ đặt CV mặc định. Vui lòng thử lại sau.');
        throw error;
      }
    },
    [unDefaultResume, user, isSignedIn, refetchResumes],
  );

  const handleToggleDefaultResume = useCallback(
    async (resumeId: string, isDefault: boolean) => {
      if (isDefault) {
        return handleUnsetDefaultResume(resumeId);
      } else {
        return handleSetDefaultResume(resumeId);
      }
    },
    [handleSetDefaultResume, handleUnsetDefaultResume],
  );

  const handleSetPublicResume = useCallback(
    async (resumeId: string) => {
      try {
        if (!isSignedIn || !user) {
          toast.error('Bạn phải đăng nhập để thực hiện chức năng này.');
          return;
        }

        const response = await publicResume({ resumeId }).unwrap();

        if (response.data) {
          toast.success('Đã công khai CV!');
          await refetchResumes();
          return response.data;
        }
      } catch (error) {
        console.error('Failed to set public resume:', error);
        toast.error('Không thể công khai CV. Vui lòng thử lại sau.');
        throw error;
      }
    },
    [publicResume, user, isSignedIn, refetchResumes],
  );

  const handleSetPrivateResume = useCallback(
    async (resumeId: string) => {
      try {
        if (!isSignedIn || !user) {
          toast.error('Bạn phải đăng nhập để thực hiện chức năng này.');
          return;
        }

        const response = await privateResume({ resumeId }).unwrap();

        if (response.data) {
          toast.success('Đã ẩn CV!');
          await refetchResumes();
          return response.data;
        }
      } catch (error) {
        console.error('Failed to set private resume:', error);
        toast.error('Không thể ẩn CV. Vui lòng thử lại sau.');
        throw error;
      }
    },
    [privateResume, user, isSignedIn, refetchResumes],
  );

  const handleTogglePublicResume = useCallback(
    async (resumeId: string, isPublic: boolean) => {
      if (isPublic) {
        return handleSetPrivateResume(resumeId);
      } else {
        return handleSetPublicResume(resumeId);
      }
    },
    [handleSetPublicResume, handleSetPrivateResume],
  );

  const handleDownloadResume = useCallback(
    async (resumeId: string, fileName: string) => {
      try {
        const response = await downloadResume(resumeId).unwrap();

        let fileExtension = fileName.split('.').pop()?.toLowerCase();

        if (!fileExtension || fileExtension === fileName || fileExtension.length > 5) {
          fileExtension = 'pdf';
        }

        const mimeTypes: Record<string, string> = {
          pdf: 'application/pdf',
          doc: 'application/msword',
          docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          png: 'image/png',
          jpg: 'image/jpeg',
          jpeg: 'image/jpeg',
        };

        const mimeType = mimeTypes[fileExtension] || 'application/octet-stream';
        const blob = new Blob([response], { type: mimeType });

        const finalFileName = fileName.includes('.') ? fileName : `${fileName}.${fileExtension}`;

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = finalFileName;
        document.body.appendChild(a);
        a.click();

        a.remove();
        URL.revokeObjectURL(url);

        toast.success('Tải CV thành công');
      } catch (e) {
        console.error('Download error:', e);
        toast.error('Không thể tải CV');
      }
    },
    [downloadResume],
  );

  const getDefaultResume = useCallback((): Resume | undefined => {
    return resumesData?.data?.result?.find((resume) => resume.default);
  }, [resumesData]);

  const getPublicResumes = useCallback((): Resume[] => {
    return resumesData?.data?.result?.filter((resume) => resume.public) || [];
  }, [resumesData]);

  return {
    // Data
    resumes: resumesData?.data?.result || [],
    resumesMetadata: resumesData?.data?.meta,
    defaultResume: getDefaultResume(),
    publicResumes: getPublicResumes(),

    // Loading states
    isFetchingResumes,
    isCreating,
    isDeleting,
    isUpdatingTitle,
    isSettingDefault,
    isUnsettingDefault,
    isSettingPublic,
    isSettingPrivate,
    isDownloading,
    isProcessing:
      isCreating ||
      isDeleting ||
      isUpdatingTitle ||
      isSettingDefault ||
      isUnsettingDefault ||
      isSettingPublic ||
      isSettingPrivate ||
      isDownloading,

    // Actions
    handleCreateResume,
    handleDeleteResume,
    handleUpdateTitle,
    handleSetDefaultResume,
    handleUnsetDefaultResume,
    handleToggleDefaultResume,
    handleSetPublicResume,
    handleSetPrivateResume,
    handleTogglePublicResume,
    handleDownloadResume,
    refetchResumes,
  };
};
