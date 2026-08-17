import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * The Bibliotek mark: three book spines on a shelf, the middle one in the
 * accent colour and the right one leaning into the gap.
 *
 * The neutrals are `currentColor`, so the mark takes the text colour of
 * whatever it sits in and stays correct in dark mode. Only the middle spine is
 * pinned to `primary`. Size it with a `size-*` class — the default is `size-6`.
 */
export function Logo({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-6", className)}
      {...props}
    >
      {/* Left spine */}
      <rect
        x="4.2"
        y="5.4"
        width="3.6"
        height="14.1"
        rx="1.15"
        className="fill-current"
      />
      {/* Middle spine — the one accented element in the whole mark */}
      <rect
        x="9"
        y="3.4"
        width="3.6"
        height="16.1"
        rx="1.15"
        className="fill-primary"
      />
      {/* Right spine, leaning */}
      <rect
        x="13.8"
        y="6.4"
        width="3.6"
        height="13.1"
        rx="1.15"
        transform="rotate(12 15.6 19.5)"
        className="fill-current"
      />
      {/* Shelf — drawn last so it caps the spines with a flat foot */}
      <rect
        x="3.2"
        y="18.4"
        width="17.6"
        height="2.2"
        rx="1.1"
        className="fill-current"
      />
    </svg>
  );
}

/**
 * The full lockup: mark plus the name in the heading serif. Use this wherever
 * the app names itself — header, sign-in, empty shells — so the spacing between
 * mark and word never drifts between screens.
 */
export function Wordmark({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 font-heading text-base font-medium tracking-tight",
        className
      )}
      {...props}
    >
      <Logo className="size-5" />
      Bibliotek
    </span>
  );
}
