import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const blogs = [
  {
    id: 1,
    title: "5 Kỹ Năng Cần Thiết Cho Lập Trình Viên Trong 2025",
    excerpt:
      "Khám phá những kỹ năng quan trọng nhất mà mỗi lập trình viên cần có...",
    date: "15 Tháng 10, 2025",
    category: "Career Tips",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Cách Chuẩn Bị Cho Phỏng Vấn Kỹ Thuật",
    excerpt:
      "Hướng dẫn chi tiết để giúp bạn thành công trong phỏng vấn kỹ thuật...",
    date: "10 Tháng 10, 2025",
    category: "Interview Tips",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Xu Hướng Công Nghệ Năm 2025",
    excerpt:
      "Những công nghệ mới sẽ thay đổi ngành công nghiệp trong năm tới...",
    date: "5 Tháng 10, 2025",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  },
];

export function LatestBlogs() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Blog Mới Nhất
          </h2>
          <p className="text-muted-foreground">
            Những bài viết hữu ích về sự nghiệp và công nghệ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-0 pb-4"
            >
              <Image
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                className="h-40 w-full object-cover"
                width={400}
                height={160}
              />
              <CardHeader>
                <div className="mb-2">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-foreground line-clamp-2">
                  {blog.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {blog.excerpt}
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">{blog.date}</p>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
            Đọc Thêm Bài Viết
          </Button>
        </div>
      </div>
    </section>
  );
}
