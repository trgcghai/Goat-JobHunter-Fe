"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useState } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Bài viết mới",
    message:
      "Công ty ABC đã đăng bài tuyển dụng mới phù hợp với kỹ năng của bạn",
    timestamp: "2 giờ trước",
    read: false,
  },
  {
    id: 2,
    title: "Phản hồi ứng tuyển",
    message: "Công ty XYZ đã xem hồ sơ ứng tuyển của bạn",
    timestamp: "1 ngày trước",
    read: true,
  },
  {
    id: 3,
    title: "Mời phỏng vấn",
    message: "Công ty DEF mời bạn phỏng vấn cho vị trí Senior Developer",
    timestamp: "3 ngày trước",
    read: true,
  },
  {
    id: 4,
    title: "Bài viết mới",
    message: "Blog có bài viết mới về xu hướng phát triển web",
    timestamp: "1 tuần trước",
    read: true,
  },
  {
    id: 5,
    title: "Bài viết mới",
    message: "Có bài tuyển dụng mới từ các công ty bạn theo dõi",
    timestamp: "2 tuần trước",
    read: true,
  },
  {
    id: 6,
    title: "Cập nhật hồ sơ",
    message:
      "Hãy cập nhật hồ sơ của bạn để tăng cơ hội được nhà tuyển dụng liên hệ",
    timestamp: "3 tuần trước",
    read: true,
  },
];

const ITEMS_PER_PAGE = 3;

export function ProfileNotifications() {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(mockNotifications.length / ITEMS_PER_PAGE);
  const startIdx = currentPage * ITEMS_PER_PAGE;
  const currentNotifications = mockNotifications.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {currentNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
              !notification.read ? "bg-accent/10 border-accent/30" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  {notification.title}
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-accent"></span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {notification.timestamp}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <Button
                key={idx}
                variant={currentPage === idx ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(idx)}
                className="h-8 w-8 p-0"
              >
                {idx + 1}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
            }
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
