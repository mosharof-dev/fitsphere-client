import { serverFetch } from "../core/server";

export const getAllClasses = (queryParams = "") => {
  try {
    const endpoint = queryParams
      ? `/api/classes?${queryParams}`
      : "/api/classes";
    const response = serverFetch(endpoint);
    return response;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const getAllAdminClasses = (queryParams = "") => {
  try {
    const endpoint = queryParams
      ? `/api/classes/all-classes?${queryParams}`
      : "/api/classes/all-classes";
    const response = serverFetch(endpoint);
    return response;
  } catch (error) {
    console.error("Error fetching all admin classes:", error);
    throw error;
  }
};

export const getClassesId = async (id) => {
  try {
    const response = serverFetch(`/api/classes/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const getTrainerMyClasses = async (trainerId) => {
  try {
    const response = serverFetch(`/api/classes/my-classes/${trainerId}`);
    return response;
  } catch (error) {
    console.error("Error fetching trainer's classes:", error);
    throw error;
  }
};
