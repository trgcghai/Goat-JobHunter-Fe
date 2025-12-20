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
import { useMemo, useRef, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Photo, RowsPhotoAlbum } from "react-photo-album";
import RenderNextImage from "@/components/common/Photo/RenderNextImage";

interface CreateBlogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export function CreateBlogDialog({ open, onOpenChange }: CreateBlogDialogProps) {
  const { user } = useUser();
  const [content, setContent] = useState("");

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newImageFiles = [...imageFiles, ...files];
    setImageFiles(newImageFiles);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePost = () => {
    console.log("[v0] Creating post with:", { content });
    onOpenChange(false);
    setContent("");
  };

  const formattedImageUrls: Photo[] = useMemo(() => {

    if (imagePreviews.length > 0 && imagePreviews.length <= 5) {
      return imagePreviews.map((preview, index) => ({
        src: preview,
        width: 16,
        height: 9,
        alt: `Image ${index + 1}`
      }))
    }

    // If there are more than 5 images
    return imagePreviews.slice(0, 5).map((preview, index) => {

      // Render custom overlay for the 5th image
      if (index == 4) {
        return {
          src: preview,
          width: 16,
          height: 9,
          alt: `Image ${index + 1}`,
          title: `+${imagePreviews.length - 5} more`,
          'aria-isLastWithMore': true,
          'aria-moreCount': imagePreviews.length - 5
        }
      }

      return {
        src: preview,
        width: 16,
        height: 9,
        alt: `Image ${index + 1}`
      }
    })

  }, [imagePreviews])

  const isAllowed = !!content.trim();

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
              <Select>
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
            <Input id="title" placeholder="Nhập tiêu đề..." className="mt-2 rounded-xl" />
          </div>

          <div className="-mx-3">
            <Textarea
              placeholder="Bạn đang nghĩ gì?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] resize-none border-none text-lg focus-visible:ring-0"
            />
          </div>

          {formattedImageUrls.length > 0 &&
            <RowsPhotoAlbum
              photos={formattedImageUrls}
              render={{ image: RenderNextImage }}
            />
          }

          <div className="rounded-lg border border-border p-2 flex items-center gap-2 justify-between">
            <p className="text-sm font-medium">Thêm vào bài viết của bạn</p>
            <div className="flex items-center gap-2">

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full"
              >
                <Label htmlFor="image-upload">
                  <ImageIcon className="h-5 w-5 text-green-500" />
                </Label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </Button>
            </div>
          </div>

          <div className={cn(!isAllowed && "cursor-not-allowed")}>
            <Button
              onClick={handlePost}
              variant={isAllowed ? "default" : "secondary"}
              disabled={!isAllowed}
              className="rounded-xl w-full"
            >
              Đăng bài
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
