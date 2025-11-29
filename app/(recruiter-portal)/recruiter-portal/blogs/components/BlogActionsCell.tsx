import { Blog } from "@/types/model";
import { Button } from "@/components/ui/button";
import { Edit, Eye, EyeOff, FileText, Trash2 } from "lucide-react";
import Link from "next/link";

interface BlogActionsCellProps {
  blog: Blog;
}

const BlogActionsCell = ({ blog }: BlogActionsCellProps) => {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/recruiter-portal/blogs/${blog.blogId}`}>
        <Button
          size={"icon"}
          className={"rounded-xl"}
          variant={"outline"}
          title="Xem chi tiết"
        >
          <FileText className={"h-4 w-4"} />
        </Button>
      </Link>
      {blog.enabled ? (
        <Button
          size={"icon"}
          className={"rounded-xl text-orange-500 hover:text-orange-600 hover:bg-orange-50 border-orange-200"}
          variant={"outline"}
          title="Ẩn bài viết"
          onClick={() => console.log(blog)}
        >
          <EyeOff className={"h-4 w-4"} />
        </Button>
      ) : (
        <Button
          size={"icon"}
          className={"rounded-xl text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"}
          variant={"outline"}
          title="Hiển thị bài viết"
          onClick={() => console.log(blog)}
        >
          <Eye className={"h-4 w-4"} />
        </Button>
      )}
      <Link href={`/recruiter-portal/blogs/form?blogId=${blog.blogId}`}>
        <Button
          size={"icon"}
          className={"rounded-xl"}
          variant={"outline"}
          title="Chỉnh sửa"
        >
          <Edit className={"h-4 w-4"} />
        </Button>
      </Link>
      <Button
        size={"icon"}
        className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
        variant={"outline"}
        title="Xóa"
        onClick={() => console.log(blog)}
      >
        <Trash2 className={"h-4 w-4"} />
      </Button>
    </div>
  );
};
export default BlogActionsCell;
