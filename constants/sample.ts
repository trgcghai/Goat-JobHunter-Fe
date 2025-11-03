import { Level, WorkingType } from "@/types/enum";

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

export const allBlogs: Blog[] = [
  {
    blogId: 1,
    title: "Hướng dẫn sử dụng Docker cho người mới",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    description: "Bài viết hướng dẫn cơ bản về Docker, container và image.",
    content: [
      "Docker là công cụ giúp đóng gói ứng dụng vào container.",
      "Bạn có thể chạy Docker trên Windows, macOS, hoặc Linux.",
    ],
    tags: ["DevOps", "Docker", "Tutorial"],
    draft: false,
    activity: {
      totalLikes: 125,
      totalReads: 3100,
      totalParentComments: 14,
      totalReplies: 33,
    },
    createdAt: "2025-01-15T10:30:00Z",
    createdBy: "admin",
    comments: [
      {
        commentId: 1,
        content: "Bài viết rất dễ hiểu, cảm ơn!",
        createdBy: "user1",
      },
      {
        commentId: 2,
        content: "Mong có phần nâng cao sớm.",
        createdBy: "user2",
      },
    ],
    notifications: [
      {
        notificationId: 1,
        type: "COMMENT",
        message: "user1 đã bình luận",
        read: false,
      },
    ],
  },
  {
    blogId: 2,
    title: "React 18: Những điểm mới đáng chú ý",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    description:
      "Khám phá các tính năng mới của React 18 như concurrent rendering.",
    content: [
      "React 18 giới thiệu concurrent mode để tối ưu UI.",
      "useTransition giúp cải thiện trải nghiệm người dùng.",
    ],
    tags: ["React", "Frontend", "JavaScript"],
    draft: false,
    activity: {
      totalLikes: 203,
      totalReads: 4500,
      totalParentComments: 28,
      totalReplies: 65,
    },
    createdAt: "2025-02-10T09:45:00Z",
    createdBy: "editor01",
  },
  {
    blogId: 3,
    title: "Top 5 IDE tốt nhất cho lập trình viên năm 2025",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    description: "Tổng hợp những IDE phổ biến nhất hiện nay.",
    content: [
      "Visual Studio Code",
      "IntelliJ IDEA",
      "PyCharm",
      "WebStorm",
      "Eclipse",
    ],
    tags: ["IDE", "Developer", "Tools"],
    draft: false,
    activity: {
      totalLikes: 88,
      totalReads: 2200,
      totalParentComments: 7,
      totalReplies: 15,
    },
    createdAt: "2025-03-05T11:00:00Z",
    createdBy: "authorB",
  },
  {
    blogId: 4,
    title: "Sự khác biệt giữa SQL và NoSQL",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    description:
      "Bài viết phân tích ưu và nhược điểm của hai loại cơ sở dữ liệu.",
    tags: ["Database", "SQL", "NoSQL"],
    draft: false,
    activity: {
      totalLikes: 175,
      totalReads: 3800,
      totalParentComments: 20,
      totalReplies: 40,
    },
    createdAt: "2025-03-20T14:00:00Z",
    createdBy: "admin",
  },
  {
    blogId: 5,
    title: "10 mẹo tăng hiệu suất làm việc với VS Code",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    tags: ["VSCode", "Productivity", "Tips"],
    draft: false,
    activity: {
      totalLikes: 145,
      totalReads: 2900,
      totalParentComments: 16,
      totalReplies: 21,
    },
    createdAt: "2025-03-28T08:30:00Z",
    createdBy: "devtips",
  },
  {
    blogId: 6,
    title: "Giới thiệu về RESTful API và nguyên tắc thiết kế",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    description: "Hiểu rõ về REST và cách xây dựng API hiệu quả.",
    tags: ["API", "Backend", "REST"],
    draft: false,
    activity: {
      totalLikes: 167,
      totalReads: 3100,
      totalParentComments: 19,
      totalReplies: 29,
    },
    createdAt: "2025-04-02T10:10:00Z",
    createdBy: "api_master",
  },
  {
    blogId: 7,
    title: "Cách deploy ứng dụng Node.js lên Vercel",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    tags: ["Node.js", "Deployment", "Vercel"],
    draft: false,
    activity: {
      totalLikes: 74,
      totalReads: 1600,
      totalParentComments: 8,
      totalReplies: 11,
    },
    createdAt: "2025-04-05T12:00:00Z",
    createdBy: "editor01",
  },
  {
    blogId: 8,
    title: "So sánh TypeScript và JavaScript: Khi nào nên dùng?",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    tags: ["TypeScript", "JavaScript", "Programming"],
    draft: false,
    activity: {
      totalLikes: 210,
      totalReads: 4200,
      totalParentComments: 32,
      totalReplies: 60,
    },
    createdAt: "2025-04-20T09:00:00Z",
    createdBy: "admin",
  },
  {
    blogId: 9,
    title: "Tổng quan về Git và GitHub cho người mới bắt đầu",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    description: "Cách sử dụng Git cơ bản và làm việc với GitHub.",
    tags: ["Git", "Version Control"],
    draft: false,
    activity: {
      totalLikes: 189,
      totalReads: 4000,
      totalParentComments: 25,
      totalReplies: 42,
    },
    createdAt: "2025-05-01T10:00:00Z",
    createdBy: "authorC",
  },
  {
    blogId: 10,
    title: "Cách tạo blog cá nhân với Next.js và Markdown",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    tags: ["Next.js", "Markdown", "WebDev"],
    draft: false,
    activity: {
      totalLikes: 94,
      totalReads: 2000,
      totalParentComments: 10,
      totalReplies: 13,
    },
    createdAt: "2025-05-15T11:30:00Z",
    createdBy: "frontenddev",
  },
  {
    blogId: 11,
    title: "Những xu hướng công nghệ năm 2025 bạn không nên bỏ lỡ",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    tags: ["Tech Trends", "AI", "Cloud", "Blockchain"],
    draft: false,
    activity: {
      totalLikes: 301,
      totalReads: 6100,
      totalParentComments: 40,
      totalReplies: 92,
    },
    createdAt: "2025-06-01T08:00:00Z",
    createdBy: "techinsider",
  },
  {
    blogId: 12,
    title: "Tại sao nên học lập trình Python trong năm 2025?",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    tags: ["Python", "Beginner", "Career"],
    draft: false,
    activity: {
      totalLikes: 250,
      totalReads: 5400,
      totalParentComments: 33,
      totalReplies: 70,
    },
    createdAt: "2025-06-10T09:20:00Z",
    createdBy: "admin",
  },
];

