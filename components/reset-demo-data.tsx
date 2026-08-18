"use client";

import { useFormStatus } from "react-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AlertCircleIcon,
  Loading03Icon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { resetDemoDataAction } from "@/lib/actions";

/**
 * The card body. Split out because `useFormStatus` reads the state of the form
 * *above* it — called in the component that renders the `<form>`, it would
 * always report idle.
 *
 * Every part of the card answers to `pending`: the tile, the title and the
 * description. A spinner on its own says something is happening; it does not
 * say what, and this is the one action in the app that cannot be undone.
 */
function ResetCard() {
  const { pending } = useFormStatus();

  return (
    <Empty className="rounded-2xl border border-solid border-destructive/25 bg-card">
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="bg-destructive/10 text-destructive"
        >
          <HugeiconsIcon
            icon={pending ? Loading03Icon : AlertCircleIcon}
            strokeWidth={2}
            className={
              pending ? "animate-spin motion-reduce:animate-none" : undefined
            }
          />
        </EmptyMedia>
        <EmptyTitle>
          {pending ? "Tilbakestiller …" : "Tilbakestill demodata"}
        </EmptyTitle>
        <EmptyDescription>
          {pending
            ? "Skriver data/seed.json tilbake. Siden laster på nytt når det er gjort."
            : "Alle lån, returer og brukere som er registrert siden forrige tilbakestilling blir slettet. Handlingen kan ikke angres."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button type="submit" variant="destructive" disabled={pending}>
          {pending ? null : <HugeiconsIcon icon={RefreshIcon} strokeWidth={2} />}
          Tilbakestill nå
        </Button>
      </EmptyContent>
    </Empty>
  );
}

/**
 * The danger zone at the foot of the administration.
 *
 * The wording says *demo data*, not *register*. Wiping the database is not
 * something a librarian does to a library; calling it desk work would be a lie
 * about what the button is for.
 */
export function ResetDemoData() {
  return (
    <form action={resetDemoDataAction}>
      <ResetCard />
    </form>
  );
}
