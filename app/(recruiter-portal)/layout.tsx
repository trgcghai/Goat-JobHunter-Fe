"use client";
import Sidebar, { SidebarTab } from "@/components/common/Sidebar";
import { useUser } from "@/hooks/useUser";
import { useGetMyAccountQuery } from "@/services/auth/authApi";
import { Briefcase, FileText, MessageCircleCode, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AIChatPopup } from "@/components/common/AIChatPopup";
import { ROLE } from "@/constants/constant";
import { NotificationPopup, UserPopup } from "@/app/(main)/components";

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
    id: "information",
    label: "Thông tin công ty",
    url: "/recruiter-portal/information",
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: "chat",
    label: "Trợ lý AI",
    url: "/chat",
    type: "external",
    icon: <MessageCircleCode className="w-4 h-4" />,
  }
];

const RecruiterLayout = ({ children }: { children: React.ReactNode }) => {
  useGetMyAccountQuery();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    // Check if user has recruiter role
    const isRecruiter = user?.role?.name === ROLE.HR;

    if (!isRecruiter) {
      // Not recruiter, redirect to home
      router.replace("/");
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar tabs={RecruiterTabs} logoHref={"/"} />

      <div className="flex-1 ml-64">
        <div className="bg-sidebar px-4 py-2 border-b border-sidebar-border flex items-center justify-end gap-4">
          <NotificationPopup />
          <UserPopup />
        </div>
        <div className="space-y-6 p-6">
          {children}
        </div>
      </div>

      <AIChatPopup />
    </div>
  );
};

export default RecruiterLayout;
