"use client";

import { SignUpType } from "@/app/(auth)/components/schemas";
import { UpdateProfileModal } from "@/app/(main)/profile/components/ProfileInfo/UpdateProfileModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/hooks/useUser";
import { Recruiter, User } from "@/types/model";
import getRevertGenderKeyValue from "@/utils/getRevertGenderKeyValue";
import { capitalize } from "lodash";
import { Edit2 } from "lucide-react";
import { useState } from "react";

export default function ProfileInfo() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();

  const isRecruiter = (user: User): user is Recruiter => {
    return user?.type.toLowerCase() == SignUpType.RECRUITER.toLowerCase();
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
              <Label className="capitalize" htmlFor="fullName">
                Họ Tên
              </Label>
              <Input
                id="fullName"
                value={user?.fullName || "Chưa cập nhật"}
                disabled
                className="rounded-xl text-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label className="capitalize" htmlFor="username">
                Tên hiển thị
              </Label>
              <Input
                id="username"
                value={user?.username || "Chưa cập nhật"}
                disabled
                className="rounded-xl text-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="capitalize" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={user?.contact.email || "Chưa cập nhật"}
                disabled
                className="rounded-xl text-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label className="capitalize" htmlFor="phone">
                Số Điện Thoại
              </Label>
              <Input
                id="phone"
                value={user?.contact?.phone || "Chưa cập nhật"}
                disabled
                className="rounded-xl text-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="capitalize" htmlFor="gender">
                Giới tính
              </Label>
              <Input
                id="gender"
                type="text"
                value={
                  user?.gender
                    ? capitalize(getRevertGenderKeyValue(user.gender))
                    : "Chưa cập nhật"
                }
                disabled
                className="rounded-xl text-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label className="capitalize" htmlFor="dob">
                Ngày sinh
              </Label>
              <Input
                id="dob"
                value={capitalize(user?.dob) || "Chưa cập nhật"}
                disabled
                className="rounded-xl text-gray-800"
              />
            </div>
          </div>

          {isRecruiter(user!) && (
            <>
              <div className="space-y-2">
                <Label className="capitalize" htmlFor="address">
                  Địa Chỉ
                </Label>
                <Input
                  id="address"
                  value={user?.address || "Chưa cập nhật"}
                  disabled
                  className="rounded-xl text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <Label className="capitalize" htmlFor="description">
                  Mô Tả Công Ty
                </Label>
                <Textarea
                  id="description"
                  value={user?.description || "Chưa cập nhật"}
                  disabled
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm min-h-[100px] resize-none"
                />
              </div>
            </>
          )}
        </div>
      </Card>

      <UpdateProfileModal
        open={showModal}
        onOpenChange={setShowModal}
        isRecruiter={isRecruiter(user!)}
        isApplicant={!isRecruiter(user!)}
      />
    </>
  );
}
