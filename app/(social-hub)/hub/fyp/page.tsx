import { SocialBlogCard } from "@/app/(social-hub)/hub/fyp/component/SocialBlogCard";
import { CreateBlogTrigger } from "@/app/(social-hub)/hub/fyp/component/CreateBlogTrigger";
import { Separator } from "@/components/ui/separator";
import { Blog } from "@/types/model";

const blogs: Blog[] = [
  {
    blogId: 1,
    title: "Layoff Không Đáng Sợ - Đáng Sợ Nhất Nếu Bạn Bỏ Cuộc",
    banner: "https://picsum.photos/200/300",
    description: "Khi tôi nhận được email từ HR thông báo 'công ty buộc phải cắt giảm đa hạ COVID, vị tính hình tài chính khó khăn', tôi cảm thấy như thế giới sụp đổ. Làm việc ở công...",
    content: "",
    tags: ["deep-talk", "career"],
    draft: false,
    enabled: true,
    activity: {
      totalLikes: 41,
      totalComments: 6,
      totalReads: 310,
      totalParentComments: 6
    },
    author: {
      userId: 1,
      fullName: "Nguyễn Trường Nguyên",
    },
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    createdBy: "1",
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    updatedBy: "1"
  },
  {
    blogId: 2,
    title: "Ngôn ngữ nào là số 1: Java, C++ hay Python?",
    banner: "https://picsum.photos/200/300",
    description: "Ngày xưa, có một cuộc tranh luận này lửa trong cộng đồng công nghệ: Java hay C++ là ngôn ngữ tốt hơn?Fan C++ thì nhấn mạnh sự kiểm soát và hiệu năng tuyệt đối. Fan Java thì lại để cao sự an toàn, ổn định, dễ mở...",
    content: "",
    tags: ["trend-check", "java", "python", "cpp"],
    draft: false,
    enabled: true,
    activity: {
      totalLikes: 5,
      totalComments: 0,
      totalReads: 358,
      totalParentComments: 0
    },
    author: {
      userId: 2,
      fullName: "Chính Nguyễn",
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    createdBy: "2",
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedBy: "2"
  },
  {
    blogId: 3,
    title: "Săn xuất âm nhạc thời AI",
    banner: "https://picsum.photos/200/300",
    description: "AI đang 'xâm chiếm' thế giới theo đủ mọi cách khác nhau. Mình vẫn đang sống với AI từng ngày và thực sự thấy nhiều màu tô nở, mình đã biến AI thành nhiều...",
    content: "",
    tags: ["ai", "music"],
    draft: false,
    enabled: true,
    activity: {
      totalLikes: 12,
      totalComments: 3,
      totalReads: 245,
      totalParentComments: 3
    },
    author: {
      userId: 3,
      fullName: "Van Nguyen",
    },
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    createdBy: "3",
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    updatedBy: "3"
  }
];

export default function FypPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="mb-6 text-4xl font-bold text-balance">
          Welcome to{" "}
          <span className="bg-gradient-to-r bg-primary bg-clip-text text-transparent">
            Story Hub!
          </span>
        </h1>
      </div>

      <CreateBlogTrigger />

      <Separator className="my-4" />

      <div className="space-y-4">
        {blogs.map((blog) => (
          <SocialBlogCard key={blog.blogId} blog={blog} />
        ))}
      </div>
    </div>
  );
}