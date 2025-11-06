import type { IBackendRes } from "@/types/api";

// Upload Single File
export type UploadSingleFileRequest = {
  file: File;
  folderType: string;
};

export type UploadSingleFileResponse = IBackendRes<{
  publicId: string;
  url: string;
}>;
