import { api } from "@/services/api";
import { IBackendRes } from "@/types/api";

export const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadSingleFile: builder.mutation<
      IBackendRes<{ publicId: string; url: string }>,
      { file: File; folderType: string }
    >({
      query: ({ file, folderType }) => {
        const bodyFormData = new FormData();
        bodyFormData.append("file", file);
        bodyFormData.append("folder", folderType);
        return {
          url: "/api/v1/files",
          method: "POST",
          data: bodyFormData,
        };
      },
    }),
  }),
});

export const { useUploadSingleFileMutation } = uploadApi;
