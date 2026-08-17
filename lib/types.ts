/** The domain model. Every date is a full ISO 8601 timestamp in UTC. */

export type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  year: number;
  copies: number;
};

/**
 * What a person is allowed to do. A librarian is still a borrower — the role
 * only adds the desk work on top, so both live in the same register.
 */
export type Role = "borrower" | "librarian";

export type Borrower = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type Loan = {
  id: string;
  bookId: string;
  borrowerId: string;
  borrowedAt: string;
  dueAt: string;
  /** `null` while the book is still out. */
  returnedAt: string | null;
};

/** The shape of `data/seed.json` and `data/db.json`. */
export type Database = {
  books: Book[];
  borrowers: Borrower[];
  loans: Loan[];
};
