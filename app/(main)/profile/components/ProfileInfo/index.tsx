"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRevertGenderKeyValue } from "@/utils/getRevertEnumKeyValue";
import { capitalize } from "lodash";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import ApplicantForm from "@/app/(main)/profile/components/ProfileInfo/ApplicantForm";
import ErrorMessage from "@/components/common/ErrorMessage";
import { formatDate } from "@/utils/formatDate";
import { useUser } from "@/hooks/useUser";
import { ApplicantResponse } from "@/types/dto";

export default function ProfileInfo() {
  const [showModal, setShowModal] = useState(false);

  const { user } = useUser();

  console.log("User in ProfileInfo:", user);

  if (!user) {
    return <ErrorMessage message={"Không tìm thấy thông tin người dùng."} />;
  }

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
                value={user?.email || "Chưa cập nhật"}
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
                value={user?.phone || "Chưa cập nhật"}
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
                value={user?.dob ? formatDate(user?.dob) : "Chưa cập nhật"}
                disabled
                className="rounded-xl text-gray-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="capitalize" htmlFor="address">
              Địa chỉ
            </Label>
            <Input
              id="address"
              type="text"
              value={
                user?.address
                  ? user?.address
                  : "Chưa cập nhật"
              }
              disabled
              className="rounded-xl text-gray-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="capitalize" htmlFor="level">
                Trình độ
              </Label>
              <Input
                id="level"
                value={(user as ApplicantResponse)?.level ? capitalize((user as ApplicantResponse)?.level) : "Chưa cập nhật"}
                disabled
                className="rounded-xl text-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label className="capitalize" htmlFor="education">
                Học Vấn
              </Label>
              <Input
                id="education"
                type="text"
                value={
                  (user as ApplicantResponse)?.education
                    ? capitalize((user as ApplicantResponse).education)
                    : "Chưa cập nhật"
                }
                disabled
                className="rounded-xl text-gray-800"
              />
            </div>
          </div>
        </div>
      </Card>
      <ApplicantForm open={showModal} onOpenChange={setShowModal} profile={user as ApplicantResponse} />
    </>
  );
}
