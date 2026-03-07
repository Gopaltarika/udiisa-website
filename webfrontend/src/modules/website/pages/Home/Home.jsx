import PageHero from "../../../../shared/components/PageHero";
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
// MONGODB_URI=mongodb+srv://info_db_user:qR2mvJBP6qLRXwQl@cluster0.eb3vukj.mongodb.net/
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
     <SportsCommittee />
     <BlogSection />
     <ContactUs />

    </>
  );
};

export default Home;