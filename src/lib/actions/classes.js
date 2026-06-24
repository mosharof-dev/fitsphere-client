"use server";

import { getUserSession } from "../core/session";
import { serverMutation } from "../core/server";

export const createNewClass = async (newClass) => {
  const trainer = await getUserSession();

  const payload = {
    ...newClass,
    trainerEmail: trainer?.email,
  };

  try {
    const response = await serverMutation("/api/classes", payload);

    return response;
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
};

export const updateClass = async (id, updatedData) => {
  try {
    const response = await serverMutation(
      `/api/classes/${id}`,
      updatedData,
      "PATCH",
    );
    return response;
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
};

export const deleteClass = async (id, deleteData) => {
  try {
    const response = await serverMutation(
      `/api/classes/${id}`,
      deleteData,
      "DELETE",
    );
    return response;
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
};

export const updateClassStatus = async (id, status) => {
  try {
    const response = await serverMutation(
      `/api/classes/status/${id}`,
      { status },
      "PATCH",
    );
    return response;
  } catch (error) {
    console.error("Error updating class status:", error);
    throw error;
  }
};
