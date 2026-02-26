import AboutUs from "./AboutUs";
import AdvisoryBoard from "./AdvisoryBoard";
import BecomeAMember from "./Becomeamember";
import BlogSection from "./Blogsection";
import ContactUs from "./ContactUs";
import GeneralMembers from "./GeneralMembers";
import HeroSection from "./HeroSection";
import Leadership from "./Leadership";
import ManagingCommittee from "./ManagingCommitte";
import Promoters from "./Promoters";
import SpecialMembersSection from "./SpecialMember";
import SportsCommittee from "./SportsCommittee";
import WhatWeDo from "./WhatWeDo";

const Home = () => {
  return (
    <>
     <HeroSection />
     <AboutUs />
     <Leadership />
     <AdvisoryBoard />
     <WhatWeDo />
     <ManagingCommittee />
     <Promoters />
     <SpecialMembersSection />
     <BecomeAMember />
     <GeneralMembers />
     <ContactUs />
     <SportsCommittee />
     <BlogSection />
    </>
  );
};

export default Home;