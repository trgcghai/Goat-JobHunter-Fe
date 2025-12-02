"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import useCareerActions from "@/hooks/useCareerActions";
import type { Career } from "@/types/model";

interface CareerActionsProps {
  selectedItems: Career[];
}

export default function CareerActions({ selectedItems }: CareerActionsProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { handleDeleteCareer, isDeleting } = useCareerActions();

  if (selectedItems.length === 0) return null;

  const handleDeleteSelected = async () => {
    try {
      for (const career of selectedItems) {
        await handleDeleteCareer(String(career.careerId));
      }
      setIsDeleteOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <Button
          variant="destructive"
          className="rounded-xl"
          onClick={() => setIsDeleteOpen(true)}>
          <Trash2 className="w-4 h-4" />
          Xóa {selectedItems.length} ngành nghề
        </Button>
      </div>

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title={`Xóa ${selectedItems.length} ngành nghề?`}
        description="Hành động này không thể hoàn tác."
        confirmText="Xóa"
        confirmBtnClass="bg-destructive text-white"
        onConfirm={handleDeleteSelected}
        isLoading={isDeleting}
        disableCancel={isDeleting}
      />
    </>
  );
}