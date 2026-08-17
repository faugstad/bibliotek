import { daysBetween, type DateInput } from "@/lib/dates";
import type { Loan } from "@/lib/types";

/** Kroner charged for every whole day past the due date. */
export const LATE_FEE_PER_DAY = 10;

/** No loan ever costs more than this, however long it is kept. */
export const LATE_FEE_CAP = 200;

/**
 * Whole days a loan is past its due date, measured against the return date if
 * the book is back, otherwise against `today`. Never negative.
 */
export function daysOverdue(loan: Loan, today: DateInput): number {
  const end = loan.returnedAt ?? today;
  return Math.max(0, daysBetween(loan.dueAt, end));
}

/**
 * The late fee in kroner: 10 kr per day past the due date, capped at 200 kr.
 *
 * A returned loan keeps the fee it had on the day it came back — the debt stops
 * growing once the book is on the shelf again.
 */
export function calculateLateFee(loan: Loan, today: DateInput): number {
  return Math.min(daysOverdue(loan, today) * LATE_FEE_PER_DAY, LATE_FEE_CAP);
}
