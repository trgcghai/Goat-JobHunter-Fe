import { useFetchBlogByIdQuery, useGetCommentsByBlogIdQuery } from "@/services/blog/blogApi";
import { useFetchRecruiterByIdQuery } from "@/services/recruiter/recruiterApi";
import { useMemo } from "react";
import { formatCommentsToNested, NestedComment } from "@/app/(main)/blogs/[id]/components/utils/formatComments";

const useDetailBlog = (blogId: string) => {
  const { data, isLoading, isError } = useFetchBlogByIdQuery(blogId, {
    skip: !blogId
  });

  const blog = useMemo(() => data?.data, [data]);

  const { data: authorData } = useFetchRecruiterByIdQuery(
    blog?.author.userId || 0,
    {
      skip: !blog?.author.userId
    }
  );

  const author = useMemo(() => authorData?.data, [authorData]);

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

    // Handle both array and single object response
    const rawComments = Array.isArray(commentsData.data)
      ? commentsData.data
      : [commentsData.data];

    return {
      comments: formatCommentsToNested(rawComments),
      totalComments: commentsData?.data?.length || 0
    };
  }, [commentsData]);


  return {
    // blog data
    blog,
    isLoading,
    isError,

    author,

    // comments
    comments,
    totalComments,
    isLoadingComments,
    isLoadCommentsFailed
  };
};

export default useDetailBlog;