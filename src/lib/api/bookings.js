export const checkBooking = async (email, classId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/check/${email}/${classId}`);
  if (!res.ok) {
    throw new Error('Failed to check booking');
  }
  return res.json();
};

export const createBooking = async (bookingData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(errorData.error || 'Failed to create booking');
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const getUserBookings = async (email) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/my-bookings/${email}`);
  if (!res.ok) {
    throw new Error('Failed to fetch user bookings');
  }
  return res.json();
};

export const getAllBookings = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`);
  if (!res.ok) {
    throw new Error('Failed to fetch all bookings');
  }
  return res.json();
};
