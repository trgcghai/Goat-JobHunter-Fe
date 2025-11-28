"use client";
import Sidebar, { SidebarTab } from "@/components/Sidebar";
import { useUser } from "@/hooks/useUser";
import { useGetMyAccountQuery } from "@/services/auth/authApi";
import { BookOpen, Briefcase, FileText, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RecruiterTabs: SidebarTab[] = [
  {
    id: "jobs",
    label: "Quản lý việc làm",
    url: "/recruiter-portal/jobs",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    id: "applications",
    label: "Đơn ứng tuyển",
    url: "/recruiter-portal/applications",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "applicants",
    label: "Khám phá ứng viên",
    url: "/recruiter-portal/applicants",
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: "blogs",
    label: "Bài đăng",
    url: "/recruiter-portal/blogs",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: "information",
    label: "Thông tin công ty",
    url: "/recruiter-portal/information",
    icon: <Users className="w-4 h-4" />,
  },
];

const RecruiterLayout = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar tabs={RecruiterTabs} />

      <main className="flex-1 ml-64 p-6">
        <div className="space-y-6">{children}</div>
      </main>
    </div>
  );
};

export default RecruiterLayout;
