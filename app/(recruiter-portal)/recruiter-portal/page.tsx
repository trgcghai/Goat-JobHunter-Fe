"use client";

import LoaderSpin from "@/components/common/LoaderSpin";
import { useUser } from "@/hooks/useUser";
import { useGetMyAccountQuery } from "@/services/auth/authApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROLE } from "@/constants/constant";

const RecruiterPortal = () => {
  useGetMyAccountQuery();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    // Check if user has recruiter role
    const isRecruiter = user?.role?.name === ROLE.HR;

    if (!isRecruiter) {
      // Not recruiter, redirect to home
      router.replace("/");
    } else {
      router.replace("/recruiter-portal/jobs");
    }
  }, [user, router]);

  // Show loading while checking
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoaderSpin />
    </div>
  );
};

export default RecruiterPortal;
