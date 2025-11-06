import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FileQuestion } from "lucide-react";

export function DataTableEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileQuestion />
        </EmptyMedia>
        <EmptyTitle>Không có dữ liệu nào</EmptyTitle>
        <EmptyDescription>Không tìm thấy dữ liệu</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Thêm dữ liệu mới</Button>
      </EmptyContent>
    </Empty>
  );
}
