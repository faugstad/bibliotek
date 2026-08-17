import type { Role } from "@/lib/types";

/**
 * The state the enrolment form hands back to itself between submissions: which
 * field was wrong, and what was typed, so nothing is lost on a rejection.
 */
export type RegisterState = {
  error?: { field: "name" | "email"; message: string };
  values?: { name: string; email: string; role: Role };
};

export const emptyRegisterState: RegisterState = {};
