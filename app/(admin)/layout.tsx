import Sidebar, { SidebarTab } from "@/components/Sidebar";
import { Briefcase, FileText, Lock, Shield, Users } from "lucide-react";

export const AdminTabs: SidebarTab[] = [
  {
    id: "dashboard",
    label: "Tổng quan",
    url: "/dashboard",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    id: "job",
    label: "Việc làm",
    url: "/admin/job",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    id: "blog",
    label: "Blog",
    url: "/admin/blog",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "user",
    label: "Người dùng",
    url: "/admin/user",
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: "role",
    label: "Vai trò",
    url: "/admin/role",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    id: "permission",
    label: "Quyền hạn",
    url: "/admin/permission",
    icon: <Lock className="w-4 h-4" />,
  },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar tabs={AdminTabs} />

      <main className="flex-1 ml-64 p-6">
        <div className="space-y-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
