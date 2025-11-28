import { Applicant } from "@/types/model";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface SuitableApplicantActionsCellProps {
  applicant: Applicant;
}

const SuitableApplicantActionsCell = ({ applicant }: SuitableApplicantActionsCellProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl"
          title="Gửi email"
        >
          <Mail className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
export default SuitableApplicantActionsCell;
