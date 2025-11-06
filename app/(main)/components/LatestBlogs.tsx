import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { blogs } from "@/constants/sample";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";

export default function LatestBlogs() {
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
            <Link
              key={blog.blogId}
              href={`/blogs/${blog.blogId}`}
              className="block h-full"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-0 pb-4 flex flex-col h-full">
                <Image
                  src={blog.banner || "/placeholder.svg"}
                  alt={blog.title}
                  className="h-40 w-full object-cover"
                  width={400}
                  height={160}
                />
                <CardHeader>
                  <div className="mb-2 flex flex-wrap gap-2">
                    {blog.tags?.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-lg text-foreground line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(blog.createdAt as "")}
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {blog.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/blogs">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
              Đọc Thêm Bài Viết
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
