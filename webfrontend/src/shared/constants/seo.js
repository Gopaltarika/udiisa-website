/** Shared SEO copy + JSON-LD for UDIISA (sports NGO). */

export const SITE_URL = "https://udisports.in";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_URL = `${SITE_URL}/short-logo.webp`;

export const ORG_NAME = "UDIISA";
export const ORG_LEGAL_NAME = "UDI International Sports Association";

export const BRAND_NAMES = [
  "UDIISA",
  "UDIISA NGO",
  "UDIISA official website",
  "UDI International Sports Association",
  "UDI ISA",
  "UDI-ISA",
  "UDI Sports",
  "UDIISA India",
  "UDIISA Sports NGO",
  "udisports",
];

export const NGO_KEYWORDS =
  "UDIISA, UDIISA NGO, UDIISA official website, UDIISA India, UDI International Sports Association, UDI ISA, UDI Sports, sports NGO India, sports NGO in India, non profit sports organization India, NGO for athletes India, athlete sponsorship NGO, sports scholarship NGO India, grassroots sports NGO, sports charity India, sports development NGO, NGO supporting sportspersons, youth sports NGO India, sports welfare organization India, donate to sports NGO";

export const DEFAULT_TITLE =
  "UDIISA | UDI International Sports Association | Sports NGO India";

export const DEFAULT_DESCRIPTION =
  "UDIISA (UDI International Sports Association) is a sports NGO in India supporting athletes through training, mentorship, scholarships and grassroots sports development. Official website of UDIISA.";

export const SAME_AS = [
  "https://www.facebook.com/share/14ZtTFp2Aii/?mibextid=wwXIfr",
  "https://www.instagram.com/udiisa_ngo/",
  "https://www.youtube.com/@udisportsin",
];

export const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "5091, 9th Floor, Tower 5, Parker Residency, Tehsil Rai",
  addressLocality: "Sonipat",
  addressRegion: "Haryana",
  postalCode: "131029",
  addressCountry: "IN",
};

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["NGO", "SportsOrganization"],
  "@id": ORG_ID,
  name: ORG_NAME,
  legalName: ORG_LEGAL_NAME,
  alternateName: BRAND_NAMES,
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
  },
  image: LOGO_URL,
  description: DEFAULT_DESCRIPTION,
  slogan: "United for Dynamic India",
  email: "info@udisports.in",
  telephone: "+91-83075-98050",
  foundingDate: "2026",
  keywords: NGO_KEYWORDS,
  knowsAbout: [
    "sports NGO India",
    "athlete sponsorship",
    "sports scholarships",
    "grassroots sports development",
    "youth sports",
    "sports mentorship",
    "UDIISA",
  ],
  areaServed: { "@type": "Country", name: "India" },
  address: POSTAL_ADDRESS,
  sameAs: SAME_AS,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-83075-98050",
    contactType: "customer service",
    email: "info@udisports.in",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "UDIISA",
  alternateName: BRAND_NAMES,
  url: `${SITE_URL}/`,
  inLanguage: "en-IN",
  description: DEFAULT_DESCRIPTION,
  publisher: { "@id": ORG_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blogs?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});
