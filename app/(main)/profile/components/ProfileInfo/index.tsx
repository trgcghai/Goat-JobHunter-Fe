"use client";

import { UpdateProfileModal } from "@/app/(main)/profile/components/ProfileInfo/UpdateProfileModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { users } from "@/constants/sample";
import { User } from "@/types/model";
import { Edit2 } from "lucide-react";
import { useState } from "react";

export function ProfileInfo() {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState<User>(users[0]);

  const handleUpdate = (updatedProfile: User) => {
    setProfile(updatedProfile);
    setShowModal(false);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("vi-VN");
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            Thông Tin Tài Khoản
          </h2>
          <Button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
          >
            <Edit2 className="h-4 w-4" />
            Cập Nhật
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ Tên</Label>
              <Input
                id="fullName"
                value={profile.fullName || ""}
                disabled
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Tên Đăng Nhập</Label>
              <Input
                id="username"
                value={profile.username || ""}
                disabled
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.contact?.email || ""}
                disabled
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số Điện Thoại</Label>
              <Input
                id="phone"
                value={profile.contact?.phone || ""}
                disabled
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dob">Ngày Sinh</Label>
              <Input
                id="dob"
                value={formatDate(profile.dob)}
                disabled
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Giới Tính</Label>
              <Input
                id="gender"
                value={profile.gender || ""}
                disabled
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Địa Chỉ</Label>
            <Input
              id="address"
              value={profile.address || ""}
              disabled
              className="rounded-xl"
            />
          </div>
        </div>
      </Card>

      <UpdateProfileModal
        open={showModal}
        onOpenChange={setShowModal}
        profile={profile}
        onUpdate={handleUpdate}
      />
    </>
  );
}
