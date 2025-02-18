"use client";

import { Input, RangeCalendar, RangeValue } from "@heroui/react";
import {
  today,
  getLocalTimeZone,
  DateValue,
  parseDate,
} from "@internationalized/date";
import { useState } from "react";
import * as actions from "@/actions";

export type BookingFormProps = {
  bookings: {
    id: number;
    name: string;
    from: string;
    to: string;
    email: string | null;
  }[];
};

const parseDateValue = (date: DateValue) => {
  // parse date to string of type YYYY-MM-DD
  const month = String(date.month).padStart(2, "0");
  const day = String(date.day).padStart(2, "0");
  return `${date.year}-${month}-${day}`;
};

const timeZone = () => getLocalTimeZone();

export default function BookingForm({ bookings }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [range, setRange] = useState<RangeValue<DateValue>>({
    start: today(timeZone()),
    end: today(timeZone()),
  });

  const saveBooking = actions.createBooking.bind(
    null,
    name,
    parseDateValue(range!.start),
    parseDateValue(range!.end),
    email
  );

  const onRangeChange = (range: RangeValue<DateValue> | null) => {
    if (!range) return;
    setRange(range);
  };

  const disabledRanges: [DateValue, DateValue][] = bookings.map(
    ({ from, to }) => [parseDate(from), parseDate(to)]
  );

  const isDateUnavailable = (date: DateValue) => {
    return disabledRanges.some(
      ([from, to]) => date.compare(from) >= 0 && date.compare(to) <= 0
    );
  };

  return (
    <div className="p-2 flex flex-col gap-2 ">
      <div className="flex lg:flex-row flex-col gap-2">
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
      </div>
      <RangeCalendar
        classNames={{
          content: "lg:w-[930px] lg:h-[400px]",
          base: "lg:w-[930px] rounded-sm",
          grid: "lg:w-[930px] lg:gap-4",
          cell: "text-sm lg:w-32 lg:h-12 lg:border lg:border-0.5px lg:border-gray-300 data-[disabled=true]:bg-red-300",
          cellButton:
            "lg:w-32 lg:h-12 data-[unavailable=true]:text-red-400 rounded",
          gridHeaderCell: "lg:w-32",
        }}
        aria-label="Date (International Calendar)"
        minValue={today(timeZone())}
        onChange={onRangeChange}
        isDateUnavailable={isDateUnavailable}
      />

      <form action={saveBooking}>
        <button
          type="submit"
          disabled={!name || range.start.day === range.end.day}
          className="lg:w-96 bg-green-600 text-white rounded-lg p-2 hover:bg-green-500 disabled:bg-gray-300"
        >
          Hinzufügen
        </button>
      </form>
    </div>
  );
}
