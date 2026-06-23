import { serverFetch } from "../core/server";

export const getAllClasses = (queryParams = "") => {
  try {
    const endpoint = queryParams ? `/api/classes?${queryParams}` : "/api/classes";
    const response = serverFetch(endpoint);
    return response;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};
