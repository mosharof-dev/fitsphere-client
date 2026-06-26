"use server";

import { serverFetch, serverMutation } from "../core/server";

export const checkBooking = async (email, classId) => {
  try {
    const res = await serverFetch(`/api/bookings/check/${email}/${classId}`);
    return res;
  } catch (error) {
    throw new Error('Failed to check booking');
  }
};

export const createBooking = async (bookingData) => {
  try {
    const res = await serverMutation(`/api/bookings`, bookingData, "POST");
    return res;
  } catch (error) {
    throw new Error('Failed to create booking');
  }
};

export const getUserBookings = async (email) => {
  try {
    const res = await serverFetch(`/api/bookings/my-bookings/${email}`);
    return res;
  } catch (error) {
    throw new Error('Failed to fetch user bookings');
  }
};

export const getAllBookings = async () => {
  try {
    const res = await serverFetch(`/api/bookings`);
    return res;
  } catch (error) {
    throw new Error('Failed to fetch all bookings');
  }
};
