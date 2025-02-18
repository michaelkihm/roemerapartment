"use client";

import { Input, RangeCalendar, RangeValue } from "@heroui/react";
import { today, getLocalTimeZone, DateValue } from "@internationalized/date";
import { useState } from "react";
import * as actions from "@/actions";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [range, setRange] = useState<RangeValue<DateValue>>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  });

  const saveBooking = actions.createBooking.bind(
    null,
    name,
    range!.start.toDate(getLocalTimeZone()),
    range!.end.toDate(getLocalTimeZone()),
    email
  );

  const onRangeChange = (range: RangeValue<DateValue> | null) => {
    if (!range) return;
    setRange(range);
  };

  return (
    <div className="p-2 flex flex-col gap-2 max-w-96 items-center">
      <h3 className="font-bold">Buchung hinzufügen</h3>
      <Input
        variant="underlined"
        label="Name"
        placeholder="Name"
        type="name"
        value={name}
        onValueChange={setName}
      />
      <Input
        variant="underlined"
        label="Email"
        placeholder="Email"
        type="email"
        value={email}
        onValueChange={setEmail}
      />
      <RangeCalendar
        aria-label="Buchungszeit"
        minValue={today(getLocalTimeZone())}
        onChange={onRangeChange}
      />

      <form action={saveBooking}>
        <button
          type="submit"
          disabled={!name || range.start.day === range.end.day}
          className="w-96 bg-green-600 text-white rounded-lg p-2 hover:bg-green-500 disabled:bg-gray-300"
        >
          Hinzufügen
        </button>
      </form>
    </div>
  );
}
