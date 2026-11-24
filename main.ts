import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One debugging haiku, 5-7-5 syllables, plain text, three lines only.
const lines = [
  "Logs scroll past midnight", // Logs(1) scroll(1) past(1) mid-night(2) = 5
  "one breakpoint holds the whole truth", // one(1) break-point(2) holds(1) the(1) whole(1) truth(1) = 7
  "it was a typo", // it(1) was(1) a(1) ty-po(2) = 5
];
const haiku = lines.join("\n");

// The grader mounts the repo read-only, so write only to the output dir.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(target, haiku, "utf8");

// Read it back and refuse to pass silently if a byte is off.
const back = readFileSync(target, "utf8");
if (back !== haiku || back.split("\n").length !== 3) {
  throw new Error("entry.txt does not match the haiku exactly");
}
console.log(`wrote ${target} (${haiku.length} chars, 3 lines)`);
