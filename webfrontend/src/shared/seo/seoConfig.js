export const SITE_URL = "https://udisports.in";
export const DEFAULT_IMAGE = `${SITE_URL}/short-logo.webp`;

export const DEFAULT_SEO = {
  title: "UDIISA | Sports NGO India",
  description:
    "UDIISA is a sports NGO in India empowering Players through grassroots programs, mentorship, and opportunities.",
};

const SEO_BY_PATH = [
  {
    match: /^\/$/,
    title: "UDIISA | Sports NGO India",
    description:
      "UDIISA is a sports NGO in India supporting Players through mentorship, opportunities, and community-driven programs.",
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
    match: /^\/members\/general-members\/?$/,
    title: "General Members | UDIISA",
    description:
      "Explore UDIISA general members and the growing sports community supporting athlete development in India.",
  },
  {
    match: /^\/members\/special-members(\/.*)?$/,
    title: "Special Members | UDIISA",
    description:
      "Meet UDIISA special members including distinguished patrons, dignitaries, and corporate supporters.",
  },
  {
    match: /^\/talented-players\/?$/,
    title: "Talented Players | UDIISA",
    description:
      "Discover talented players supported by UDIISA through recognition, opportunities, and long-term sports growth programs.",
  },
  {
    match: /^\/membership\/individual-player\/?$/,
    title: "Individual Players Membership | UDIISA",
    description:
      "Apply for UDIISA Individual Players Membership and access structured programs, events, and athlete support opportunities.",
  },
  {
    match: /^\/membership\/individual-patron\/?$/,
    title: "Individual Patron Membership | UDIISA",
    description:
      "Join UDIISA Individual Patron Membership for premium access to sports initiatives, events, and leadership engagement.",
  },
  {
    match: /^\/membership\/lifetime-corporate\/?$/,
    title: "Lifetime Corporate Membership | UDIISA",
    description:
      "Partner with UDIISA through Lifetime Corporate Membership and support sports development with strategic impact.",
  },
  {
    match: /^\/contact-us\/?$/,
    title: "Contact UDIISA | Get in Touch",
    description:
      "Contact UDIISA for memberships, partnerships, or support. Reach us via phone, email, or contact form.",
  },
  {
    match: /^\/donate-now\/?$/,
    title: "Donate to UDIISA | Support Players",
    description:
      "Support UDIISA initiatives by donating to help talented Players with opportunities, mentorship, and resources.",
  },
  {
    match: /^\/Contribute-now\/?$/,
    title: "Donate to UDIISA | Support Players",
    description:
      "Support UDIISA initiatives by donating to help talented Players with opportunities, mentorship, and resources.",
  },
  {
    match: /^\/terms-and-conditions\/?$/,
    title: "Terms and Conditions | UDIISA",
    description:
      "Read UDIISA terms and conditions covering memberships, participation policies, and platform usage guidelines.",
  },
];

export const normalizeCanonicalPath = (pathname = "/") =>
  pathname === "/Contribute-now" ? "/donate-now" : pathname;

export const getSeoForPath = (pathname = "/") =>
  SEO_BY_PATH.find((item) => item.match.test(pathname)) || DEFAULT_SEO;

export const buildAbsoluteUrl = (pathname = "/") =>
  `${SITE_URL}${normalizeCanonicalPath(pathname)}`;
