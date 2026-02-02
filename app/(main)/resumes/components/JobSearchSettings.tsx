'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useUser } from '@/hooks/useUser';
import { CheckCircle2, Info } from 'lucide-react';
import Image from 'next/image';

interface JobSearchSettingsProps {
  isJobSearchActive?: boolean;
  isProfilePublic?: boolean;
  onToggleJobSearch?: (active: boolean) => void;
  onToggleProfilePublic?: (isPublic: boolean) => void;
}

export const JobSearchSettings = ({
  isJobSearchActive = false,
  isProfilePublic = false,
  onToggleJobSearch,
  onToggleProfilePublic,
}: JobSearchSettingsProps) => {
  const { user } = useUser();

  return (
    <div className="space-y-4">
      {/* User Info Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="relative size-12 overflow-hidden rounded-full bg-gray-200">
              {user?.avatar ? (
                <Image src={user.avatar} alt={user.fullName || 'User'} fill className="object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center text-lg font-semibold text-gray-600">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Chào bạn trở lại,</p>
              <h3 className="font-semibold text-gray-900">{user?.fullName || 'Người dùng'}</h3>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-blue-50 px-3 py-2">
            <p className="text-xs text-blue-700">Tài khoản đã xác thực</p>
          </div>
        </CardContent>
      </Card>

      {/* Job Search Toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Đang Tìm việc</CardTitle>
            <Switch checked={isJobSearchActive} onCheckedChange={onToggleJobSearch} />
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">
            Bật tìm việc: Không chỉ giúp Nhà tuyển dụng (NTD) nhìn thấy CV của bạn, còn giúp hồ sơ của bạn được ưu tiên
            và được cung cấp nhiều hỗ trợ hơn trên danh sách tìm kiếm của NTD.
          </CardDescription>
        </CardContent>
      </Card>

      {/* Profile Public Toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Cho phép NTD tìm kiếm hồ sơ</CardTitle>
            <Switch checked={isProfilePublic} onCheckedChange={onToggleProfilePublic} />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CardDescription className="text-sm">
            Bạn đang cho phép Nhà tuyển dụng (NTD) tìm kiếm hồ sơ các NTD uy tín có thể thấy hồ sơ của bạn khi tìm kiếm
            nghiệm làm việc, học vấn, kỹ năng... trên CV của bạn.
          </CardDescription>

          <div className="space-y-2 rounded-lg bg-green-50 p-3">
            <div className="flex items-start gap-2 text-sm text-green-700">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
              <p>
                Nếu cảm thấy bạn phù hợp, NTD sẽ gửi lời bạn một <strong>Lời mời kết nối</strong>.
              </p>
            </div>
            <div className="flex items-start gap-2 text-sm text-green-700">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
              <p>
                Toàn bộ thông tin định danh cá nhân của bạn như họ tên, ảnh đại diện, số điện thoại, email, địa chỉ sẽ
                không được chia sẻ với NTD cho đến khi bạn xác nhận đồng ý với <strong>Lời mời kết nối</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
            <Info className="mt-0.5 size-4 shrink-0" />
            <p>
              <strong>Tải App TopCV ngay!</strong>
              <br />
              Để không bỏ lỡ bất cứ cơ hội nào từ Nhà tuyển dụng
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Career Guidance Banner */}
      <Card className="overflow-hidden border-0 bg-gradient-to-r from-emerald-500 to-teal-600">
        <CardContent className="p-6 text-white">
          <h3 className="mb-2 text-lg font-bold">Định hướng nghề nghiệp theo từ vị</h3>
          <p className="mb-4 text-sm text-white/90">Hiểu rõ tổng quan về nghiệp</p>
          <div className="flex items-center justify-center">
            <div className="rounded-lg bg-white p-2">
              <div className="size-24 bg-gray-100" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
