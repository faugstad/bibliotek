/**
 * Date helpers shared by the business rules.
 *
 * Everything is measured in whole UTC days. A loan taken out at 09:15 and
 * returned at 23:50 on the due date is not a day late, so the clock time must
 * not leak into the day count.
 */

const MS_PER_DAY = 86_400_000;

export type DateInput = Date | string;

export function toDate(value: DateInput): Date {
  return value instanceof Date ? value : new Date(value);
}

/** Midnight UTC on the day `value` falls on. */
export function startOfDay(value: DateInput): number {
  const date = toDate(value);
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

/** Whole days from `from` to `to`. Negative when `to` comes first. */
export function daysBetween(from: DateInput, to: DateInput): number {
  return Math.round((startOfDay(to) - startOfDay(from)) / MS_PER_DAY);
}

/** A new timestamp `days` days after `value`, clock time preserved. */
export function addDays(value: DateInput, days: number): Date {
  const date = toDate(value);
  return new Date(date.getTime() + days * MS_PER_DAY);
}
