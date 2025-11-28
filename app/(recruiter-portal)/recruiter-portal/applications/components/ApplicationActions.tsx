"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import EmailDialog, { EmailDialogMode } from "./EmailDialog";
import useApplicationActions from "@/hooks/useApplicationActions";
import { AcceptFormData, RejectFormData } from "./schema";

interface ApplicationActionsProps {
  selectedCount: number;
  selectedIds: number[];
}

export default function ApplicationActions({
                                             selectedCount,
                                             selectedIds
                                           }: ApplicationActionsProps) {
  const [mode, setMode] = useState<EmailDialogMode | null>(null);
  const { isRejecting, isAccepting, handleRejectApplications, handleAcceptApplications } =
    useApplicationActions();

  const onAcceptSubmit = async (data: AcceptFormData) => {
    await handleAcceptApplications({
      applicationIds: selectedIds,
      interviewDate: data.interviewDate,
      interviewType: data.interviewType,
      location: data.location,
      note: data.notes || ""
    });
    setMode(null);
  };

  const onRejectSubmit = async (data: RejectFormData) => {
    await handleRejectApplications({
      applicationIds: selectedIds,
      reason: data.reason
    });
    setMode(null);
  };

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

      <EmailDialog
        open={!!mode}
        onOpenChange={(open) => !open && setMode(null)}
        mode={mode as "accept" | "reject"}
        selectedCount={selectedCount}
        isLoading={isRejecting || isAccepting}
        onAcceptSubmit={onAcceptSubmit}
        onRejectSubmit={onRejectSubmit}
        onInvite={() => {
        }}
      />
    </>
  );
}
