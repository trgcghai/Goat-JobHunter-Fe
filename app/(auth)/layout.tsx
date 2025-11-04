import React from "react";

export const metadata = {
  title: "Auth",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-50">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
