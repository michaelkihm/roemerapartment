import { DateValue } from "@heroui/react";

/**
 * Parse date to string of type YYYY-MM-DD. This date format is used in the database.
 * @param date
 * @returns string of type YYYY-MM-DD
 */
export const parseDateValue = (date: DateValue) => {
  const month = String(date.month).padStart(2, "0");
  const day = String(date.day).padStart(2, "0");
  return `${date.year}-${month}-${day}`;
};
