import type { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  AlertCircleIcon,
  Logout02Icon,
  UserIcon,
  UserShield01Icon,
} from "@hugeicons/core-free-icons";

import { RoleBadge } from "@/components/role-badge";
import { ColumnHead, IDENTITY_CELL, RecordCell } from "@/components/record-cell";
import { PageHeading } from "@/components/page-heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { signInAction, signOutAction } from "@/lib/actions";
import { getCurrentBorrower } from "@/lib/auth";
import { getBorrowers } from "@/lib/db";
import { describeError } from "@/lib/errors";
import type { Borrower } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Logg inn – Bibliotek",
  description: "Velg rollen eller personen du vil bruke systemet som",
};

/** One of the two doors into the demo. */
type QuickPick = {
  person: Borrower;
  title: string;
  label: string;
  icon: IconSvgElement;
  description: string;
  variant: "default" | "outline";
};

export default async function SignInPage({ searchParams }: PageProps<"/logg-inn">) {
  const [people, current, { feil }] = await Promise.all([
    getBorrowers(),
    getCurrentBorrower(),
    searchParams,
  ]);
  const error = describeError(feil);

  // Pinned to whoever holds the role first, so the two buttons always lead
  // somewhere even after the register has been added to.
  const firstBorrower = people.find((person) => person.role === "borrower");
  const firstLibrarian = people.find((person) => person.role === "librarian");

  const quickPicks: QuickPick[] = [];

  if (firstBorrower) {
    quickPicks.push({
      person: firstBorrower,
      title: "Låner",
      label: "Logg inn som låner",
      icon: UserIcon,
      description:
        "Lån bøker fra samlingen, og følg med på egne frister og gebyrer.",
      variant: "default",
    });
  }

  if (firstLibrarian) {
    quickPicks.push({
      person: firstLibrarian,
      title: "Bibliotekar",
      label: "Logg inn som bibliotekar",
      icon: UserShield01Icon,
      description:
        "Alt en låner kan, og i tillegg skranken: registrer retur og legg inn nye lånere.",
      variant: "outline",
    });
  }

  return (
    <>
      <PageHeading title="Logg inn">
        Demoen har ingen passord. Velg en rolle for å komme rett i gang, eller
        logg inn som en bestemt person lenger nede. Du kan bytte når som helst.
      </PageHeading>

      {error ? (
        <Alert variant="destructive" className="mb-6">
          <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
          <AlertTitle>{error.title}</AlertTitle>
          <AlertDescription>{error.description}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        {quickPicks.map((pick) => (
          <Card key={pick.person.id}>
            <CardHeader>
              <CardTitle>{pick.title}</CardTitle>
              <CardDescription>{pick.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <RecordCell icon={pick.icon} name={pick.person.name}>
                {pick.person.email}
              </RecordCell>
              {pick.person.id === current?.id ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Dette er deg akkurat nå.
                </p>
              ) : null}
            </CardContent>
            <CardFooter>
              <form action={signInAction}>
                <input type="hidden" name="borrowerId" value={pick.person.id} />
                <Button type="submit" variant={pick.variant}>
                  {pick.label}
                </Button>
              </form>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Separator className="my-10" />

      <Card>
        <CardHeader>
          <CardTitle>Alle i registeret</CardTitle>
          <CardDescription>
            {current
              ? `Du er nå ${current.name}.`
              : "Du er ikke logget inn."}{" "}
            Nye lånere legges inn av en bibliotekar under Administrasjon.
          </CardDescription>
          {current ? (
            <CardAction>
              <form action={signOutAction}>
                <Button type="submit" variant="outline" size="sm">
                  <HugeiconsIcon icon={Logout02Icon} strokeWidth={2} />
                  Logg ut
                </Button>
              </form>
            </CardAction>
          ) : null}
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <ColumnHead className="pl-(--card-spacing)">Navn</ColumnHead>
                <ColumnHead>Rolle</ColumnHead>
                <ColumnHead className="pr-(--card-spacing) text-right">
                  Handling
                </ColumnHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {people.map((person) => (
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
                  <TableCell className="py-3 pr-(--card-spacing) text-right">
                    {person.id === current?.id ? (
                      <span className="text-muted-foreground">Innlogget nå</span>
                    ) : (
                      <form action={signInAction} className="inline-flex">
                        <input type="hidden" name="borrowerId" value={person.id} />
                        <Button
                          type="submit"
                          variant="outline"
                          size="xs"
                          aria-label={`Bruk systemet som ${person.name}`}
                        >
                          Bytt til
                        </Button>
                      </form>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
