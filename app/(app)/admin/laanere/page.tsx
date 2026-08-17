import type { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, UserIcon } from "@hugeicons/core-free-icons";

import { AdminNav } from "@/components/admin-nav";
import { LibrarianRequired } from "@/components/librarian-required";
import { PageHeading } from "@/components/page-heading";
import { ColumnHead, IDENTITY_CELL, RecordCell } from "@/components/record-cell";
import { RegisterBorrowerForm } from "@/components/register-borrower-form";
import { RoleBadge } from "@/components/role-badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { isActive } from "@/lib/availability";
import { isLibrarian, requireBorrower } from "@/lib/auth";
import { getBorrowers, getLoans } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lånere – Bibliotek",
  description: "Låneregisteret, og skjema for å registrere en ny låner",
};

export default async function BorrowersPage({
  searchParams,
}: PageProps<"/admin/laanere">) {
  const user = await requireBorrower();
  if (!isLibrarian(user)) {
    return (
      <>
        <PageHeading title="Lånere" />
        <LibrarianRequired user={user} />
      </>
    );
  }

  const [people, loans, { ny }] = await Promise.all([
    getBorrowers(),
    getLoans(),
    searchParams,
  ]);
  const enrolled = typeof ny === "string" ? people.find((p) => p.id === ny) : null;

  return (
    <>
      <PageHeading title="Lånere">
        Alle som er registrert i systemet, og hvor mange bøker de har ute.
      </PageHeading>
      <AdminNav />

      {enrolled ? (
        <Alert className="mb-6">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
          <AlertTitle>{enrolled.name} er registrert</AlertTitle>
          <AlertDescription>
            Låneren kan låne bøker med én gang, og ligger nå i listen over hvem
            du kan bruke systemet som.
          </AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Låneregisteret</CardTitle>
          <CardDescription>
            Sortert slik de ble lagt inn, med bibliotekarer merket.
          </CardDescription>
          <CardAction>
            <Badge variant="secondary">{people.length} personer</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <ColumnHead className="pl-(--card-spacing)">Navn</ColumnHead>
                <ColumnHead>Rolle</ColumnHead>
                <ColumnHead className="text-right">Ute nå</ColumnHead>
                <ColumnHead className="pr-(--card-spacing) text-right">
                  Lån totalt
                </ColumnHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {people.map((person) => {
                const mine = loans.filter((loan) => loan.borrowerId === person.id);
                const out = mine.filter(isActive).length;

                return (
                  <TableRow key={person.id}>
                    <TableCell
                      className={`py-3 pl-(--card-spacing) ${IDENTITY_CELL}`}
                    >
                      <RecordCell icon={UserIcon} name={person.name}>
                        {person.email}
                      </RecordCell>
                    </TableCell>
                    <TableCell className="py-3">
                      <RoleBadge role={person.role} />
                    </TableCell>
                    <TableCell className="py-3 text-right font-medium tabular-nums">
                      {out}
                    </TableCell>
                    <TableCell className="py-3 pr-(--card-spacing) text-right tabular-nums text-muted-foreground">
                      {mine.length}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-6">
        <RegisterBorrowerForm />
      </div>
    </>
  );
}
