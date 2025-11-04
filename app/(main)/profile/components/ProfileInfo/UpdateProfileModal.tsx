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
import { User } from "@/types/model";
import { Loader2 } from "lucide-react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const formatDateForInput = (date?: Date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl! max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>Cập Nhật Thông Tin</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ Tên</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Tên Đăng Nhập</Label>
              <Input
                id="username"
                name="username"
                value={formData.username || ""}
                onChange={handleChange}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="phone">Số Điện Thoại</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.contact?.phone || ""}
                onChange={handleChange}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dob">Ngày Sinh</Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formatDateForInput(formData.dob)}
                onChange={handleChange}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Giới Tính</Label>
              <Input
                id="gender"
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                placeholder="Nam/Nữ/Khác"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Địa Chỉ</Label>
            <Input
              id="address"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              className="rounded-xl"
            />
          </div>

          {message && (
            <div className="p-3 rounded-xl text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {message}
            </div>
          )}

          <div className="flex gap-3 pt-4 justify-end items-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Đang lưu...
                </>
              ) : (
                "Cập Nhật"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
