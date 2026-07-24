import { lazy, Suspense, useEffect, useRef, useState } from "react";
import SEO from "@/shared/components/SEO";
import AboutUs from "./AboutUs";
import AdvisoryBoard from "./AdvisoryBoard";
import HeroSection from "./HeroSection";
import Leadership from "./Leadership";
import WhatWeDo from "./WhatWeDo";
import { getPublicCommittees } from "@/shared/services/publicApi";
import EventsMatchSection from "./Eventsmatchsection";
const ManagingCommittee = lazy(() => import("./ManagingCommitte"));
const Promoters = lazy(() => import("./Promoters"));
const SpecialMembersSection = lazy(() => import("./SpecialMember"));
const BecomeAMember = lazy(() => import("./Becomeamember"));
const GeneralMembers = lazy(() => import("./GeneralMembers"));
const SportsCommittee = lazy(() => import("./SportsCommittee"));
const BlogSection = lazy(() => import("./Blogsection"));
const ContactUs = lazy(() => import("./ContactUs"));

const preloadAboveFoldDeferredChunks = () =>
  Promise.allSettled([import("./ManagingCommitte"), import("./SpecialMember")]);

const DeferredSection = ({ children, minHeight = 320 }) => {
  const holderRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = holderRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "420px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={holderRef}
      style={{
        containIntrinsicSize: `${minHeight}px`,
        background: "#fff",
        border: "none",
        outline: "none",
        boxShadow: "none",
      }}
    >
      {visible ? (
        <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>
          {children}
        </Suspense>
      ) : (
        <div style={{ minHeight }} aria-hidden="true" />
      )}
    </section>
  );
};

const Home = () => {
  useEffect(() => {
    // Warm up first deferred sections and committee API cache in idle time.
    const load = () => {
      preloadAboveFoldDeferredChunks();
      getPublicCommittees().catch(() => {});
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(load, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const t = setTimeout(load, 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <SEO
        title="UDIISA | UDI International Sports Association | Sports NGO India"
        description="UDIISA (UDI International Sports Association) — sports NGO in India nurturing grassroots talent with coaching, mentorship, scholarships and athlete sponsorship."
        keywords="UDIISA official website, UDIISA Sports NGO, UDI International Sports Association, sports NGO India, athlete sponsorship India"
        schema={{
          "@context": "https://schema.org",
          "@type": "SportsOrganization",
          "name": "UDIISA",
          "alternateName": ["UDI International Sports Association", "UDIISA Sports NGO", "UDI Sports"],
          "url": "https://udisports.in/",
          "logo": "https://udisports.in/short-logo.webp",
          "description": "UDIISA is a sports NGO in India supporting players through mentorship, scholarships, opportunities, and community-driven programs.",
          "email": "info@udisports.in",
          "telephone": "+91-83075-98050",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "5091, 9th Floor, Tower 5, Parker Residency, Tehsil Rai",
            "addressLocality": "Sonipat",
            "addressRegion": "Haryana",
            "addressCountry": "IN"
          },
          "sameAs": [
            "https://www.facebook.com/share/14ZtTFp2Aii/?mibextid=wwXIfr",
            "https://www.instagram.com/udiisa_ngo/",
            "https://www.youtube.com/@udisportsin"
          ]
        }}
      />
      <HeroSection />
      <AboutUs />
      <Leadership />
      <AdvisoryBoard />
      <WhatWeDo />
 <DeferredSection minHeight={520}>
        <BlogSection />
      </DeferredSection>
      <DeferredSection minHeight={460}>
        <ManagingCommittee />
      </DeferredSection>  
      <DeferredSection minHeight={500}>
        <SpecialMembersSection />
      </DeferredSection>
      <DeferredSection minHeight={460}>
        <Promoters />
      </DeferredSection>
      <DeferredSection minHeight={420}>
        <BecomeAMember />
      </DeferredSection>
      <DeferredSection minHeight={540}>
        <GeneralMembers />
      </DeferredSection>
      <DeferredSection minHeight={460}>
        <SportsCommittee />
      </DeferredSection>
      <DeferredSection minHeight={460}>
        <EventsMatchSection />
      </DeferredSection>
     
      <DeferredSection minHeight={520}>
        <ContactUs />
      </DeferredSection>
    </>
  );
};

export default Home;