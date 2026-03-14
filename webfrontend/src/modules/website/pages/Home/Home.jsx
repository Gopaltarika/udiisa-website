import { lazy, Suspense, useEffect, useRef, useState } from "react";
import AboutUs from "./AboutUs";
import AdvisoryBoard from "./AdvisoryBoard";
import HeroSection from "./HeroSection";
import Leadership from "./Leadership";
import WhatWeDo from "./WhatWeDo";

const ManagingCommittee = lazy(() => import("./ManagingCommitte"));
const Promoters = lazy(() => import("./Promoters"));
const SpecialMembersSection = lazy(() => import("./SpecialMember"));
const BecomeAMember = lazy(() => import("./Becomeamember"));
const GeneralMembers = lazy(() => import("./GeneralMembers"));
const SportsCommittee = lazy(() => import("./SportsCommittee"));
const BlogSection = lazy(() => import("./Blogsection"));
const ContactUs = lazy(() => import("./ContactUs"));
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
      { rootMargin: "260px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={holderRef}
      style={{ contentVisibility: "auto", containIntrinsicSize: `${minHeight}px` }}
    >
      {visible ? children : null}
    </section>
  );
};

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <Leadership />
      <AdvisoryBoard />
      <WhatWeDo />

      <Suspense fallback={null}>
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
        <DeferredSection minHeight={520}>
          <BlogSection />
        </DeferredSection>
        <DeferredSection minHeight={520}>
          <ContactUs />
        </DeferredSection>
      </Suspense>
    </>
  );
};

export default Home;