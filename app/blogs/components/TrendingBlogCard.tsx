import { Blog } from "@/types/model";
import Link from "next/link";

interface TrendingBlogCardProps {
  blog: Blog;
  index: number;
}

const TrendingBlogCard = ({ blog, index }: TrendingBlogCardProps) => {
  return (
    <Link
      key={blog.blogId}
      href={`/blogs/${blog.blogId}`}
      className="block group"
    >
      <div className="flex gap-3">
        <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-bold text-primary">{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
            {blog.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{blog.activity?.totalReads} lượt đọc</span>
            <span>•</span>
            <span>{blog.activity?.totalLikes} likes</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TrendingBlogCard;
