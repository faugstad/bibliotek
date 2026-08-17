"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  BORROWER_COOKIE,
  BORROWER_COOKIE_MAX_AGE,
  getCurrentBorrower,
  homePathFor,
  isLibrarian,
  SIGNED_OUT,
} from "@/lib/auth";
import { createBorrower, getBorrower } from "@/lib/db";
import { errorSlug } from "@/lib/errors";
import type { RegisterState } from "@/lib/forms";
import { borrowBook, registerReturn } from "@/lib/loans";
import type { Role } from "@/lib/types";

/** Every screen that shows a loan or an availability count. */
function revalidateLoanViews(bookId?: string) {
  revalidatePath("/");
  revalidatePath("/mine-laan");
  revalidatePath("/admin");
  if (bookId) revalidatePath(`/boker/${bookId}`);
}

/** Lends the book on the detail page to whoever is browsing. */
export async function borrowBookAction(formData: FormData) {
  const bookId = String(formData.get("bookId") ?? "");
  const borrower = await getCurrentBorrower();
  if (!borrower) redirect("/logg-inn");

  const result = await borrowBook(bookId, borrower.id);

  if (!result.ok) {
    redirect(`/boker/${encodeURIComponent(bookId)}?feil=${errorSlug(result.error)}`);
  }

  revalidateLoanViews(bookId);
  redirect("/mine-laan");
}

/** Takes a book back in from the administration screen. */
export async function returnLoanAction(formData: FormData) {
  const actor = await getCurrentBorrower();
  if (!actor || !isLibrarian(actor)) redirect("/logg-inn");

  const loanId = String(formData.get("loanId") ?? "");
  const result = await registerReturn(loanId);

  if (!result.ok) {
    redirect(`/admin?feil=${errorSlug(result.error)}`);
  }

  revalidateLoanViews(result.loan.bookId);
  redirect("/admin");
}

/* ----------------------------------------------------------------- who am I --- */

/**
 * Becomes the chosen person. Stands in for a login: the demo has no passwords,
 * so picking a name from the register is the whole of it.
 */
export async function signInAction(formData: FormData) {
  const id = String(formData.get("borrowerId") ?? "");
  const borrower = await getBorrower(id);
  if (!borrower) redirect("/logg-inn?feil=ukjent-laaner");

  (await cookies()).set(BORROWER_COOKIE, borrower.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: BORROWER_COOKIE_MAX_AGE,
  });

  redirect(homePathFor(borrower));
}

/**
 * Marks the session as signed out. Writes a sentinel rather than deleting the
 * cookie — a deleted cookie is indistinguishable from a first visit, which the
 * seed fallback turns straight back into the first borrower.
 */
export async function signOutAction() {
  (await cookies()).set(BORROWER_COOKIE, SIGNED_OUT, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: BORROWER_COOKIE_MAX_AGE,
  });

  redirect("/logg-inn");
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Enrols a new person in the register. This is desk work — a librarian signing
 * someone up — not self-service registration, so it survives the move to real
 * authentication.
 */
export async function registerBorrowerAction(
  _previous: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const actor = await getCurrentBorrower();
  if (!actor || !isLibrarian(actor)) redirect("/logg-inn");

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const role: Role = formData.get("role") === "librarian" ? "librarian" : "borrower";
  const values = { name, email, role };

  if (name === "") {
    return { values, error: { field: "name", message: "Skriv inn navnet på låneren." } };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return {
      values,
      error: { field: "email", message: "Skriv en gyldig e-postadresse." },
    };
  }

  const borrower = await createBorrower({ name, email, role });

  if (!borrower) {
    return {
      values,
      error: {
        field: "email",
        message: "Adressen er allerede i bruk av en annen låner.",
      },
    };
  }

  revalidatePath("/admin/laanere");
  revalidatePath("/logg-inn");
  redirect(`/admin/laanere?ny=${encodeURIComponent(borrower.id)}`);
}
