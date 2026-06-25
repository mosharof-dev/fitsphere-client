export const createCheckoutSession = async (paymentData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payments/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });
  if (!res.ok) {
    throw new Error('Failed to create checkout session');
  }
  return res.json();
};
