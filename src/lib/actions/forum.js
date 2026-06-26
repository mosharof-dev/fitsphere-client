"use server";

import { getUserSession } from "../core/session";
import { serverMutation, serverFetch } from "../core/server";

export const createForumPost = async (postData) => {
  const user = await getUserSession();

  const payload = {
    ...postData,
    authorId: user?.id,
    authorName: user?.name,
    authorEmail: user?.email,
    authorImage: user?.image || "",
    authorRole: user?.role,
  };

  try {
    const response = await serverMutation("/api/forum", payload);
    return response;
  } catch (error) {
    console.error("Error creating forum post:", error);
    throw error;
  }
};

export const getMyForumPosts = async () => {
  const user = await getUserSession();
  if (!user?.id) return;

  try {
    const response = await serverFetch(`/api/forum/my-posts?userId=${user.id}`);
    return response;
  } catch (error) {
    if (error?.message === 'NEXT_REDIRECT') throw error;
    console.error("Error fetching my forum posts:", error);
    throw error;
  }
};

export const getAllForumPosts = async (page = 1, limit = 6) => {
  try {
    const response = await serverFetch(
      `/api/forum?page=${page}&limit=${limit}`,
    );
    return response;
  } catch (error) {
    if (error?.message === 'NEXT_REDIRECT') throw error;
    console.error("Error fetching all forum posts:", error);
    throw error;
  }
};

export const getForumPostDetails = async (id) => {
  try {
    const response = await serverFetch(`/api/forum/${id}`);
    if (response?.error || !response?._id) return null;
    return response;
  } catch (error) {
    if (error?.message === 'NEXT_REDIRECT') throw error;
    console.error("Error fetching post details:", error);
    throw error;
  }
};

export const deleteForumPost = async (id) => {
  try {
    const response = await serverMutation(`/api/forum/${id}`, {}, "DELETE");
    return response;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const voteForumPost = async (id, type) => {
  const user = await getUserSession();
  if (!user?.id) throw new Error("Unauthorized");

  try {
    const response = await serverMutation(
      `/api/forum/${id}/vote`,
      {
        userId: user.id,
        type,
      },
      "PATCH",
    );
    return response;
  } catch (error) {
    console.error("Error voting on post:", error);
    throw error;
  }
};

export const getVoteStatus = async (id) => {
  const user = await getUserSession();
  if (!user?.id) return null;

  try {
    const response = await serverFetch(
      `/api/forum/${id}/vote-status?userId=${user.id}`,
    );
    return response?.vote || null;
  } catch (error) {
    if (error?.message === 'NEXT_REDIRECT') throw error;
    console.error("Error fetching vote status:", error);
    throw error;
  }
};
