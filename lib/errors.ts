import type { LoanError } from "@/lib/loans";

/**
 * A failed borrow or return sends the reader back to the page they came from
 * with a `?feil=` marker, so the message survives the redirect without turning
 * the page into a client component.
 */

const slugs: Record<LoanError, string> = {
  "book-not-found": "ukjent-bok",
  "no-copies-available": "ingen-eksemplarer",
  "loan-not-found": "ukjent-laan",
  "already-returned": "allerede-levert",
};

const messages: Record<string, { title: string; description: string }> = {
  "ukjent-bok": {
    title: "Fant ikke boken",
    description:
      "Tittelen finnes ikke lenger i katalogen. Ingen ting ble lånt ut. Gå tilbake til boklisten og prøv på nytt.",
  },
  "ingen-eksemplarer": {
    title: "Ingen eksemplarer å låne ut",
    description:
      "Det siste eksemplaret ble lånt ut i mellomtiden. Lånet ble ikke registrert. Prøv igjen når et eksemplar er levert tilbake.",
  },
  "ukjent-laan": {
    title: "Fant ikke lånet",
    description:
      "Lånet finnes ikke i registeret. Returen ble ikke registrert. Oppdater siden og kontroller listen over aktive lån.",
  },
  "ukjent-laaner": {
    title: "Fant ikke låneren",
    description:
      "Personen står ikke i registeret lenger. Du er ikke logget inn. Velg en annen i listen under.",
  },
  "allerede-levert": {
    title: "Lånet er allerede levert",
    description:
      "Boken ble registrert som levert av noen andre. Ingen ting er endret, og eksemplaret står i hyllen.",
  },
};

export function errorSlug(error: LoanError): string {
  return slugs[error];
}

export function describeError(slug: string | string[] | undefined) {
  if (typeof slug !== "string") return null;
  return messages[slug] ?? null;
}
