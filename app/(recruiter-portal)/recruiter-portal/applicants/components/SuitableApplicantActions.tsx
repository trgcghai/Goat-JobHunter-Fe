import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface SuitableApplicantActionsProps {
  selectedCount: number;
  selectedIds: number[];
}

const SuitableApplicantActions = ({ selectedCount, selectedIds }: SuitableApplicantActionsProps) => {
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
            className="gap-2 rounded-xl"
          >
            <Mail className="h-4 w-4" />
            Liên hệ với {selectedCount} ứng viên
          </Button>
        </div>
      </div>
    </>
  );
};
export default SuitableApplicantActions;
