import * as actions from "@/actions";
import { auth } from "@/auth";
import BookingForm from "@/components/BookingForm";
import { Button } from "@heroui/react";

export default async function Bookings() {
  const session = await auth();
  const bookings = await actions.getBookings();

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
    </div>
  );
}
