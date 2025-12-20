import { SocialBlogCard } from "@/app/(social-hub)/hub/fyp/component/SocialBlogCard";
import { CreateBlogTrigger } from "@/app/(social-hub)/hub/fyp/component/CreateBlogTrigger";
import { Separator } from "@/components/ui/separator";
import { Blog } from "@/types/model";

export default function FypPage() {

  const blogs: Blog[] = []

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