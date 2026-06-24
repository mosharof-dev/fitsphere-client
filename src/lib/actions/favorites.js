"use server";

import { serverMutation } from "../core/server";

export const addFavoriteToDB = async (favoriteData) => {
  try {
    const response = await serverMutation("/api/favorites", favoriteData, "POST");
    return response;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

export const removeFavoriteFromDB = async (classId, userEmail) => {
  try {
    const response = await serverMutation(
      `/api/favorites/${classId}?userEmail=${userEmail}`,
      {},
      "DELETE"
    );
    return response;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};
