import type { Metadata } from "next";

import { Footer } from "@/app/(main)/components/Footer";
import { Header } from "@/app/(main)/components/Header";

export const metadata: Metadata = {
  title: "GOAT - Job Hunter",
  description: "Tìm công việc tuyệt vời tại GOAT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        isLoggedIn={false}
        user={{
          name: "John Doe",
          email: "john@example.com",
          role: "Job Seeker",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        }}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
