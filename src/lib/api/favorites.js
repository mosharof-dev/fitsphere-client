"use server";

import { serverFetch } from "../core/server";

export const getUserFavorites = async (userEmail) => {
  try {
    const response = await serverFetch(`/api/favorites/${userEmail}`);
    return response;
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    throw error;
  }
};

export const checkIfFavorite = async (classId, userEmail) => {
  try {
    const response = await serverFetch(
      `/api/favorites/check/${classId}?userEmail=${userEmail}`,
    );
    return response.isFavorite;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
};
