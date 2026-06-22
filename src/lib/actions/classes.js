"use server";

import { getUserSession } from "../core/session";
import { serverMutation } from "../core/server";

export const createNewClass = async (newClass) => {
  const trainer = await getUserSession();

  const payload = {
    ...newClass,
    trainerEmail: trainer?.user?.email,
  };

  try {
    const response = await serverMutation("/api/classes", payload);

    return response;
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
};
