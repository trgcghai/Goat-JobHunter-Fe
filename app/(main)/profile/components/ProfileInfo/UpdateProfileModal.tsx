"use client";

import { SignUpType } from "@/app/(auth)/components/schemas";
import ApplicantForm from "@/app/(main)/profile/components/ProfileInfo/ApplicantForm";
import RecruiterForm from "@/app/(main)/profile/components/ProfileInfo/RecruiterForm";
import { Applicant, Recruiter, User } from "@/types/model";
import { useState } from "react";

interface UpdateProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: User;
}

export function UpdateProfileModal({
  open,
  onOpenChange,
  profile,
}: UpdateProfileModalProps) {
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar || "");

  const isRecruiter = (user: User): user is Recruiter => {
    return user.type.toLowerCase() === SignUpType.RECRUITER.toLowerCase();
  };

  const isApplicant = (user: User): user is Applicant => {
    return user.type.toLowerCase() === SignUpType.APPLICANT.toLowerCase();
  };

  if (isRecruiter(profile)) {
    return (
      <RecruiterForm
        open={open}
        onOpenChange={onOpenChange}
        profile={profile}
        avatarPreview={avatarPreview}
        setAvatarPreview={setAvatarPreview}
      />
    );
  }

  if (isApplicant(profile)) {
    return (
      <ApplicantForm
        open={open}
        onOpenChange={onOpenChange}
        profile={profile}
        avatarPreview={avatarPreview}
        setAvatarPreview={setAvatarPreview}
      />
    );
  }

  return null;
}
