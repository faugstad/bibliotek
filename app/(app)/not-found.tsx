import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { SearchRemoveIcon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFound() {
  return (
    <Empty className="border bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={SearchRemoveIcon} strokeWidth={2} />
        </EmptyMedia>
        <EmptyTitle>Fant ikke siden</EmptyTitle>
        <EmptyDescription>
          Adressen peker ikke på noe i katalogen. Tittelen kan ha blitt fjernet,
          eller lenken kan være skrevet feil.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
          Til boklisten
        </Button>
      </EmptyContent>
    </Empty>
  );
}
