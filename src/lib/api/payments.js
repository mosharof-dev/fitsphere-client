"use server";

import { serverMutation } from "../core/server";

export const createCheckoutSession = async (paymentData) => {
  try {
    const res = await serverMutation(`/api/payments/create-checkout-session`, paymentData, "POST");
    return res;
  } catch (error) {
    throw new Error('Failed to create checkout session');
  }
};
