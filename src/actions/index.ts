"use server";

import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Creates a booking with the given details and navigates back to booking page.
 * @param name - The name of the person making the booking.
 * @param checkIn - The check-in date for the booking.
 * @param checkOut - The check-out date for the booking.
 * @param email - (Optional) The email address of the person making the booking.
 */
export const createBooking = async (
  name: string,
  checkIn: string,
  checkOut: string,
  email?: string
) => {
  await db.bookings.create({
    data: {
      name,
      email,
      from: checkIn,
      to: checkOut,
    },
  });

  // navigate back to bookings page
  revalidatePath(paths.bookings());
  redirect(paths.bookings());
};

export const getBookings = async () => await db.bookings.findMany();
