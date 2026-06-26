"use server";

import { getUserSession } from "../core/session";
import { serverMutation, serverFetch } from "../core/server";

export const addComment = async (postId, text, parentCommentId = null) => {
  const user = await getUserSession();
  if (!user?.id) throw new Error("Unauthorized");

  const payload = {
    parentCommentId,
    text,
    authorId: user.id,
    authorName: user.name,
    authorImage: user.image || "",
  };

  try {
    const response = await serverMutation(`/api/comments/${postId}`, payload);
    return response;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const getComments = async (postId) => {
  try {
    const response = await serverFetch(`/api/comments/${postId}`);
    return response;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const editComment = async (commentId, text) => {
  const user = await getUserSession();
  if (!user?.id) throw new Error("Unauthorized");

  try {
    const response = await serverMutation(
      `/api/comments/${commentId}`,
      {
        text,
        authorId: user.id,
      },
      "PATCH",
    );
    return response;
  } catch (error) {
    console.error("Error editing comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  const user = await getUserSession();
  if (!user?.id) throw new Error("Unauthorized");

  try {
    const response = await serverMutation(
      `/api/comments/${commentId}`,
      {
        authorId: user.id,
      },
      "DELETE",
    );
    return response;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
