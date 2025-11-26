"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import BulkEmailDialog from "@/app/(recruiter-portal)/recruiter-portal/applications/components/BulkEmailDialog";

interface ApplicationActionsProps {
  selectedCount: number;
  selectedIds: number[];
}

export default function ApplicationActions({
  selectedCount,
  selectedIds,
}: ApplicationActionsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<"accept" | "reject" | null>(null);

  const handleAction = (type: "accept" | "reject" | null) => {
    setMode(type);
    setDialogOpen(true);
  };

  const confirmAction = () => {
    setDialogOpen(false);
    setMode(null);
  };

  const dialogConfig = useMemo(() => {
    return {
      mode: mode as "accept" | "reject"
    };
  }, [mode]);

  if (selectedCount === 0) return null;

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-2 border border-border rounded-xl mb-4">
        <span className="text-sm font-medium">
          Đã chọn {selectedCount} ứng viên
        </span>
        <div className="flex gap-4 ml-auto">
          <Button
            variant="default"
            size="sm"
            onClick={() => handleAction("accept")}
            className="gap-2 rounded-xl"
          >
            <CheckCircle className="h-4 w-4" />
            Phê duyệt
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleAction("reject")}
            className="gap-2 rounded-xl"
          >
            <XCircle className="h-4 w-4" />
            Từ chối
          </Button>
        </div>
      </div>

      <BulkEmailDialog
        open={dialogOpen}
        onOpenChange={(open) => !open && setMode(null)}
        mode={dialogConfig.mode}
        selectedCount={selectedCount}
        applicationIds={selectedIds}
        onActionComplete={confirmAction}
      />
    </>
  );
}