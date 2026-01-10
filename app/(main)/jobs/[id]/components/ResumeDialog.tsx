"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dropzone,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { useCreateApplicationMutation } from "@/services/application/applicationApi";
import { useUploadSingleFileMutation } from "@/services/upload/uploadApi";
import { Job } from "@/types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { capitalize, truncate } from "lodash";
import { FileText, Loader2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { IBackendError } from "@/types/api";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
};

const applicationSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  resumeFile: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File không được vượt quá 5MB",
    )
    .refine(
      (file) => Object.keys(ACCEPTED_FILE_TYPES).includes(file.type),
      "Chỉ chấp nhận file PDF hoặc Word",
    )
    .optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job;
  userEmail?: string;
  userId?: number;
}

export default function ResumeDialog({
  open,
  onOpenChange,
  job,
  userEmail,
  userId,
}: Readonly<ResumeDialogProps>) {
  const [createApplication, { isLoading: isCreatingApplication }] =
    useCreateApplicationMutation();
  const [uploadFile, { isLoading: isUploadingFile }] =
    useUploadSingleFileMutation();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      email: userEmail || "",
    },
  });

  const isSubmitting = isUploadingFile || isCreatingApplication;

  const handleFileDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      form.setValue("resumeFile", file);
      form.clearErrors("resumeFile");
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    form.setValue("resumeFile", undefined);
  };

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      // Validate file
      if (!data.resumeFile) {
        toast.error("Vui lòng tải lên CV của bạn");
        return;
      }

      // Validate user
      if (!userId) {
        toast.error("Vui lòng đăng nhập để ứng tuyển");
        return;
      }

      // Step 1: Upload file
      const uploadToast = toast.loading("Đang tải lên CV...");

      let resumeUrl: string;
      try {
        const uploadResponse = await uploadFile({
          file: data.resumeFile,
          folderType: "resumes",
        }).unwrap();

        resumeUrl = uploadResponse?.data?.url || "";
        toast.success("Tải lên CV thành công!", {
          id: uploadToast,
        });
      } catch (uploadError) {
        console.error("Error uploading file:", uploadError);
        toast.error("Không thể tải lên CV. Vui lòng thử lại", {
          id: uploadToast,
        });
        return;
      }

      // Step 2: Create application
      const applicationToast = toast.loading("Đang gửi đơn ứng tuyển...");

      try {
        await createApplication({
          email: data.email,
          resumeUrl,
          jobId: job.jobId.toString(),
          userId,
        }).unwrap();

        toast.success("Ứng tuyển thành công!", {
          id: applicationToast,
          duration: 5000,
        });

        // Reset form and close dialog
        onOpenChange(false);
        form.reset();
        setUploadedFile(null);
      } catch (applicationError) {
        console.error("Error creating application:", applicationError);

        if ((applicationError as IBackendError).data.message.includes("maximum of 3 applications")) {
          toast.error("Bạn đã đạt đến giới hạn 3 đơn ứng tuyển cho công việc này.", {
            id: applicationToast,
          });
          return;
        }

        toast.error("Không thể gửi đơn ứng tuyển. Vui lòng thử lại sau", {
          id: applicationToast,
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau");
    }
  };

  const handleCancel = () => {
    form.reset();
    setUploadedFile(null);
    onOpenChange(false);
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Ứng Tuyển Công Việc</DialogTitle>
          <DialogDescription>
            Tải lên CV của bạn để ứng tuyển vào vị trí{" "}
            <span className="font-semibold text-foreground">{job.title}</span>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email liên hệ</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="your@email.com"
                      disabled
                      className="rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resumeFile"
              render={() => (
                <FormItem>
                  <FormLabel>CV</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      {!uploadedFile ? (
                        <Dropzone
                          accept={ACCEPTED_FILE_TYPES}
                          maxFiles={1}
                          maxSize={MAX_FILE_SIZE}
                          onDrop={handleFileDrop}
                          onError={handleError}
                          disabled={isSubmitting}
                          className="rounded-xl"
                        >
                          <DropzoneEmptyState customCaption>
                            <div className="flex flex-col items-center gap-2">
                              <p className="text-sm font-medium text-foreground">
                                Kéo thả hoặc click để tải lên CV
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {Object.values(ACCEPTED_FILE_TYPES)
                                  .map((type) => type[0])
                                  .map((ext) => capitalize(ext.slice(1)))
                                  .join(", ")}{" "}
                                (tối đa {MAX_FILE_SIZE / 1024 / 1024} MB)
                              </p>
                            </div>
                          </DropzoneEmptyState>
                        </Dropzone>
                      ) : (
                        <div className="flex items-start gap-3 p-4 border border-border rounded-xl bg-accent/50">
                          <FileText className="w-10 h-10 text-primary shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0 space-y-1">
                            <p className="text-sm font-medium text-foreground wrap-break-word">
                              {truncate(uploadedFile.name, { length: 40 })}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(uploadedFile.size / 1024).toFixed(2)} KB
                              {isUploadingFile
                                ? " • Đang tải lên..."
                                : " • Sẵn sàng để tải lên"}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={handleRemoveFile}
                            disabled={isSubmitting}
                            className="shrink-0 rounded-full hover:bg-destructive/10 hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isSubmitting && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-xl">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>
                  {isUploadingFile
                    ? "Đang tải lên CV..."
                    : "Đang gửi đơn ứng tuyển..."}
                </span>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="rounded-xl"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !uploadedFile}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {isUploadingFile ? "Đang tải lên..." : "Đang gửi..."}
                  </>
                ) : (
                  "Ứng tuyển"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
