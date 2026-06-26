import { redirect } from "next/navigation";
import { cookies } from "next/headers";
const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

//  generic server fetch function for fetching data
export const serverFetch = async (path) => {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_URL}${path}`, {
      headers: {
        Cookie: cookieString,
      },
      credentials: "include",
    });
    return handleStatus(res);
  } catch (error) {
    if (error?.message === "NEXT_REDIRECT") throw error;
    console.error("Error fetching data:", error);
    throw error;
  }
};

//  generic server mutation function for creating and updating data and deleting data
export const serverMutation = async (path, newData, method = "POST") => {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_URL}${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString,
      },
      credentials: "include",
      body: JSON.stringify(newData),
    });

    console.log("status code", res.status);
    return handleStatus(res);
  } catch (error) {
    if (error?.message === "NEXT_REDIRECT") throw error;
    console.error("Error creating/updating data:", error);
    throw error;
  }
};

const handleStatus = (res) => {
  if (res.status === 401) {
    redirect("/login");
  }

  if (res.status === 403) {
    redirect("/forbidden");
  }

  return res.json();
};
