import BookingForm from "@/components/BookingForm";
import * as actions from "@/actions";

export default async function Bookings() {
  const bookings = await actions.getBookings();
  return (
    <div className="p-2 flex flex-col items-start">
      <h1 className="text-3xl font-bold">Buchungen</h1>
      <BookingForm bookings={bookings} />
    </div>
  );
}
