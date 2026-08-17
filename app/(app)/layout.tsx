import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";
import { getCurrentBorrower } from "@/lib/auth";

/**
 * The shell every screen in the lending system shares. `/stil` sits outside
 * this group and brings its own chrome.
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentBorrower();

  return (
    <>
      <SiteHeader user={user} />
      <main className="mx-auto w-full max-w-225 flex-1 px-6 py-12">
        {children}
      </main>
    </>
  );
}
