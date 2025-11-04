import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

const EmptyTable = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>Không có việc làm nào đã lưu</EmptyTitle>
        <EmptyDescription>
          Bạn chưa lưu việc làm nào. Bắt đầu khám phá và lưu những việc làm thú
          vị ngay hôm nay!
        </EmptyDescription>
      </EmptyHeader>
      <Button variant="default" asChild className="rounded-xl" size="sm">
        <Link href="/jobs">
          Khám phá ngay <ArrowUpRightIcon />
        </Link>
      </Button>
    </Empty>
  );
};

export default EmptyTable;
