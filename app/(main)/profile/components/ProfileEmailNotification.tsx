"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export function ProfileEmailNotification() {
  const [preferences, setPreferences] = useState({
    newJobs: true,
    recruiterMessages: true,
    weeklyDigest: true,
    appUpdates: false,
    blogPosts: true,
    promotions: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setMessage("Cập nhật tùy chọn email thành công!");
      setIsSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }, 1000);
  };

  return (
    <Card className="p-6 max-w-2xl">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Tùy Chọn Nhận Email
      </h2>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
          <Checkbox
            id="newJobs"
            checked={preferences.newJobs}
            onCheckedChange={() => handleToggle("newJobs")}
            className="cursor-pointer"
          />
          <label htmlFor="newJobs" className="flex-1 cursor-pointer">
            <p className="font-medium text-foreground">Công việc mới phù hợp</p>
            <p className="text-sm text-muted-foreground">
              Nhận thông báo khi có công việc mới phù hợp với kỹ năng của bạn
            </p>
          </label>
        </div>

        <div className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
          <Checkbox
            id="recruiterMessages"
            checked={preferences.recruiterMessages}
            onCheckedChange={() => handleToggle("recruiterMessages")}
            className="cursor-pointer"
          />
          <label htmlFor="recruiterMessages" className="flex-1 cursor-pointer">
            <p className="font-medium text-foreground">
              Tin nhắn từ nhà tuyển dụng
            </p>
            <p className="text-sm text-muted-foreground">
              Nhận thông báo khi có tin nhắn mới từ nhà tuyển dụng
            </p>
          </label>
        </div>

        <div className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
          <Checkbox
            id="weeklyDigest"
            checked={preferences.weeklyDigest}
            onCheckedChange={() => handleToggle("weeklyDigest")}
            className="cursor-pointer"
          />
          <label htmlFor="weeklyDigest" className="flex-1 cursor-pointer">
            <p className="font-medium text-foreground">Bản tóm tắt hàng tuần</p>
            <p className="text-sm text-muted-foreground">
              Nhận bản tóm tắt các công việc và tin tức hàng tuần
            </p>
          </label>
        </div>

        <div className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
          <Checkbox
            id="appUpdates"
            checked={preferences.appUpdates}
            onCheckedChange={() => handleToggle("appUpdates")}
            className="cursor-pointer"
          />
          <label htmlFor="appUpdates" className="flex-1 cursor-pointer">
            <p className="font-medium text-foreground">Cập nhật ứng dụng</p>
            <p className="text-sm text-muted-foreground">
              Nhận thông báo về các tính năng mới và cập nhật ứng dụng
            </p>
          </label>
        </div>

        <div className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
          <Checkbox
            id="blogPosts"
            checked={preferences.blogPosts}
            onCheckedChange={() => handleToggle("blogPosts")}
            className="cursor-pointer"
          />
          <label htmlFor="blogPosts" className="flex-1 cursor-pointer">
            <p className="font-medium text-foreground">Bài viết blog mới</p>
            <p className="text-sm text-muted-foreground">
              Nhận thông báo khi có bài viết blog mới được đăng
            </p>
          </label>
        </div>

        <div className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
          <Checkbox
            id="promotions"
            checked={preferences.promotions}
            onCheckedChange={() => handleToggle("promotions")}
            className="cursor-pointer"
          />
          <label htmlFor="promotions" className="flex-1 cursor-pointer">
            <p className="font-medium text-foreground">Khuyến mãi và ưu đãi</p>
            <p className="text-sm text-muted-foreground">
              Nhận thông báo về các khuyến mãi và ưu đãi đặc biệt
            </p>
          </label>
        </div>
      </div>

      {message && (
        <div className="p-3 rounded-lg text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mb-6">
          {message}
        </div>
      )}

      <Button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isSaving ? "Đang lưu..." : "Lưu Tùy Chọn"}
      </Button>
    </Card>
  );
}
