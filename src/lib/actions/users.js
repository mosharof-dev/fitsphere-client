"use server";

import { headers } from "next/headers";
import { auth, db } from "../auth";
import { revalidatePath } from "next/cache";
import { MongoClient, ObjectId } from "mongodb";

export const updateUserRole = async (userId, role) => {
  const data = await auth.api.setRole({
    body: {
      userId: userId,
      role: role,
    },
    headers: await headers(),
  });
  revalidatePath("/dashboard/admin/manage-users");
  return data;
};

export const updateUserStatus = async (userId, status) => {
  try {
    // Attempt 1: string _id (better-auth default)
    let result = await db.collection("user").updateOne(
      { _id: userId },
      { $set: { status: status } }
    );
    
    // Attempt 2: string id 
    if (result.matchedCount === 0) {
      result = await db.collection("user").updateOne(
        { id: userId },
        { $set: { status: status } }
      );
    }
    
    // Attempt 3: ObjectId _id
    if (result.matchedCount === 0 && ObjectId.isValid(userId)) {
      result = await db.collection("user").updateOne(
        { _id: new ObjectId(userId) },
        { $set: { status: status } }
      );
    }

    // Attempt 4 & 5: Try 'users' collection in case they use plural
    if (result.matchedCount === 0) {
      result = await db.collection("users").updateOne(
        { _id: userId },
        { $set: { status: status } }
      );
    }
    
    if (result.matchedCount === 0 && ObjectId.isValid(userId)) {
      result = await db.collection("users").updateOne(
        { _id: new ObjectId(userId) },
        { $set: { status: status } }
      );
    }

  } catch (error) {
    console.error("Error updating user status:", error);
    throw new Error("Failed to update user status");
  }
  
  revalidatePath("/dashboard/admin/manage-users");
  return { success: true };
};

