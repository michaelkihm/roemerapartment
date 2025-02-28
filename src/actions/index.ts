"use server";

import { db } from "@/db";
import { paths } from "@/paths";
import { BookingRequest } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { transport } from "@/mail";

/**
 * Creates a booking with the given details and navigates back to booking page.
 * @param name - The name of the person making the booking.
 * @param checkIn - The check-in date for the booking.
 * @param checkOut - The check-out date for the booking.
 * @param email - (Optional) The email address of the person making the booking.
 */
export const createBooking = async ({
  name,
  email,
  checkIn,
  checkOut,
}: BookingRequest) => {
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

/**
 * Sends a booking request email to the site owner.
 * @param request - The booking request details.
 */
export const sendBookingRequest = async (request: BookingRequest) => {
  console.log(process.env.EMAIL_USER);
  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New booking request",
    text: `New booking request from ${request.name} (${request.email}) for ${request.checkIn} to ${request.checkOut}`,
  });
};
