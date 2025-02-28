"use server";

import { db } from "@/db";
import { transport } from "@/mail";
import { paths } from "@/paths";
import { BookingRequest } from "@/types";
import { parseToGermanDate } from "@/utils/date";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
export const sendBookingRequest = async (request: Required<BookingRequest>) => {
  try {
    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: request.email,
      subject: "Buchungsanfrage Römerapartment Reil",
      text: `Hallo ${
        request.name
      },\n\nVielen Dank für Deine Buchungsanfrage vom ${parseToGermanDate(
        request.checkIn,
      )} bis zum ${parseToGermanDate(
        request.checkOut,
      )}. Wir werden uns in Kürze bei Dir melden.\n\nMit freundlichen Grüßen,\nRömerapartment Reil.`,
    });
  } catch (error) {
    console.error(error);
  }
};
