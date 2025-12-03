import { useCheckLikedBlogQuery, useFetchBlogByIdQuery, useGetCommentsByBlogIdQuery } from "@/services/blog/blogApi";
import { useFetchRecruiterByIdQuery } from "@/services/recruiter/recruiterApi";
import { useMemo } from "react";
import { formatCommentsToNested, NestedComment } from "@/app/(main)/blogs/[id]/components/utils/formatComments";
import useCommentActions from "@/hooks/useCommentActions";
import { toast } from "sonner";
import useBlogActions from "@/hooks/useBlogActions";

const useDetailBlog = (blogId: string) => {
  const { handleCommentBlog, handleReplyComment, handleDeleteComment, isCommenting } = useCommentActions();
  const { handleUnlikeBlog, handleLikeBlog } = useBlogActions();

  // fetch blog details
  const { data, isLoading, isError } = useFetchBlogByIdQuery(blogId, {
    skip: !blogId
  });

  // memoized blog data
  const blog = useMemo(() => data?.data, [data]);

  // fetch author details
  const { data: authorData } = useFetchRecruiterByIdQuery(
    blog?.author.userId || 0,
    {
      skip: !blog?.author.userId
    }
  );

  // memoized author data
  const author = useMemo(() => authorData?.data, [authorData]);

  // fetch comments for the blog
  const {
    data: commentsData,
    isLoading: isLoadingComments,
    isError: isLoadCommentsFailed
  } = useGetCommentsByBlogIdQuery(blogId, {
    skip: !blogId
  });

  // memoized and formatted comments
  const { comments, totalComments }: {
    comments: NestedComment[];
    totalComments: number;
  } = useMemo(() => {
    if (!commentsData?.data) return {
      comments: [],
      totalComments: 0
    };

    // Handle both array and single object response
    const rawComments = Array.isArray(commentsData.data)
      ? commentsData.data
      : [commentsData.data];

    return {
      comments: formatCommentsToNested(rawComments),
      totalComments: commentsData?.data?.length || 0
    };
  }, [commentsData]);

  // check if the blog is liked by the current user
  const { data: likedData } = useCheckLikedBlogQuery(Number(blogId), {
    skip: !blogId
  });

  // memoized liked status
  const isLiked = useMemo(() => likedData?.data || false, [likedData]);

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

    if (!isLiked && !likedData) {
      toast.error("Không thể thực hiện thao tác. Vui lòng thử lại sau.");
      return;
    }

    if (isLiked) {
      await handleUnlikeBlog(Number(blogId));
    } else {
      await handleLikeBlog(Number(blogId));
    }
  };

  return {
    // blog data
    blog,
    isLiked,
    isLoading,
    isError,
    author,

    // comments
    comments,
    totalComments,
    isLoadingComments,
    isLoadCommentsFailed,

    // actions
    handleComment,
    handleReply,
    handleDelete,
    handleShare,
    handleToggleLike,

    isCommenting
  };
};

export default useDetailBlog;