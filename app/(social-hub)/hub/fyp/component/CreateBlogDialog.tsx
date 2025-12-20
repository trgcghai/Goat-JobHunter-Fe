"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { RowsPhotoAlbum } from "react-photo-album";
import RenderNextImage from "@/components/common/Photo/RenderNextImage";
import { Dropzone, DropzoneEmptyState } from "@/components/ui/shadcn-io/dropzone";
import { useBlogImagesInput } from "@/app/(social-hub)/hub/fyp/hooks/useBlogImagesInput";
import useBlogActions from "@/hooks/useBlogActions";
import LoaderSpin from "@/components/common/LoaderSpin";

interface CreateBlogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MAX_DISPLAYED_IMAGES = 5;
const MAX_IMAGE_UPLOAD = 90;

export function CreateBlogDialog({ open, onOpenChange }: CreateBlogDialogProps) {
  const { user } = useUser();
  const { handleCreateBlog, isCreating } = useBlogActions();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const {
    imageFiles,
    isDragging,
    formattedImageUrls,
    handleFilesAdded,
    resetImages
  } = useBlogImagesInput(open, {
    maxDisplayed: MAX_DISPLAYED_IMAGES,
    maxUpload: MAX_IMAGE_UPLOAD
  });

  const handlePost = async () => {
    console.log("Creating post with:", { title, content, imageFiles });

    await handleCreateBlog({
      title,
      content,
      files: imageFiles
    });

    onOpenChange(false);
    setContent("");
    setTitle("");
    resetImages();
  };

  const isAllowed = !!content.trim() && !!title.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Tạo bài viết</DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-14 w-14 border">
              <AvatarImage src={user?.avatar} alt="User" />
              <AvatarFallback>{user?.fullName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{user?.fullName}</p>
              <Select defaultValue="public">
                <SelectTrigger className="rounded-xl text-xs">
                  <SelectValue placeholder="Chọn chế độ xem" className="text-xs" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="public" className="text-xs rounded-lg">
                    Công khai
                  </SelectItem>
                  <SelectItem value="private" className="text-xs rounded-lg">
                    Riêng tư
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="title" className="text-sm font-medium">
              Tiêu đề bài viết
            </Label>
            <Input
              id="title"
              placeholder="Nhập tiêu đề..."
              className="mt-2 rounded-xl"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="-mx-3">
            <Textarea
              placeholder="Bạn đang nghĩ gì?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] resize-none border-none text-lg focus-visible:ring-0"
            />
          </div>

          {isDragging && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="w-full max-w-2xl px-6">
                <Dropzone
                  accept={{ "image/*": [] }}
                  maxSize={5 * 1024 * 1024}
                  onDrop={handleFilesAdded}
                  multiple
                  maxFiles={MAX_IMAGE_UPLOAD}
                  className="min-h-[400px] rounded-2xl border-dashed border-primary bg-primary/5"
                >
                  <DropzoneEmptyState customCaption showIcon={false}>
                    <div className="flex flex-col items-center justify-center space-y-4 p-8">
                      <ImageIcon className="h-20 w-20 text-primary" />
                      <div className="text-center space-y-2">
                        <p className="font-semibold text-base text-primary">Thả ảnh vào đây</p>
                      </div>
                    </div>
                  </DropzoneEmptyState>
                </Dropzone>
              </div>
            </div>
          )}

          {formattedImageUrls.length > 0 && (
            <RowsPhotoAlbum
              photos={formattedImageUrls}
              render={{ image: RenderNextImage }}
            />
          )}

          <div className="rounded-lg border border-border p-2 flex items-center gap-2 justify-between">
            <p className="text-sm font-medium">Thêm vào bài viết của bạn</p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.multiple = true;
                  input.onchange = (e) => {
                    const files = Array.from((e.target as HTMLInputElement).files || []);
                    handleFilesAdded(files);
                  };
                  input.click();
                }}
              >
                <ImageIcon className="h-5 w-5 text-green-500" />
              </Button>
            </div>
          </div>

          <div className={cn(!isAllowed && "cursor-not-allowed")}>
            <Button
              onClick={handlePost}
              variant={isAllowed ? "default" : "secondary"}
              disabled={!isAllowed || isCreating}
              className="rounded-xl w-full"
            >
              {isCreating ?
                <>
                  <LoaderSpin />
                  Đang tải...
                </>
                :
                <>Đăng bài</>
              }
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}