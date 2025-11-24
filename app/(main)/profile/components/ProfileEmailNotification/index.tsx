"use client";

import RecruiterTable from "@/app/(main)/profile/components/ProfileEmailNotification/RecruiterTable";
import SkillSubcription from "@/app/(main)/profile/components/ProfileEmailNotification/SkillSubcription";
import { Card } from "@/components/ui/card";

export default function ProfileEmailNotification() {
  return (
    <div className="space-y-6">
      <SkillSubcription />

      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-2">
          Nhà tuyển dụng đã theo dõi
        </h2>
        <p className="text-sm text-green-600 mb-4">
          Nhận thêm thông báo khi nhà tuyển dụng bạn yêu thích có việc làm mới.
        </p>

        <RecruiterTable />
      </Card>
    </div>
  );
}
