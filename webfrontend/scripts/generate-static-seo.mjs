import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import {
  SITE_URL,
  DEFAULT_IMAGE,
  getSeoForPath,
  normalizeCanonicalPath,
} from "../src/shared/seo/seoConfig.js";

const DIST_DIR = path.join(process.cwd(), "dist");
const INDEX_HTML_PATH = path.join(DIST_DIR, "index.html");
const SITEMAP_PATH = path.join(DIST_DIR, "sitemap.xml");
const DEFAULT_API_URL = `${SITE_URL}/api`;

const normalizeApiBaseUrl = (rawUrl = "") => {
  const raw = String(rawUrl || "").trim();
  if (!raw) return DEFAULT_API_URL;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw.replace(/\/$/, "");
  if (raw.startsWith("/")) return `${SITE_URL}${raw}`.replace(/\/$/, "");
  if (raw.startsWith(":")) return `http://localhost${raw}`.replace(/\/$/, "");
  if (raw.startsWith("localhost") || raw.startsWith("127.0.0.1")) return `http://${raw}`.replace(/\/$/, "");
  return DEFAULT_API_URL;
};

const ensureTrailingSlashless = (routePath = "/") => {
  if (routePath === "/") return "/";
  return routePath.replace(/\/+$/, "") || "/";
};

const parseSitemapPaths = async () => {
  try {
    const xml = await readFile(SITEMAP_PATH, "utf8");
    const locMatches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
    const paths = locMatches
      .map((item) => item.replace("<loc>", "").replace("</loc>", "").trim())
      .map((url) => {
        try {
          const parsed = new URL(url);
          return ensureTrailingSlashless(parsed.pathname || "/");
        } catch {
          return null;
        }
      })
      .filter(Boolean);
    return Array.from(new Set(paths));
  } catch {
    return ["/"];
  }
};

const getBlogMetadataMap = async (apiBaseUrl) => {
  const metadataMap = new Map();
  try {
    const url = `${apiBaseUrl}/public/blogs?page=1&limit=500`;
    const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
    if (!response.ok) return metadataMap;

    const data = await response.json();
    const blogs = Array.isArray(data?.blogs) ? data.blogs : [];

    blogs.forEach((blog) => {
      const slug = String(blog?.slug || "").trim();
      if (!slug) return;
      const routePath = `/blogs/${slug}`;
      const title = String(blog?.title || "").trim();
      const description = String(blog?.excerpt || "").trim();
      const image = String(blog?.image || "").trim();
      metadataMap.set(routePath, {
        title: title ? `${title} | UDIISA Blogs` : "UDIISA Blogs | News and Updates",
        description:
          description ||
          "Read UDIISA blogs, stories, updates, and insights from the sports ecosystem and community initiatives.",
        image: image || DEFAULT_IMAGE,
        type: "article",
      });
    });
  } catch {
    // ignore failures; keep static SEO defaults
  }

  return metadataMap;
};

const setTag = (html, regex, replacement) => {
  if (regex.test(html)) return html.replace(regex, replacement);
  return html.replace("</head>", `${replacement}\n  </head>`);
};

const escapeHtmlAttr = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const buildPageHtml = (template, routePath, blogMetaMap) => {
  const canonicalPath = normalizeCanonicalPath(routePath);
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const pageSeo = blogMetaMap.get(routePath) || getSeoForPath(routePath);
  const pageType = blogMetaMap.has(routePath) ? "article" : "website";

  let html = template;
  html = setTag(html, /<title>[\s\S]*?<\/title>/i, `    <title>${escapeHtmlAttr(pageSeo.title)}</title>`);
  html = setTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `    <meta name="description" content="${escapeHtmlAttr(pageSeo.description)}" />`
  );
  html = setTag(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `    <link rel="canonical" href="${escapeHtmlAttr(canonicalUrl)}" />`);
  html = setTag(html, /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i, `    <meta property="og:type" content="${pageType}" />`);
  html = setTag(html, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `    <meta property="og:title" content="${escapeHtmlAttr(pageSeo.title)}" />`);
  html = setTag(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `    <meta property="og:description" content="${escapeHtmlAttr(pageSeo.description)}" />`
  );
  html = setTag(html, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `    <meta property="og:url" content="${escapeHtmlAttr(canonicalUrl)}" />`);
  html = setTag(
    html,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `    <meta property="og:image" content="${escapeHtmlAttr(blogMetaMap.get(routePath)?.image || DEFAULT_IMAGE)}" />`
  );
  html = setTag(html, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `    <meta name="twitter:title" content="${escapeHtmlAttr(pageSeo.title)}" />`);
  html = setTag(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `    <meta name="twitter:description" content="${escapeHtmlAttr(pageSeo.description)}" />`
  );
  html = setTag(
    html,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `    <meta name="twitter:image" content="${escapeHtmlAttr(blogMetaMap.get(routePath)?.image || DEFAULT_IMAGE)}" />`
  );

  return html;
};

async function writeRouteHtml(routePath, html) {
  if (routePath === "/") return;
  const segments = routePath.split("/").filter(Boolean);
  const outputDir = path.join(DIST_DIR, ...segments);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "index.html"), html, "utf8");
}

async function main() {
  await stat(INDEX_HTML_PATH);
  const template = await readFile(INDEX_HTML_PATH, "utf8");
  const sitemapPaths = await parseSitemapPaths();
  const apiBaseUrl = normalizeApiBaseUrl(process.env.SITEMAP_API_URL || process.env.VITE_API_URL);
  const blogMetaMap = await getBlogMetadataMap(apiBaseUrl);
  const routePaths = Array.from(new Set(["/", ...sitemapPaths, ...blogMetaMap.keys()])).map(ensureTrailingSlashless);

  const rootHtml = buildPageHtml(template, "/", blogMetaMap);
  await writeFile(INDEX_HTML_PATH, rootHtml, "utf8");

  for (const routePath of routePaths) {
    if (routePath === "/") continue;
    const routeHtml = buildPageHtml(template, routePath, blogMetaMap);
    await writeRouteHtml(routePath, routeHtml);
  }

  console.log(`Static SEO pages generated: ${routePaths.length} routes`);
}

main().catch((err) => {
  console.error("Static SEO generation failed:", err?.message || err);
  process.exitCode = 1;
});
