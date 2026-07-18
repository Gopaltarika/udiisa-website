import { useLocation } from "react-router-dom";

const SEO = ({ title, description, keywords, ogType = "website", ogImage, schema }) => {
  const location = useLocation();

  const siteName = "UDIISA Sports NGO";
  const defaultTitle = "UDIISA | Sports NGO in India";
  const defaultDesc = "UDIISA is a premier sports NGO in India supporting young talented athletes through professional coaching, mentorship, sponsorships, and sports development.";
  const defaultKeywords = "sports NGO, sports charity, grassroots sports, athlete sponsorship, NGO India, youth sports, sports training NGO, boxing NGO, athletics NGO, cricket NGO, Haryana sports, support Indian sports, donate to sports, sports community India";
  const defaultImage = "https://udisports.in/short-logo.webp";
  const baseUrl = "https://udisports.in";

  const metaTitle = title ? `${title} | UDIISA` : defaultTitle;
  const metaDesc = description || defaultDesc;
  const metaKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
  const canonicalUrl = `${baseUrl}${location.pathname}`;
  const metaImage = ogImage || defaultImage;

  return (
    <>
      {/* Primary Metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />

      {/* Dynamic JSON-LD Structured Data for AI & Search Engines */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </>
  );
};

export default SEO;
