"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import BulkEmailDialog from "@/app/(recruiter-portal)/recruiter-portal/applications/components/BulkEmailDialog";
import useApplicationActions from "@/hooks/useApplicationActions";
import {
  AcceptFormData,
  RejectFormData
} from "@/app/(recruiter-portal)/recruiter-portal/applications/components/schema";

interface ApplicationActionsProps {
  selectedCount: number;
  selectedIds: number[];
}

export default function ApplicationActions({
  selectedCount,
  selectedIds,
}: ApplicationActionsProps) {
  const [mode, setMode] = useState<"accept" | "reject" | null>(null);
  const { isRejecting, isAccepting, handleRejectApplications, handleAcceptApplications } =
    useApplicationActions();

  const onAcceptSubmit = async (data: AcceptFormData) => {
    await handleAcceptApplications({
      applicationIds: selectedIds,
      interviewDate: data.interviewDate,
      interviewType: data.interviewType,
      location: data.location,
      note: data.notes || "",
    });
    setMode(null);
  };

  const onRejectSubmit = async (data: RejectFormData) => {
    await handleRejectApplications({
      applicationIds: selectedIds,
      reason: data.reason,
    });
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
            onClick={() => setMode("accept")}
            className="gap-2 rounded-xl"
          >
            <CheckCircle className="h-4 w-4" />
            Phê duyệt
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setMode("reject")}
            className="gap-2 rounded-xl"
          >
            <XCircle className="h-4 w-4" />
            Từ chối
          </Button>
        </div>
      </div>

      <BulkEmailDialog
        open={!!mode}
        onOpenChange={(open) => !open && setMode(null)}
        mode={dialogConfig.mode}
        selectedCount={selectedCount}
        isLoading={isRejecting || isAccepting}
        onAcceptSubmit={onAcceptSubmit}
        onRejectSubmit={onRejectSubmit}
      />
    </>
  );
}