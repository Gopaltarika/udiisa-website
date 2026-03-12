import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://udisports.in";
const DEFAULT_IMAGE = `${SITE_URL}/short-logo.webp`;

const SEO_BY_PATH = [
  {
    match: /^\/$/,
    title: "UDIISA | Sports NGO India",
    description:
      "UDIISA is a sports NGO in India supporting athletes through mentorship, opportunities, and community-driven programs.",
  },
  {
    match: /^\/about-us\/?$/,
    title: "About UDIISA | Mission and Vision",
    description:
      "Learn about UDIISA's mission to identify and support sports talent across India with structured programs and guidance.",
  },
  {
    match: /^\/committee\/?$/,
    title: "UDIISA Committees | Organizational Structure",
    description:
      "Explore UDIISA's committees and leadership structure driving sports development, governance, and outreach.",
  },
  {
    match: /^\/blogs\/?/,
    title: "UDIISA Blogs | News and Updates",
    description:
      "Read UDIISA blogs, stories, updates, and insights from the sports ecosystem and community initiatives.",
  },
  {
    match: /^\/contact-us\/?$/,
    title: "Contact UDIISA | Get in Touch",
    description:
      "Contact UDIISA for memberships, partnerships, or support. Reach us via phone, email, or contact form.",
  },
  {
    match: /^\/donate-now\/?$/,
    title: "Donate to UDIISA | Support Athletes",
    description:
      "Support UDIISA initiatives by donating to help talented athletes with opportunities, mentorship, and resources.",
  },
];

const DEFAULT_SEO = {
  title: "UDIISA | Sports NGO India",
  description:
    "UDIISA is a sports NGO in India empowering athletes through grassroots programs, mentorship, and opportunities.",
};

const getOrCreateMeta = (name, attr = "name") => {
  const selector = `meta[${attr}="${name}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  return el;
};

const setCanonical = (url) => {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
};

export default function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname || "/";
    const currentUrl = `${SITE_URL}${pathname}`;
    const matched = SEO_BY_PATH.find((item) => item.match.test(pathname)) || DEFAULT_SEO;

    document.title = matched.title;
    setCanonical(currentUrl);

    getOrCreateMeta("description").setAttribute("content", matched.description);
    getOrCreateMeta("robots").setAttribute("content", "index,follow,max-image-preview:large");

    getOrCreateMeta("og:type", "property").setAttribute("content", "website");
    getOrCreateMeta("og:site_name", "property").setAttribute("content", "UDIISA");
    getOrCreateMeta("og:title", "property").setAttribute("content", matched.title);
    getOrCreateMeta("og:description", "property").setAttribute("content", matched.description);
    getOrCreateMeta("og:url", "property").setAttribute("content", currentUrl);
    getOrCreateMeta("og:image", "property").setAttribute("content", DEFAULT_IMAGE);

    getOrCreateMeta("twitter:card", "name").setAttribute("content", "summary_large_image");
    getOrCreateMeta("twitter:title", "name").setAttribute("content", matched.title);
    getOrCreateMeta("twitter:description", "name").setAttribute("content", matched.description);
    getOrCreateMeta("twitter:image", "name").setAttribute("content", DEFAULT_IMAGE);
  }, [location.pathname]);

  return null;
}
