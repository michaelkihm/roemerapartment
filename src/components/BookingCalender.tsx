"use client";
import { Calendar, DateValue } from "@heroui/react";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

type BookingCalenderProps = {
  bookings: { from: string; to: string }[];
};

export default function BookingCalender({ bookings }: BookingCalenderProps) {
  const disabledRanges: [DateValue, DateValue][] = bookings.map(
    ({ from, to }) => [parseDate(from), parseDate(to)],
  );

  const isDateUnavailable = (date: DateValue) => {
    return disabledRanges.some(
      ([from, to]) => date.compare(from) >= 0 && date.compare(to) <= 0,
    );
  };
  return (
    <Calendar
      classNames={{
        base: "rounded-none",
        cellButton: "data-[unavailable=true]:text-red-400",
      }}
      aria-label="Date (No Selection)"
      isDateUnavailable={isDateUnavailable}
      minValue={today(getLocalTimeZone())}
    />
  );
}
