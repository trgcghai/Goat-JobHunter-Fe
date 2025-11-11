"use client";

import { SignUpType } from "@/app/(auth)/components/schemas";
import { ApplicantForm } from "@/components/applicant-form";
import { RecruiterForm } from "@/components/recruiter-form";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [signUpType, setSignUpType] = useState<SignUpType>(
    SignUpType.APPLICANT,
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {signUpType === SignUpType.APPLICANT ? (
        <ApplicantForm signUpType={signUpType} setSignUpType={setSignUpType} />
      ) : (
        <RecruiterForm signUpType={signUpType} setSignUpType={setSignUpType} />
      )}
    </div>
  );
}
