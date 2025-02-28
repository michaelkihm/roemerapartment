import * as actions from "@/actions";
import BookingForm from "@/components/BookingForm";

export default async function Bookings() {
  const bookings = await actions.getBookings();
  return (
    <div className="flex flex-col items-start p-2">
      <h1 className="text-3xl font-bold">Buchungen</h1>
      <BookingForm bookings={bookings} />
    </div>
  );
}
