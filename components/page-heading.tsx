import type { ReactNode } from "react";

/** The title block every page opens with: serif h1 over one muted sentence. */
export function PageHeading({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8">
      <h1 className="font-heading text-3xl font-medium tracking-tight text-balance">
        {title}
      </h1>
      {children ? (
        <p className="mt-3 max-w-2xl text-sm/relaxed text-muted-foreground">
          {children}
        </p>
      ) : null}
    </div>
  );
}
