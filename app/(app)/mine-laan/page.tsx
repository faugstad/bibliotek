import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Book02Icon, BookOpen01Icon } from "@hugeicons/core-free-icons";

import { LoanStatusCell } from "@/components/loan-status";
import { PageHeading } from "@/components/page-heading";
import { ColumnHead, IDENTITY_CELL, RecordCell } from "@/components/record-cell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireBorrower } from "@/lib/auth";
import { formatDate, formatKroner } from "@/lib/format";
import { listLoansForBorrower } from "@/lib/loans";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mine lån – Bibliotek",
  description: "Bøkene du har lånt, med frister og eventuelle gebyrer",
};

export default async function MyLoansPage() {
  const borrower = await requireBorrower();
  const loans = await listLoansForBorrower(borrower.id);
  const outstanding = loans
    .filter((loan) => loan.status !== "returned")
    .reduce((sum, loan) => sum + loan.lateFee, 0);

  return (
    <>
      <PageHeading title="Mine lån">
        Lån registrert på {borrower.name}. Gebyret er 10 kr for hver dag en bok
        er forsinket, og stopper på 200 kr.
      </PageHeading>

      {loans.length === 0 ? (
        <Empty className="border bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <HugeiconsIcon icon={BookOpen01Icon} strokeWidth={2} />
            </EmptyMedia>
            <EmptyTitle>Ingen lån ennå</EmptyTitle>
            <EmptyDescription>
              Du har ingen bøker ute og ingen lånehistorikk. Finn en tittel i
              samlingen for å låne den.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
              Se boklisten
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lånehistorikk</CardTitle>
            <CardDescription>
              {outstanding > 0
                ? `Du skylder ${formatKroner(outstanding)} i gebyr på lån som ikke er levert.`
                : "Ingen ubetalte gebyrer på lånene dine."}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <ColumnHead className="pl-(--card-spacing)">Tittel</ColumnHead>
                  <ColumnHead>Frist</ColumnHead>
                  <ColumnHead className="pr-(--card-spacing)">Status</ColumnHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell
                      className={`py-3 pl-(--card-spacing) ${IDENTITY_CELL}`}
                    >
                      <RecordCell
                        icon={Book02Icon}
                        name={loan.book?.title ?? "Ukjent tittel"}
                        href={loan.book ? `/boker/${loan.book.id}` : undefined}
                      >
                        {loan.book?.author}
                      </RecordCell>
                    </TableCell>
                    <TableCell className="py-3 tabular-nums">
                      {formatDate(loan.dueAt)}
                    </TableCell>
                    <TableCell className="py-3 pr-(--card-spacing)">
                      <LoanStatusCell loan={loan} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}
