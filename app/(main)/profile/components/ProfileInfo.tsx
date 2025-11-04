"use client";

import { UpdateProfileModal } from "@/app/(main)/profile/components/UpdateProfileModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2 } from "lucide-react";
import { useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  skills: string;
  experience: string;
}

const mockProfile: UserProfile = {
  name: "Nguyễn Văn A",
  email: "nguyena@example.com",
  phone: "+84 123 456 789",
  location: "Hà Nội, Việt Nam",
  bio: "Passionate developer with 5 years of experience in web development",
  skills: "React, TypeScript, Node.js, PostgreSQL, Tailwind CSS",
  experience: "5 năm kinh nghiệm",
};

export function ProfileInfo() {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState(mockProfile);

  const handleUpdate = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    setShowModal(false);
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
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Họ Tên
              </label>
              <p className="text-foreground">{profile.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Email
              </label>
              <p className="text-foreground">{profile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Số Điện Thoại
              </label>
              <p className="text-foreground">{profile.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Địa Điểm
              </label>
              <p className="text-foreground">{profile.location}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Giới Thiệu
            </label>
            <p className="text-foreground">{profile.bio}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Kỹ Năng
            </label>
            <p className="text-foreground">{profile.skills}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Kinh Nghiệm
            </label>
            <p className="text-foreground">{profile.experience}</p>
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
