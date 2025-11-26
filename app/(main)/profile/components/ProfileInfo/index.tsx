"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRevertGenderKeyValue } from "@/utils/getRevertEnumKeyValue";
import { capitalize } from "lodash";
import { Edit2 } from "lucide-react";
import { useMemo, useState } from "react";
import ApplicantForm from "@/app/(main)/profile/components/ProfileInfo/ApplicantForm";
import { useFetchCurrentApplicantQuery } from "@/services/applicant/applicantApi";
import LoaderSpin from "@/components/LoaderSpin";
import ErrorMessage from "@/components/ErrorMessage";
import { formatDate } from "@/utils/formatDate";

export default function ProfileInfo() {
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading, isError } = useFetchCurrentApplicantQuery();
  const user = useMemo(() => data?.data, [data?.data]);

  if (isLoading) {
    return <LoaderSpin />;
  }

  if (isError || !user) {
    return <ErrorMessage message={"Có lỗi xảy ra khi tải thông tin người dùng. Vui lòng thử lại sau"} />;
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
                value={formatDate(user?.dob) || "Chưa cập nhật"}
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
                  ? capitalize(user?.address)
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
                value={user?.level ? capitalize(user?.level) : "Chưa cập nhật"}
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
                  user?.education
                    ? capitalize(user.education)
                    : "Chưa cập nhật"
                }
                disabled
                className="rounded-xl text-gray-800"
              />
            </div>
          </div>
        </div>
      </Card>
      <ApplicantForm open={showModal} onOpenChange={setShowModal} />;
    </>
  );
}
