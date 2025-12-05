"use client";

import { useEffect, useState } from "react";
import {
  Dropzone,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface BannerUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onFileSelect?: (file: File | null) => void;
}

export default function BannerUpload({
  value,
  onChange,
  onFileSelect,
}: BannerUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (value) setPreview(value);
  }, [value]);

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Kích thước file không được vượt quá 5MB");
      return;
    }

    setSelectedFile(file);
    onFileSelect?.(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setSelectedFile(null);
    onChange("");
    onFileSelect?.(null);
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <Card className="relative overflow-hidden py-0">
          <div className="relative aspect-video w-full">
            <Image
              src={preview}
              alt="Banner preview"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              type="button"
              size="icon"
              variant="destructive"
              onClick={handleRemove}
              className="rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {selectedFile && (
            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
            </div>
          )}
        </Card>
      ) : (
        <Dropzone
          onDrop={handleDrop}
          accept={{
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
          }}
          maxFiles={1}
          maxSize={5 * 1024 * 1024}
          className="h-48"
        >
          <DropzoneEmptyState
            customCaption={
              <>
                <p className="my-2 w-full truncate text-wrap font-medium text-sm">
                  Tải lên ảnh banner
                </p>
                <p className="w-full truncate text-wrap text-muted-foreground text-xs">
                  Kéo thả ảnh vào đây hoặc click để chọn
                </p>
                <p className="text-wrap text-muted-foreground text-xs">
                  PNG, JPG, GIF, WEBP (tối đa 5MB)
                </p>
              </>
            }
          />
        </Dropzone>
      )}
    </div>
  );
}