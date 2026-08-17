import { getCurrentBorrower } from "@/lib/auth";
import { listLoansForBorrower } from "@/lib/loans";

/** The current borrower's loans, with status and late fee worked out. */
export async function GET() {
  const borrower = await getCurrentBorrower();
  if (!borrower) {
    return Response.json({ error: "signed-out" }, { status: 401 });
  }

  return Response.json({
    borrower,
    loans: await listLoansForBorrower(borrower.id),
  });
}
