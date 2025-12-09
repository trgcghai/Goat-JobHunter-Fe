import { useFetchBlogByIdReadQuery, useGetCommentsByBlogIdQuery } from "@/services/blog/blogApi";
import { useFetchRecruiterByIdQuery } from "@/services/recruiter/recruiterApi";
import { useCheckLikedBlogsQuery } from "@/services/user/userApi";
import { useMemo } from "react";
import { formatCommentsToNested, NestedComment } from "@/app/(main)/blogs/[id]/components/utils/formatComments";
import useCommentActions from "@/hooks/useCommentActions";
import { toast } from "sonner";
import useBlogActions from "@/hooks/useBlogActions";
import { useUser } from "@/hooks/useUser";

const useDetailBlog = (blogId: string) => {
  const { isSignedIn, user } = useUser();
  const { handleCommentBlog, handleReplyComment, handleDeleteComment, isCommenting } = useCommentActions();
  const { handleUnlikeBlog, handleLikeBlog } = useBlogActions();

  // fetch blog details
  const { data, isLoading, isError } = useFetchBlogByIdReadQuery(blogId, {
    skip: !blogId
  });

  const blog = useMemo(() => data?.data, [data]);

  // fetch author details
  const { data: authorData } = useFetchRecruiterByIdQuery(
    blog?.author.userId || 0,
    {
      skip: !blog?.author.userId
    }
  );

  const author = useMemo(() => authorData?.data, [authorData]);

  // fetch comments
  const {
    data: commentsData,
    isLoading: isLoadingComments,
    isError: isLoadCommentsFailed
  } = useGetCommentsByBlogIdQuery(blogId, {
    skip: !blogId
  });

  const { comments, totalComments }: {
    comments: NestedComment[];
    totalComments: number;
  } = useMemo(() => {
    if (!commentsData?.data) return {
      comments: [],
      totalComments: 0
    };

    const rawComments = Array.isArray(commentsData.data)
      ? commentsData.data
      : [commentsData.data];

    return {
      comments: formatCommentsToNested(rawComments),
      totalComments: commentsData?.data?.length || 0
    };
  }, [commentsData]);

  // check liked status
  const { data: likedData } = useCheckLikedBlogsQuery(
    { blogIds: [Number(blogId)] },
    {
      skip: !blogId || !isSignedIn || !user
    }
  );

  const isLiked = useMemo(() => {
    if (!likedData?.data) return false;
    return likedData.data.find(item => item.blogId === Number(blogId))?.result || false;
  }, [likedData, blogId]);

  // action handlers
  const handleComment = async (comment: string) => {
    if (!comment.trim()) {
      toast.info("Vui lòng nhập nội dung bình luận.");
      return;
    }

    await handleCommentBlog(Number(blogId), comment);
  };

  const handleReply = async (replyTo: number, comment: string) => {
    if (!comment.trim()) {
      toast.info("Vui lòng nhập nội dung trả lời.");
      return;
    }

    await handleReplyComment(Number(blogId), replyTo, comment);
  };

  const handleDelete = async (commentId: number) => await handleDeleteComment(commentId);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.toString());
      toast.success(`Đã sao chép liên kết bài viết`);
    } catch (err) {
      console.error("Không thể copy:", err);
      toast.error("Sao chép liên kết thất bại. Vui lòng thử lại.");
    }
  };

  const handleToggleLike = async () => {
    if (!isSignedIn || !user) {
      toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
      return;
    }

    if (isLiked) {
      await handleUnlikeBlog(Number(blogId));
    } else {
      await handleLikeBlog(Number(blogId));
    }
  };

  return {
    blog,
    isLiked,
    isLoading,
    isError,
    author,

    comments,
    totalComments,
    isLoadingComments,
    isLoadCommentsFailed,

    handleComment,
    handleReply,
    handleDelete,
    handleShare,
    handleToggleLike,

    isCommenting
  };
};

export default useDetailBlog;