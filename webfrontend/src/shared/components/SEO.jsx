import { useLocation } from "react-router-dom";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  NGO_KEYWORDS,
  SITE_URL,
  organizationSchema,
  websiteSchema,
} from "../constants/seo";

/**
 * Central SEO helper — React 19 hoists these tags into <head>.
 * Brand search (UDIISA) + sports NGO intent + JSON-LD.
 */
const SEO = ({
  title,
  description,
  keywords,
  ogType = "website",
  ogImage,
  schema,
  canonical,
  noIndex = false,
  article,
}) => {
  const location = useLocation();

  const siteName = "UDIISA";
  const baseUrl = SITE_URL;
  const defaultTitle = DEFAULT_TITLE;
  const defaultDesc = DEFAULT_DESCRIPTION;
  const defaultKeywords = NGO_KEYWORDS;
  const defaultImage = `${SITE_URL}/short-logo.webp`;

  const path = location.pathname.replace(/\/+$/, "") || "/";
  const canonicalUrl = canonical || `${baseUrl}${path === "/" ? "/" : path}`;

  const metaTitle = title
    ? /udiisa/i.test(title)
      ? title
      : `${title} | UDIISA`
    : defaultTitle;

  const metaDesc = (description || defaultDesc).slice(0, 160);
  const metaKeywords = keywords
    ? `UDIISA, ${keywords}, ${defaultKeywords}`
    : defaultKeywords;
  const metaImage = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${baseUrl}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`
    : defaultImage;

  const pageSchemas = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [];
  const schemas = noIndex
    ? pageSchemas
    : [organizationSchema(), websiteSchema(), ...pageSchemas];

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <meta
        name="robots"
        content={
          noIndex
            ? "noindex,nofollow"
            : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        }
      />
      <meta name="author" content="UDIISA — UDI International Sports Association" />
      <meta name="application-name" content="UDIISA" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content="UDIISA" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />

      {/* Article extras for blog posts */}
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      {article?.section && (
        <meta property="article:section" content={article.section} />
      )}
      {Array.isArray(article?.tags) &&
        article.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </>
  );
};

export default SEO;
