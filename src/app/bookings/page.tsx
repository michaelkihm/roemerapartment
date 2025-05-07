import * as actions from "@/actions";
import { auth } from "@/auth";
import BookingForm from "@/components/BookingForm";
import { parseToGermanDate } from "@/utils/date";
import { Button } from "@heroui/react";

export default async function Bookings() {
  const session = await auth();
  const bookings = await actions.getBookings();
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);

  if (!session) {
    return (
      <div>
        <h2 className="text-lg lg:text-3xl lg:font-bold">
          Du musst Dich erst anmelden um Buchung einzushen
        </h2>
        <div className="flex gap-2">
          <form action={actions.signIn}>
            <Button className="bg-green-700 text-white" type="submit">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start p-2">
      <div className="flex w-full justify-between">
        <h2 className="text-3xl font-bold">Buchungen</h2>
        <form action={actions.signOut}>
          <Button className="bg-gray-700 text-white" type="submit">
            Sign Out
          </Button>
        </form>
      </div>
      <BookingForm bookings={bookings} />

      <div className="py-2 lg:w-7/12">
        <p className="text-lg font-bold lg:text-3xl">Anstehende Buchungen</p>
        <ul className="flex flex-col gap-y-2 lg:gap-y-3">
          {bookings
            .filter((b) => new Date(b.from) >= currentDate)
            .sort(
              (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime(),
            )
            .map((booking) => (
              <li
                key={booking.id}
                className="flex justify-between bg-slate-200 py-1 text-xs shadow-sm lg:px-1 lg:text-base lg:shadow-lg"
              >
                <p>
                  {parseToGermanDate(booking.from)} -{" "}
                  {parseToGermanDate(booking.to)}:
                </p>
                <p>{booking.name}</p>
                {booking.email && (
                  <a
                    className="hover:text-blue-500"
                    href={`mailto:${booking.email}`}
                  >
                    {booking.email}
                  </a>
                )}
                {!booking.email && <p></p>}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
