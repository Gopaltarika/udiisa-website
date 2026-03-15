import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const SITE_URL = String(process.env.SITE_URL || "https://udisports.in").replace(/\/$/, "");
const DEFAULT_API_URL = `${SITE_URL}/api`;

const STATIC_ROUTES = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/about-us", changefreq: "weekly", priority: "0.8" },
  { path: "/committee", changefreq: "weekly", priority: "0.8" },
  { path: "/blogs", changefreq: "daily", priority: "0.8" },
  { path: "/contact-us", changefreq: "weekly", priority: "0.7" },
  { path: "/donate-now", changefreq: "weekly", priority: "0.7" },
  { path: "/talented-players", changefreq: "weekly", priority: "0.7" },
  { path: "/members/general-members", changefreq: "weekly", priority: "0.7" },
  { path: "/members/special-members", changefreq: "weekly", priority: "0.7" },
  { path: "/membership/individual-player", changefreq: "weekly", priority: "0.7" },
  { path: "/membership/individual-patron", changefreq: "weekly", priority: "0.7" },
  { path: "/membership/lifetime-corporate", changefreq: "weekly", priority: "0.7" },
  { path: "/terms-and-conditions", changefreq: "monthly", priority: "0.5" },
];

const normalizeApiBaseUrl = (rawUrl = "") => {
  const raw = String(rawUrl || "").trim();
  if (!raw) return DEFAULT_API_URL;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw.replace(/\/$/, "");
  if (raw.startsWith("/")) return `${SITE_URL}${raw}`.replace(/\/$/, "");
  if (raw.startsWith(":")) return `http://localhost${raw}`.replace(/\/$/, "");
  if (raw.startsWith("localhost") || raw.startsWith("127.0.0.1")) return `http://${raw}`.replace(/\/$/, "");
  return DEFAULT_API_URL;
};

const escapeXml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

async function getBlogSlugs(apiBaseUrl) {
  try {
    const url = `${apiBaseUrl}/public/blogs?page=1&limit=200`;
    const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
    if (!res.ok) return [];
    const data = await res.json();
    const blogs = Array.isArray(data?.blogs) ? data.blogs : [];
    return blogs
      .map((blog) => String(blog?.slug || "").trim())
      .filter(Boolean)
      .map((slug) => ({ path: `/blogs/${slug}`, changefreq: "weekly", priority: "0.6" }));
  } catch {
    return [];
  }
}

function buildSitemapXml(routes) {
  const urls = routes
    .map(
      ({ path: routePath, changefreq, priority }) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${routePath}`)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function main() {
  const webfrontendRoot = process.cwd();
  const publicDir = path.join(webfrontendRoot, "public");
  const outputFile = path.join(publicDir, "sitemap.xml");
  const apiBaseUrl = normalizeApiBaseUrl(process.env.SITEMAP_API_URL || process.env.VITE_API_URL);

  const blogRoutes = await getBlogSlugs(apiBaseUrl);
  const routeMap = new Map();
  [...STATIC_ROUTES, ...blogRoutes].forEach((route) => {
    if (!routeMap.has(route.path)) routeMap.set(route.path, route);
  });

  const finalRoutes = Array.from(routeMap.values());
  const xml = buildSitemapXml(finalRoutes);

  await mkdir(publicDir, { recursive: true });
  await writeFile(outputFile, xml, "utf8");
  console.log(`Sitemap generated: ${outputFile} (${finalRoutes.length} URLs)`);
}

main().catch((err) => {
  console.error("Sitemap generation failed:", err?.message || err);
  process.exitCode = 1;
});
