"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/types/model";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface UpdateProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: User;
  onUpdate: (profile: User) => void;
}

export function UpdateProfileModal({
  open,
  onOpenChange,
  profile,
  onUpdate,
}: UpdateProfileModalProps) {
  const [formData, setFormData] = useState<User>(profile);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar || "");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "email" || name === "phone") {
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [name]: value },
      }));
    } else if (name === "dob") {
      setFormData((prev) => ({ ...prev, dob: new Date(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      onUpdate(formData);
      setMessage("Cập nhật thông tin thành công!");
      setIsLoading(false);
      setTimeout(() => {
        onOpenChange(false);
        setMessage("");
      }, 1500);
    }, 1000);
  };

  console.log(avatarPreview);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl! max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Cập Nhật Thông Tin</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Ảnh đại diện</Label>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-full h-full aspect-square rounded-full border overflow-hidden bg-muted">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="object-cover w-full h-full aspect-square rounded-full"
                      fill
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("avatar")?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Chọn ảnh
                </Button>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="space-y-4">
                <Label htmlFor="fullName" required>
                  Họ và tên
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName || ""}
                  onChange={handleChange}
                  required
                  className="rounded-xl"
                />
                <div className="space-y-2">
                  <Label htmlFor="email" required>
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.contact?.email || ""}
                    onChange={handleChange}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" required>
                    Tên hiển thị
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username || ""}
                    onChange={handleChange}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" required>
                    Số điện thoại
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.contact?.phone || ""}
                    onChange={handleChange}
                    required
                    className="rounded-xl"
                  />
                </div>
                <Label htmlFor="address" required>
                  Địa chỉ
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  className="rounded-xl min-h-[200px] resize-none"
                  placeholder="Nhập mô tả..."
                />
              </div>
            </div>
          </div>

          {message && (
            <div className="p-3 rounded-xl text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {message}
            </div>
          )}

          <div className="flex gap-3 pt-4 justify-end items-center border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl px-6"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Đang lưu...
                </>
              ) : (
                "Cập nhật"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
