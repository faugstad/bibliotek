import { rmSync } from "node:fs";

/**
 * Throws away the working copy. `lib/db.ts` builds a fresh one from
 * `data/seed.json` the next time anything reads, so this is how you get back to
 * a known demo state.
 */
const target = new URL("../data/db.json", import.meta.url);

rmSync(target, { force: true });
console.log("Removed data/db.json — it will be rebuilt from data/seed.json.");
