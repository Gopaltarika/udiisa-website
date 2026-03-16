import process from "node:process";

const SITE = String(process.env.SITE_URL || "https://udisports.in").replace(/\/$/, "");

const URLS = [
  `${SITE}/`,
  `${SITE}/about-us`,
  `${SITE}/blogs`,
  `${SITE}/sitemap.xml`,
  `${SITE}/robots.txt`,
];

const mustContain = {
  [`${SITE}/`]: ["<title>", 'rel="canonical"'],
  [`${SITE}/about-us`]: ["About UDIISA", 'rel="canonical"'],
  [`${SITE}/sitemap.xml`]: ["<urlset", "<loc>"],
  [`${SITE}/robots.txt`]: ["User-agent", "Sitemap:"],
};

async function fetchText(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  const text = await res.text();
  return { ok: res.ok, status: res.status, text };
}

async function main() {
  const failures = [];

  for (const url of URLS) {
    try {
      const { ok, status, text } = await fetchText(url);
      if (!ok) {
        failures.push(`${url} -> HTTP ${status}`);
        continue;
      }
      const checks = mustContain[url] || [];
      for (const snippet of checks) {
        if (!text.includes(snippet)) failures.push(`${url} missing: ${snippet}`);
      }
    } catch (err) {
      failures.push(`${url} -> ${err?.message || err}`);
    }
  }

  if (failures.length) {
    console.error("Live SEO check failed:");
    failures.forEach((f) => console.error(`- ${f}`));
    process.exitCode = 1;
    return;
  }

  console.log("Live SEO check passed");
}

main();
