import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DIST_DIR = path.join(process.cwd(), "dist");

const REQUIRED_FILES = [
  "index.html",
  "sitemap.xml",
  "robots.txt",
  "about-us/index.html",
  "blogs/index.html",
  "contact-us/index.html",
];

const EXPECTED_SNIPPETS = [
  { file: "index.html", includes: ['<link rel="canonical" href="https://udisports.in/"'] },
  { file: "about-us/index.html", includes: ['<meta property="og:title" content="About UDIISA | Mission and Vision"'] },
  { file: "blogs/index.html", includes: ['<meta name="description" content="Read UDIISA blogs, stories, updates'] },
];

async function ensureFile(relativePath) {
  const absPath = path.join(DIST_DIR, relativePath);
  await stat(absPath);
  return absPath;
}

async function verifyFileContains(relativePath, includes) {
  const absPath = path.join(DIST_DIR, relativePath);
  const html = await readFile(absPath, "utf8");
  const missing = includes.filter((snippet) => !html.includes(snippet));
  return { relativePath, missing };
}

async function main() {
  const missingFiles = [];
  for (const file of REQUIRED_FILES) {
    try {
      await ensureFile(file);
    } catch {
      missingFiles.push(file);
    }
  }

  if (missingFiles.length) {
    throw new Error(`SEO verify failed. Missing files: ${missingFiles.join(", ")}`);
  }

  const snippetProblems = [];
  for (const item of EXPECTED_SNIPPETS) {
    const result = await verifyFileContains(item.file, item.includes);
    if (result.missing.length) {
      snippetProblems.push(`${item.file}: ${result.missing.join(" | ")}`);
    }
  }

  if (snippetProblems.length) {
    throw new Error(`SEO verify failed. Missing SEO tags:\n${snippetProblems.join("\n")}`);
  }

  console.log("SEO build verification passed");
}

main().catch((err) => {
  console.error(err?.message || err);
  process.exitCode = 1;
});
