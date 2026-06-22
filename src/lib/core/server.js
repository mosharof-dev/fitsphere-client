const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

//  generic server fetch function for fetching data
export const serverFetch = async (path) => {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: {
        "x-api-secret": process.env.API_SECRET_KEY,
      },
    });
    return handleStatus(res);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

//  generic server mutation function for creating and updating data and deleting data
export const serverMutation = async (path, newData, method = "POST") => {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    console.log("status code", res.status);
    return handleStatus(res);
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};

const handleStatus = (res) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  }

  if (res.status === 403) {
    redirect("/forbidden");
  }

  return res.json();
};
