import { PostCard } from "@/app/(social-hub)/hub/fyp/component/PostCard";
import { CreatePostTrigger } from "@/app/(social-hub)/hub/fyp/component/CreatePostTrigger";
import { Separator } from "@/components/ui/separator";

const posts = [
  {
    id: 1,
    challenge: "My Funemployment Story",
    author: {
      name: "Nguyễn Trường Nguyên",
      avatar: "/avatar-man.png",
      time: "8 hours ago"
    },
    title: "Layoff Không Đáng Sợ - Đáng Sợ Nhất Nếu Bạn Bỏ Cuộc",
    excerpt:
      "Khi tôi nhận được email từ HR thông báo 'công ty buộc phải cắt giảm đa hạ COVID, vị tính hình tài chính khó khăn', tôi cảm thấy như thế giới sụp đổ. Làm việc ở công...",
    image: "/office-meeting.jpg",
    badge: "#1",
    tags: [{ label: "Deep Talk", variant: "blue" as const }],
    stats: { likes: 41, views: 310, comments: 6 }
  },
  {
    id: 2,
    challenge: null,
    author: {
      name: "Chính Nguyễn",
      avatar: "/avatar-woman.png",
      time: "Yesterday"
    },
    title: "Ngôn ngữ nào là số 1: Java, C++ hay Python?",
    excerpt:
      "Ngày xưa, có một cuộc tranh luận này lửa trong cộng đồng công nghệ: Java hay C++ là ngôn ngữ tốt hơn?Fan C++ thì nhấn mạnh sự kiểm soát và hiệu năng tuyệt đối. Fan Java thì lại để cao sự an toàn, ổn định, dễ mở...",
    image: null,
    tags: [
      { label: "Trend Check", variant: "blue" as const },
      { label: "#C++", variant: "gray" as const },
      { label: "#Python", variant: "gray" as const },
      { label: "#Java", variant: "gray" as const }
    ],
    stats: { likes: 5, views: 358, comments: 0 }
  },
  {
    id: 3,
    challenge: "AI For Good",
    author: {
      name: "Van Nguyen",
      avatar: "/avatar-person.jpg",
      time: "8 hours ago"
    },
    title: "Săn xuất âm nhạc thời AI",
    excerpt:
      "AI đang 'xâm chiếm' thế giới theo đủ mọi cách khác nhau. Mình vẫn đang sống với AI từng ngày và thực sự thấy nhiều màu tô nở, &nbsp; mình đã biến AI thành nhiều...",
    image: "/music-astronaut.jpg",
    tags: [],
    stats: { likes: 12, views: 245, comments: 3 }
  }
];

export default function Home() {
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

      <CreatePostTrigger />

      <Separator className="my-4" />

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
