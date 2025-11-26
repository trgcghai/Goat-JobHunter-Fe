"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { capitalize } from "lodash";
import getRevertGenderKeyValue from "@/utils/getRevertGenderKeyValue";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { useGetMyAccountQuery } from "@/services/auth/authApi";
import { Recruiter } from "@/types/model";
import ProfileHeader from "@/components/ProfileHeader";
import RecruiterForm from "@/app/(recruiter-portal)/recruiter-portal/information/components/RecruiterForm";

const RecruiterInformation = () => {
  useGetMyAccountQuery();
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Thông tin nhà tuyển dụng</h1>
            <p className="text-sm text-muted-foreground">
              Quản lý thông tin hồ sơ của bạn
            </p>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
          >
            <Edit2 className="h-4 w-4" />
            Cập Nhật
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">

          <ProfileHeader fullPage={true} type={"recruiter"} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="capitalize" htmlFor="fullName">
                Họ Tên
              </Label>
              <Input
                id="fullName"
                value={user?.fullName || "Chưa cập nhật"}
                disabled
                className="rounded-xl text-gray-800" />
            </div>
            <div className="space-y-2">
              <Label className="capitalize" htmlFor="username">
                Tên hiển thị
              </Label>
              <Input
                id="username"
                value={user?.username || "Chưa cập nhật"}
                disabled
                className="rounded-xl text-gray-800" />
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
                className="rounded-xl text-gray-800" />
            </div>
            <div className="space-y-2">
              <Label className="capitalize" htmlFor="phone">
                Số Điện Thoại
              </Label>
              <Input
                id="phone"
                value={user?.contact?.phone || "Chưa cập nhật"}
                disabled
                className="rounded-xl text-gray-800" />
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
                value={user?.gender
                  ? capitalize(getRevertGenderKeyValue(user.gender))
                  : "Chưa cập nhật"}
                disabled
                className="rounded-xl text-gray-800" />
            </div>
            <div className="space-y-2">
              <Label className="capitalize" htmlFor="dob">
                Ngày sinh
              </Label>
              <Input
                id="dob"
                value={capitalize(user?.dob) || "Chưa cập nhật"}
                disabled
                className="rounded-xl text-gray-800" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="capitalize" htmlFor="address">
              Địa Chỉ
            </Label>
            <Input
              id="address"
              value={user?.address || "Chưa cập nhật"}
              disabled
              className="rounded-xl text-gray-800" />
          </div>

          <div className="space-y-2">
            <Label className="capitalize" htmlFor="description">
              Mô Tả Công Ty
            </Label>
            <Textarea
              id="description"
              value={(user as Recruiter).description || "Chưa cập nhật"}
              disabled
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm min-h-[100px] resize-none" />
          </div>
        </CardContent>
      </Card>
      <RecruiterForm open={open} onOpenChange={setOpen} />
    </div>
  );
};
export default RecruiterInformation;
