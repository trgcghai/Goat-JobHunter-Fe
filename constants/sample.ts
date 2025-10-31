import { WorkingType } from "@/types/enum";

export const recruiters: Recruiter[] = [
  {
    userId: 1,
    email: "contact@techcorp.vn",
    name: "TechCorp Vietnam",
    avatar:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    description: "Leading tech company in Southeast Asia",
    website: "https://techcorp.vn",
    createdAt: new Date().toISOString(),
    createdBy: "admin",
    jobs: Array(12).fill(null),
  },
  {
    userId: 2,
    email: "contact@startupxyz.com",
    name: "StartupXYZ",
    avatar:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    description: "Innovative SaaS solutions for businesses",
    website: "https://startupxyz.com",
    createdAt: new Date().toISOString(),
    createdBy: "admin",
    jobs: Array(8).fill(null),
  },
  {
    userId: 3,
    email: "contact@designstudio.vn",
    name: "DesignStudio",
    avatar:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    description: "Creative design agency with global clients",
    website: "https://designstudio.vn",
    createdAt: new Date().toISOString(),
    createdBy: "admin",
    jobs: Array(5).fill(null),
  },
];

export const jobs: Job[] = [
  {
    jobId: 1,
    title: "Frontend Developer",
    description: "Phát triển và tối ưu giao diện web sử dụng ReactJS.",
    startDate: "2025-11-01",
    endDate: "2025-12-31",
    active: true,
    level: "Mid",
    quantity: 2,
    salary: 1800,
    workingType: WorkingType.OFFLINE,
    location: "Hà Nội",
    skills: [
      { skillId: 1, name: "ReactJS" },
      { skillId: 2, name: "TypeScript" },
      { skillId: 3, name: "HTML/CSS" },
    ],
  },
  {
    jobId: 2,
    title: "Backend Developer",
    description:
      "Xây dựng API và quản lý cơ sở dữ liệu với NestJS và PostgreSQL.",
    startDate: "2025-11-10",
    endDate: "2026-01-10",
    active: true,
    level: "Senior",
    quantity: 1,
    salary: 2500,
    workingType: WorkingType.OFFLINE,
    location: "TP. Hồ Chí Minh",
    skills: [
      { skillId: 4, name: "NestJS" },
      { skillId: 5, name: "PostgreSQL" },
      { skillId: 6, name: "Docker" },
    ],
  },
  {
    jobId: 3,
    title: "UI/UX Designer",
    description:
      "Thiết kế giao diện và trải nghiệm người dùng cho ứng dụng di động.",
    startDate: "2025-11-05",
    endDate: "2025-12-20",
    active: false,
    level: "Junior",
    quantity: 1,
    salary: 1200,
    workingType: WorkingType.FULL_TIME,
    location: "Đà Nẵng",
    skills: [
      { skillId: 7, name: "Figma" },
      { skillId: 8, name: "Adobe XD" },
    ],
  },
];

export const blogs: Blog[] = [
  {
    blogId: 1,
    title: "5 Kỹ Năng Cần Thiết Cho Lập Trình Viên Trong 2025",
    description:
      "Khám phá những kỹ năng quan trọng nhất mà mỗi lập trình viên cần có...",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    tags: ["Career Tips", "Programming"],
    draft: false,
    activity: {
      totalLikes: 150,
      totalReads: 1200,
      totalParentComments: 25,
      totalReplies: 48,
    },
    createdAt: "2025-10-15T00:00:00Z",
    createdBy: "admin",
  },
  {
    blogId: 2,
    title: "Cách Chuẩn Bị Cho Phỏng Vấn Kỹ Thuật",
    description:
      "Hướng dẫn chi tiết để giúp bạn thành công trong phỏng vấn kỹ thuật...",
    banner:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    tags: ["Interview Tips", "Career"],
    draft: false,
    activity: {
      totalLikes: 200,
      totalReads: 1500,
      totalParentComments: 30,
      totalReplies: 55,
    },
    createdAt: "2025-10-10T00:00:00Z",
    createdBy: "admin",
  },
  {
    blogId: 3,
    title: "Xu Hướng Công Nghệ Năm 2025",
    description:
      "Những công nghệ mới sẽ thay đổi ngành công nghiệp trong năm tới...",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    tags: ["Technology", "Trends"],
    draft: false,
    activity: {
      totalLikes: 180,
      totalReads: 1350,
      totalParentComments: 28,
      totalReplies: 52,
    },
    createdAt: "2025-10-05T00:00:00Z",
    createdBy: "admin",
  },
];
