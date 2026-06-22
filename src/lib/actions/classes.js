"use server";

import { serverMutation } from "../core/server";

export const createNewClass = async (newClass) => {
  try {
    const response = await serverMutation("/api/classes", newClass);
    return response;
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
};
