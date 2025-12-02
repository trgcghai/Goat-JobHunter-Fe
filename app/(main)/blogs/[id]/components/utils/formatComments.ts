import type { CommentType } from "@/types/model";

export interface NestedComment extends CommentType {
  replies?: NestedComment[];
  level: number;
}

export const formatCommentsToNested = (
  comments: CommentType[]
): NestedComment[] => {
  if (!comments || comments.length === 0) return [];

  // Create a map for quick lookup
  const commentMap = new Map<number, NestedComment>();
  const rootComments: NestedComment[] = [];

  // First pass: create all comment objects with level 0
  comments.forEach((comment) => {
    commentMap.set(comment.commentId, {
      ...comment,
      replies: [],
      level: 0
    });
  });

  // Second pass: build the tree structure
  comments.forEach((comment) => {
    const currentComment = commentMap.get(comment.commentId)!;

    if (!comment.reply || !comment.parent) {
      // Root level comment
      rootComments.push(currentComment);
    } else {
      // Reply to another comment
      const parentComment = commentMap.get(
        Number(comment.parent.commentId)
      );

      if (parentComment) {
        // Set level (max 3 levels: 0, 1, 2)
        currentComment.level = Math.min(parentComment.level + 1, 2);

        // Add to parent's replies
        if (!parentComment.replies) {
          parentComment.replies = [];
        }
        parentComment.replies.push(currentComment);
      } else {
        // If parent not found, treat as root
        rootComments.push(currentComment);
      }
    }
  });

  return rootComments;
};