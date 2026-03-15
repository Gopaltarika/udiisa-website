import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildAbsoluteUrl, DEFAULT_IMAGE, getSeoForPath } from "../seo/seoConfig";

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
    const currentUrl = buildAbsoluteUrl(pathname);
    const matched = getSeoForPath(pathname);

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
