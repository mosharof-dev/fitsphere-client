"use server";

import { serverFetch } from "../core/server";

export async function getDashboardStats(role, email) {
  try {
    const data = await serverFetch(`/api/dashboard?role=${role}&email=${email}`);
    return data;
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return null;
  }
}
