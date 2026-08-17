import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { LockKeyIcon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { Borrower } from "@/lib/types";

/**
 * What a plain borrower sees where the desk work lives. It says who you are and
 * hands you the way out, rather than a bare 404 — the point of the demo is to
 * be able to walk between the two roles.
 */
export function LibrarianRequired({ user }: { user: Borrower }) {
  return (
    <Empty className="border bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={LockKeyIcon} strokeWidth={2} />
        </EmptyMedia>
        <EmptyTitle>Bare for bibliotekarer</EmptyTitle>
        <EmptyDescription>
          Du er logget inn som {user.name}, som er en vanlig låner.
          Administrasjonen er forbeholdt bibliotekarer. Bytt til en bibliotekar
          for å se den.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button nativeButton={false} render={<Link href="/logg-inn" />}>
          Bytt bruker
        </Button>
      </EmptyContent>
    </Empty>
  );
}
