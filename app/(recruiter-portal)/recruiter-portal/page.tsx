"use client";

import LoaderSpin from "@/components/LoaderSpin";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RecruiterPortal = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    // Check if user has recruiter role
    const hasRecruiterRole = user?.role?.name == "recruiter";

    if (!hasRecruiterRole) {
      // Not recruiter, redirect to home
      router.replace("/");
    } else {
      // Has recruiter role, redirect to jobs page
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
