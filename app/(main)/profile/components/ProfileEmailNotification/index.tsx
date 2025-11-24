"use client";

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

        <div className="text-center py-8 border-2 border-dashed border-border rounded-xl">
          <p className="text-sm text-muted-foreground">
            Tính năng đang được phát triển
          </p>
        </div>
      </Card>
    </div>
  );
}
