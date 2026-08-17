import { listBooks } from "@/lib/loans";

/** Every title in the collection, each with its current availability. */
export async function GET() {
  return Response.json({ books: await listBooks() });
}
