import type { Book, Loan } from "@/lib/types";

/** A loan is active until the book is handed back. */
export function isActive(loan: Loan): boolean {
  return loan.returnedAt === null;
}

/** How many copies of `bookId` are out right now. */
export function countActiveLoans(loans: Loan[], bookId: string): number {
  return loans.filter((loan) => isActive(loan) && loan.bookId === bookId).length;
}

/**
 * Copies left on the shelf: the total minus the ones on loan. Clamped at zero
 * so a catalogue error (more loans than copies) never reads as negative stock.
 */
export function countAvailableCopies(book: Book, loans: Loan[]): number {
  return Math.max(0, book.copies - countActiveLoans(loans, book.id));
}

/** Whether the book can be borrowed at all. */
export function isBookAvailable(book: Book, loans: Loan[]): boolean {
  return countAvailableCopies(book, loans) > 0;
}
