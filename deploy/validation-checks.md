# Production validation checks

Run these after each deployment:

```bash
curl -I https://udisports.in/
curl -I https://udisports.in/admin/login
curl -I https://udisports.in/sitemap.xml
curl -I https://udisports.in/robots.txt
curl -sS https://udisports.in/api/health
```

Quick API payload checks:

```bash
curl -sS "https://udisports.in/api/public/blogs?page=1&limit=10" | jq '.blogs[0] | keys'
curl -sS "https://udisports.in/api/public/committees" | jq 'length'
curl -sS "https://udisports.in/api/public/members/general?type=players" | jq 'length'
```

Expected:

- `/`, `/admin/login`, `/sitemap.xml`, `/robots.txt` return `200` or valid redirect to `200`.
- `/api/health` returns `{"ok":true,...}`.
- `/api/public/blogs` list items do not include full HTML `content` field.
- Home page scrolling should not stay stuck on skeleton loaders.
