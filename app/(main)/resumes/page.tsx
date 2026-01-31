'use client';

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { useUser } from '@/hooks/useUser';
import { useGetMyAccountQuery } from '@/services/auth/authApi';

const ResumePage = () => {
  useGetMyAccountQuery();

  const { user, isSignedIn } = useUser();

  if (!user || !isSignedIn) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Không tìm thấy CV</EmptyTitle>
          <EmptyDescription>CV bạn đang tìm kiếm không tồn tại hoặc đã xảy ra lỗi. Hãy thử lại sau.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return <div>CV</div>;
};

export default ResumePage;
