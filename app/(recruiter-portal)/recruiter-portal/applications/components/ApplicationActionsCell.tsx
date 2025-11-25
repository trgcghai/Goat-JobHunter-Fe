import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/model";
import { Check, FileText, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface ApplicationActionsCellProps {
  application: Application;
}

const ApplicationActionsCell = ({
  application,
}: ApplicationActionsCellProps) => {
  const [actionType, setActionType] = useState<"accept" | "reject" | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    console.log("ACCEPTED Application ID:", application.applicationId);
  };

  const handleReject = async () => {
    console.log("REJECTED Application ID:", application.applicationId);
  };

  const onConfirm = async () => {
    setIsLoading(true);
    try {
      if (actionType === "accept") {
        await handleAccept();
      } else if (actionType === "reject") {
        await handleReject();
      }
      setActionType(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Config nội dung Dialog dựa trên action
  const dialogConfig = useMemo(() => {
    return {
      title:
        actionType === "accept" ? "Chấp nhận hồ sơ này?" : "Từ chối hồ sơ này?",
      description:
        actionType === "accept" ? (
          <>
            Bạn có chắc chắn muốn chấp nhận ứng viên{" "}
            <span className="font-bold text-foreground">
              {application.user.fullName}
            </span>
            ?
          </>
        ) : (
          <>
            Bạn có chắc chắn muốn từ chối ứng viên{" "}
            <span className="font-bold text-foreground">
              {application.user.fullName}
            </span>
            ? Hành động này không thể hoàn tác.
          </>
        ),
      confirmText: actionType === "accept" ? "Chấp nhận" : "Từ chối",
      confirmBtnClass:
        actionType === "accept"
          ? "bg-green-600 hover:bg-green-700 text-white"
          : "bg-destructive hover:bg-destructive/90 text-white",
    };
  }, [actionType, application.user.fullName]);

  // Disable buttons nếu đã xử lý rồi
  const isProcessed = useMemo(
    () =>
      application.status === "ACCEPTED" || application.status === "REJECTED",
    [application.status],
  );

  return (
    <div className="flex items-center gap-2">
      <Link href={application.resumeUrl} target="_blank">
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl"
          title="Xem CV"
        >
          <FileText className="w-4 h-4" />
        </Button>
      </Link>

      <Button
        variant="outline"
        size="icon"
        className="rounded-xl text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
        title="Chấp nhận"
        onClick={() => setActionType("accept")}
        disabled={isProcessed || isLoading}
      >
        <Check className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
        title="Từ chối"
        onClick={() => setActionType("reject")}
        disabled={isProcessed || isLoading}
      >
        <X className="w-4 h-4" />
      </Button>

      <ConfirmDialog
        open={!!actionType}
        onOpenChange={(open) => !open && setActionType(null)}
        title={dialogConfig.title}
        description={dialogConfig.description}
        confirmText={dialogConfig.confirmText}
        confirmBtnClass={dialogConfig.confirmBtnClass}
        onConfirm={onConfirm}
        isLoading={isLoading}
        disableCancel={isLoading}
      />
    </div>
  );
};

export default ApplicationActionsCell;
