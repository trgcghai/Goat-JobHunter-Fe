"use client";

import ApplicantForm from "@/app/(main)/profile/components/ProfileInfo/ApplicantForm";
import RecruiterForm from "@/app/(main)/profile/components/ProfileInfo/RecruiterForm";

interface UpdateProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isRecruiter: boolean;
  isApplicant: boolean;
}

export function UpdateProfileModal({
  open,
  onOpenChange,
  isRecruiter,
  isApplicant,
}: UpdateProfileModalProps) {
  if (isRecruiter) {
    return <RecruiterForm open={open} onOpenChange={onOpenChange} />;
  }

  if (isApplicant) {
    return <ApplicantForm open={open} onOpenChange={onOpenChange} />;
  }

  return null;
}
