import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/model";
import { Check, FileText, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import EmailDialog from "@/app/(recruiter-portal)/recruiter-portal/applications/components/EmailDialog";

interface ApplicationActionsCellProps {
  application: Application;
}

const ApplicationActionsCell = ({
  application,
}: ApplicationActionsCellProps) => {
  const [mode, setMode] = useState<"accept" | "reject" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendEmail = async (payload: Record<string, string | number>) => {
    setIsLoading(true);
    try {
      console.log("Send email payload:", payload);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const dialogOpen = !!mode;

  const dialogConfig = useMemo(() => {
    return {
      mode: mode as "accept" | "reject",
    };
  }, [mode]);

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
        onClick={() => setMode("accept")}
        disabled={isProcessed || isLoading}
      >
        <Check className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
        title="Từ chối"
        onClick={() => setMode("reject")}
        disabled={isProcessed || isLoading}
      >
        <X className="w-4 h-4" />
      </Button>

      <EmailDialog
        open={dialogOpen}
        onOpenChange={(open) => !open && setMode(null)}
        mode={dialogConfig.mode}
        application={application}
        isLoading={isLoading}
        onSend={handleSendEmail}
      />
    </div>
  );
};

export default ApplicationActionsCell;
