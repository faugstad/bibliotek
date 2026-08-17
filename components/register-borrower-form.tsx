"use client";

import { useActionState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerBorrowerAction } from "@/lib/actions";
import { emptyRegisterState } from "@/lib/forms";

/**
 * Desk work: a librarian signs a new person up. On rejection the action hands
 * back which field was wrong and what was typed, so nothing is retyped.
 */
export function RegisterBorrowerForm() {
  const [state, action, pending] = useActionState(
    registerBorrowerAction,
    emptyRegisterState
  );
  const invalid = state.error?.field;

  return (
    <form action={action}>
      <Card>
        <CardHeader>
          <CardTitle>Ny låner</CardTitle>
          <CardDescription>
            Registrer en person i låneregisteret. De kan låne bøker med én gang,
            og dukker opp i listen over hvem du kan bruke systemet som.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid gap-7 sm:grid-cols-2">
              <Field data-invalid={invalid === "name" ? "true" : undefined}>
                <FieldLabel htmlFor="borrower-name">Navn</FieldLabel>
                <Input
                  id="borrower-name"
                  name="name"
                  defaultValue={state.values?.name}
                  placeholder="Fornavn Etternavn"
                  aria-invalid={invalid === "name" || undefined}
                  autoComplete="off"
                />
                {invalid === "name" ? (
                  <FieldError>{state.error?.message}</FieldError>
                ) : null}
              </Field>

              <Field data-invalid={invalid === "email" ? "true" : undefined}>
                <FieldLabel htmlFor="borrower-email">E-post</FieldLabel>
                <Input
                  id="borrower-email"
                  name="email"
                  type="email"
                  defaultValue={state.values?.email}
                  placeholder="navn@example.no"
                  aria-invalid={invalid === "email" || undefined}
                  autoComplete="off"
                />
                {invalid === "email" ? (
                  <FieldError>{state.error?.message}</FieldError>
                ) : (
                  <FieldDescription>
                    Brukes til å skille lånere fra hverandre. Må være unik.
                  </FieldDescription>
                )}
              </Field>
            </div>

            <Field className="sm:max-w-xs">
              <FieldLabel htmlFor="borrower-role">Rolle</FieldLabel>
              <Select name="role" defaultValue={state.values?.role ?? "borrower"}>
                <SelectTrigger id="borrower-role" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="borrower">Låner</SelectItem>
                  <SelectItem value="librarian">Bibliotekar</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>
                Bibliotekarer ser administrasjonen og kan registrere retur.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={pending}>
            <HugeiconsIcon icon={UserAdd01Icon} strokeWidth={2} />
            {pending ? "Registrerer …" : "Registrer låner"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
