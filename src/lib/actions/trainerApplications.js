"use server";

import { getUserSession } from "../core/session";
import { serverMutation, serverFetch } from "../core/server";

export const createTrainerApplication = async (applicationData) => {
  const user = await getUserSession();
  
  const payload = {
    ...applicationData,
    userId: user?.id,
    email: user?.email,
    name: user?.name,
  };

  try {
    const response = await serverMutation("/api/trainerApplications", payload);
    return response;
  } catch (error) {
    console.error("Error creating trainer application:", error);
    throw error;
  }
};

export const getAllTrainerApplications = async () => {
  try {
    const response = await serverFetch("/api/trainerApplications");
    return response;
  } catch (error) {
    console.error("Error fetching trainer applications:", error);
    throw error;
  }
};

export const updateApplicationStatus = async (id, status, feedback = "") => {
  try {
    const response = await serverMutation(
      `/api/trainerApplications/${id}`,
      { status, feedback },
      "PATCH"
    );
    return response;
  } catch (error) {
    console.error("Error updating application status:", error);
    throw error;
  }
};

export const getUserApplication = async (userId) => {
  try {
    const response = await serverFetch(`/api/trainerApplications/user/${userId}`);
    if (response?.error) {
      return null;
    }
    return response;
  } catch (error) {
    console.error("Error fetching user application:", error);
    throw error;
  }
};
