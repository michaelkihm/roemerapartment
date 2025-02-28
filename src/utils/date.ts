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

/**
 * Parse date string of type YYYY-MM-DD to German format DD.MM.YYYY
 * @param date - The date string to parse (YYYY-MM-DD).
 * @returns The date string in format (DD.MM.YYYY).
 */
export const parseToGermanDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
};
