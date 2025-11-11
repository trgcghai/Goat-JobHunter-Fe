import { api } from "@/services/api";
import type {
  UploadSingleFileRequest,
  UploadSingleFileResponse,
} from "./uploadType";

export const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadSingleFile: builder.mutation<
      UploadSingleFileResponse,
      UploadSingleFileRequest
    >({
      query: ({ file, folderType }) => {
        const bodyFormData = new FormData();
        bodyFormData.append("file", file);
        bodyFormData.append("folder", folderType);
        return {
          url: "/files",
          method: "POST",
          data: bodyFormData,
        };
      },
    }),
  }),
});

export const { useUploadSingleFileMutation } = uploadApi;
