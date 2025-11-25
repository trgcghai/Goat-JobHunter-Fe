"use client";

import LoaderSpin from "@/components/LoaderSpin";
import { useUser } from "@/hooks/useUser";
import { useGetMyAccountQuery } from "@/services/auth/authApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RecruiterPortal = () => {
  useGetMyAccountQuery();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    // Check if user has recruiter role
    const hasRecruiterRole = user?.role?.name == "HR";

    if (!hasRecruiterRole) {
      // Not recruiter, redirect to home
      router.replace("/");
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