export const allJobs: Job[] = [
  {
    jobId: 1,
    title: "Senior Frontend Engineer",
    description:
      "Looking for an experienced frontend engineer to join our growing team. You will work on building scalable web applications using modern technologies.",
    startDate: "2025-02-01",
    endDate: "2025-12-31",
    active: true,
    level: Level.SENIOR,
    quantity: 2,
    salary: 3000,
    workingType: WorkingType.FULL_TIME,
    location: "Ho Chi Minh City",
    createdAt: "2025-01-15T00:00:00Z",
    createdBy: "admin",
    skills: [
      {
        skillId: 1,
        name: "React",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 2,
        name: "TypeScript",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 3,
        name: "Tailwind CSS",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
    ],
  },
  {
    jobId: 2,
    title: "Product Manager",
    description:
      "Join our product team and shape the future of our platform. Lead product strategy and work with cross-functional teams.",
    startDate: "2025-02-15",
    endDate: "2025-12-31",
    active: true,
    level: Level.MIDDLE,
    quantity: 1,
    salary: 2500,
    workingType: WorkingType.FULL_TIME,
    location: "Hanoi",
    createdAt: "2025-01-14T00:00:00Z",
    createdBy: "admin",
    skills: [
      {
        skillId: 4,
        name: "Product Strategy",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 5,
        name: "Analytics",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
    ],
  },
  {
    jobId: 3,
    title: "UX/UI Designer",
    description:
      "Create beautiful and intuitive user experiences for our clients. Work on diverse projects across web and mobile platforms.",
    startDate: "2025-02-01",
    endDate: "2025-12-31",
    active: true,
    level: Level.JUNIOR,
    quantity: 1,
    salary: 2000,
    workingType: WorkingType.FULL_TIME,
    location: "Da Nang",
    createdAt: "2025-01-13T00:00:00Z",
    createdBy: "admin",
    skills: [
      {
        skillId: 6,
        name: "Figma",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 7,
        name: "UI Design",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 8,
        name: "Prototyping",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
    ],
  },
  {
    jobId: 4,
    title: "Backend Engineer (Node.js)",
    description:
      "Build scalable backend systems with Node.js and AWS. Work on microservices architecture and cloud infrastructure.",
    startDate: "2025-02-10",
    endDate: "2025-12-31",
    active: true,
    level: Level.SENIOR,
    quantity: 2,
    salary: 3200,
    workingType: WorkingType.FULL_TIME,
    location: "Ho Chi Minh City",
    createdAt: "2025-01-12T00:00:00Z",
    createdBy: "admin",
    skills: [
      {
        skillId: 9,
        name: "Node.js",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 10,
        name: "AWS",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 11,
        name: "PostgreSQL",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
    ],
  },
  {
    jobId: 5,
    title: "Data Analyst",
    description:
      "Analyze and visualize data to drive business insights. Work with large datasets and create actionable reports.",
    startDate: "2025-03-01",
    endDate: "2025-12-31",
    active: true,
    level: Level.MIDDLE,
    quantity: 1,
    salary: 2200,
    workingType: WorkingType.FULL_TIME,
    location: "Hanoi",
    createdAt: "2025-01-10T00:00:00Z",
    createdBy: "admin",
    skills: [
      {
        skillId: 12,
        name: "Python",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 13,
        name: "SQL",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 14,
        name: "Tableau",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
    ],
  },
  {
    jobId: 6,
    title: "Mobile App Developer",
    description:
      "Develop iOS and Android applications for mobile-first experiences. Build cross-platform apps using Flutter or React Native.",
    startDate: "2025-02-20",
    endDate: "2025-12-31",
    active: true,
    level: Level.MIDDLE,
    quantity: 2,
    salary: 2400,
    workingType: WorkingType.FULL_TIME,
    location: "Da Nang",
    createdAt: "2025-01-08T00:00:00Z",
    createdBy: "admin",
    skills: [
      {
        skillId: 15,
        name: "Flutter",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 16,
        name: "React Native",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 17,
        name: "Mobile UI",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
    ],
  },
  {
    jobId: 7,
    title: "DevOps Engineer",
    description:
      "Manage and optimize cloud infrastructure and deployments. Implement CI/CD pipelines and monitoring solutions.",
    startDate: "2025-02-15",
    endDate: "2025-12-31",
    active: true,
    level: Level.SENIOR,
    quantity: 1,
    salary: 3100,
    workingType: WorkingType.FULL_TIME,
    location: "Ho Chi Minh City",
    createdAt: "2025-01-05T00:00:00Z",
    createdBy: "admin",
    skills: [
      {
        skillId: 18,
        name: "Kubernetes",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 19,
        name: "Docker",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 10,
        name: "AWS",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
    ],
  },
  {
    jobId: 8,
    title: "QA Engineer",
    description:
      "Ensure product quality through comprehensive testing strategies. Develop automated tests and maintain test documentation.",
    startDate: "2025-03-01",
    endDate: "2025-12-31",
    active: true,
    level: Level.JUNIOR,
    quantity: 2,
    salary: 1800,
    workingType: WorkingType.FULL_TIME,
    location: "Hanoi",
    createdAt: "2025-01-03T00:00:00Z",
    createdBy: "admin",
    skills: [
      {
        skillId: 20,
        name: "Automation Testing",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 21,
        name: "Selenium",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 22,
        name: "Manual Testing",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
    ],
  },
  {
    jobId: 9,
    title: "Full Stack Developer Intern",
    description:
      "Learn and grow with our experienced team. Work on real projects using modern web technologies.",
    startDate: "2025-02-01",
    endDate: "2025-08-31",
    active: true,
    level: Level.INTERN,
    quantity: 3,
    salary: 500,
    workingType: WorkingType.PART_TIME,
    location: "Ho Chi Minh City",
    createdAt: "2025-01-01T00:00:00Z",
    createdBy: "admin",
    skills: [
      {
        skillId: 1,
        name: "React",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 9,
        name: "Node.js",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
    ],
  },
  {
    jobId: 10,
    title: "Remote Content Writer",
    description:
      "Create engaging content for our blog and marketing materials. Work remotely from anywhere in Vietnam.",
    startDate: "2025-02-01",
    endDate: "2025-12-31",
    active: true,
    level: Level.FRESHER,
    quantity: 1,
    salary: 1200,
    workingType: WorkingType.ONLINE,
    location: "Remote",
    createdAt: "2025-01-01T00:00:00Z",
    createdBy: "admin",
    skills: [
      {
        skillId: 23,
        name: "Content Writing",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
      {
        skillId: 24,
        name: "SEO",
        createdAt: "2025-01-01T00:00:00Z",
        createdBy: "admin",
      },
    ],
  },
];

export const allRecruiter: Recruiter[] = [
  {
    userId: 1,
    email: "contact@techcorp.vn",
    name: "TechCorp Vietnam",
    phone: "+84 28 1234 5678",
    address: "123 Nguyen Hue, District 1",
    avatar:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    description:
      "Leading software development company with 10+ years of experience in creating innovative solutions.",
    website: "https://techcorp.vn",
    createdAt: "2023-01-15T00:00:00Z",
    createdBy: "admin",
    jobs: Array(12).fill(null),
  },
  {
    userId: 2,
    email: "contact@startupxyz.io",
    name: "StartupXYZ",
    phone: "+84 24 1234 5678",
    address: "456 Tran Hung Dao, Hoan Kiem",
    avatar:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    description:
      "Fast-growing startup focused on AI and machine learning solutions for businesses.",
    website: "https://startupxyz.io",
    createdAt: "2023-02-20T00:00:00Z",
    createdBy: "admin",
    jobs: Array(8).fill(null),
  },
  {
    userId: 3,
    email: "contact@designstudio.vn",
    name: "DesignStudio",
    phone: "+84 236 1234 567",
    address: "789 Bach Dang, Hai Chau",
    avatar:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    description:
      "Creative agency specializing in UI/UX design and brand development.",
    website: "https://designstudio.vn",
    createdAt: "2023-03-10T00:00:00Z",
    createdBy: "admin",
    jobs: Array(5).fill(null),
  },
  {
    userId: 4,
    email: "contact@cloudservices.io",
    name: "CloudServices Inc",
    phone: "+84 28 2234 5678",
    address: "321 Le Loi, District 3",
    avatar:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    description:
      "Enterprise cloud infrastructure and services provider for businesses worldwide.",
    website: "https://cloudservices.io",
    createdAt: "2023-04-05T00:00:00Z",
    createdBy: "admin",
    jobs: Array(18).fill(null),
  },
  {
    userId: 5,
    email: "contact@datacorp.vn",
    name: "DataCorp",
    phone: "+84 24 3234 5678",
    address: "654 Ba Trieu, Dong Da",
    avatar:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    description:
      "Data analytics company helping businesses make data-driven decisions.",
    website: "https://datacorp.vn",
    createdAt: "2023-05-12T00:00:00Z",
    createdBy: "admin",
    jobs: Array(6).fill(null),
  },
  {
    userId: 6,
    email: "contact@appstudio.vn",
    name: "AppStudio",
    phone: "+84 236 2234 567",
    address: "987 Nguyen Van Linh, Thanh Khe",
    avatar:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    description:
      "Mobile app development studio creating innovative applications for iOS and Android.",
    website: "https://appstudio.vn",
    createdAt: "2023-06-18T00:00:00Z",
    createdBy: "admin",
    jobs: Array(7).fill(null),
  },
  {
    userId: 7,
    email: "contact@infratech.io",
    name: "InfraTech",
    phone: "+84 28 3234 5678",
    address: "147 Vo Van Tan, District 3",
    avatar:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    description:
      "Infrastructure and DevOps solutions provider for cloud-native applications.",
    website: "https://infratech.io",
    createdAt: "2023-07-22T00:00:00Z",
    createdBy: "admin",
    jobs: Array(9).fill(null),
  },
  {
    userId: 8,
    email: "contact@gamestudio.vn",
    name: "GameStudio",
    phone: "+84 24 4234 5678",
    address: "258 Cau Giay, Cau Giay",
    avatar:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    description:
      "Game development studio creating engaging mobile and PC games.",
    website: "https://gamestudio.vn",
    createdAt: "2023-08-30T00:00:00Z",
    createdBy: "admin",
    jobs: Array(4).fill(null),
  },
];
