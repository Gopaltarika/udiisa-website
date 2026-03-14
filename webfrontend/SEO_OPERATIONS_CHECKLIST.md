# UDIISA SEO Operations Checklist

This checklist covers post-deploy SEO operations for `udisports.in`.

## 1) Immediate Post-Deploy (same day)

- Verify production sitemap is reachable:
  - `https://udisports.in/sitemap.xml`
- Verify robots file:
  - `https://udisports.in/robots.txt`
- Spot-check canonical tags on key URLs:
  - `/`
  - `/about-us`
  - `/committee`
  - `/blogs`
  - `/blogs/<slug>`
  - `/membership/individual-player`
  - `/membership/individual-patron`
  - `/membership/lifetime-corporate`
  - `/donate-now`
- Confirm old contribution URL redirects:
  - `/Contribute-now` -> `/donate-now` (301/308 redirect expected)

## 2) Google Search Console Actions

- Open GSC property for `https://udisports.in/`
- Submit sitemap:
  - `https://udisports.in/sitemap.xml`
- Use URL Inspection and click "Request indexing" for priority pages:
  - Home, About, Committee, Membership pages, Contact, latest 3 blogs
- Check Coverage/Pages report for:
  - "Crawled - currently not indexed"
  - "Duplicate without user-selected canonical"
  - "Alternate page with proper canonical"
- Resolve any canonical mismatch before requesting reindex.

## 3) Weekly SEO Hygiene

- Publish at least 1 brand-focused or membership-focused blog post.
- Ensure each blog has:
  - unique title
  - unique excerpt/description
  - meaningful category and tags
  - internal links to at least 2 key pages
- Re-run sitemap generation if route/content structure changed:
  - `npm run seo:generate-sitemap`

## 4) Monthly Optimization Loop

- In GSC > Performance:
  - Filter queries containing brand terms: `udiisa`, `udi sports`
  - Track impressions, clicks, CTR, avg position
- Improve low-CTR pages:
  - rewrite title (stronger intent + brand)
  - rewrite meta description (clear value + action)
- Improve pages with position 5-20:
  - add supporting internal links from blogs/footer/home sections
  - refresh content sections with updated copy and FAQs
- Re-submit updated URLs in URL Inspection.

## 5) Core Web Vitals Monitoring

- Check mobile CWV in Search Console monthly:
  - LCP
  - INP
  - CLS
- If regressions appear:
  - compress large images
  - ensure lazy-loading for below-the-fold media
  - avoid layout shifts by keeping image dimensions/aspect ratio

## 6) Quarterly SEO Audit

- Validate:
  - no duplicate titles/descriptions on key pages
  - sitemap route parity with live router
  - no orphan pages (important pages linked from nav/footer/content)
  - structured data still valid on blog detail pages
- Re-check DNS essentials:
  - SPF
  - DKIM
  - DMARC

## 7) Success Targets (Brand-first)

- Brand query dominance for `UDIISA` and close variants.
- Consistent indexing of all high-value pages.
- Monthly growth in non-branded impressions from blogs/membership content.
