import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("../modules/website/pages/Home/Home"));
const Members = lazy(() => import("../modules/website/pages/MembersPage/Members"));
const TalentedPlayers = lazy(() => import("../modules/website/pages/talentedplayers/TalentedPlayers"));
const Main = lazy(() => import("../modules/website/pages/BecomeAMember/Main"));
const ContactUs = lazy(() => import("../modules/website/pages/ContactUs/ContactUs"));
const BlogRoutes = lazy(() => import("../modules/website/pages/blog/MainBlogs"));
const AboutUs = lazy(() => import("../modules/website/pages/about/aboutus"));
const WebsiteLayout = lazy(() => import("../shared/layouts/WebsiteLayout"));
const CommitteePage = lazy(() => import("../modules/website/pages/committee/CommitteePage"));
const DonateNow = lazy(() => import("../modules/website/pages/donatenow/DonateNow"));
const TermsAndConditions = lazy(() => import("../modules/website/pages/termscondition/TermsAndConditions"));

const RouteFallback = () => (
  <div className="min-h-[40vh] flex items-center justify-center text-slate-500 text-[13px] font-semibold">
    Loading...
  </div>
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* WEBSITE */}
          <Route element={<WebsiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/members/special-members" element={<Members />} />
            <Route path="/members/general-members" element={<Members />} />
            <Route path="/members/special-members/:tab" element={<Members />} />
            <Route path="/talented-players" element={<TalentedPlayers />} />
            <Route path="/membership/individual-patron" element={<Main />} />
            <Route path="/membership/individual-player" element={<Main />} />
            <Route path="/membership/lifetime-corporate" element={<Main />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blogs/*" element={<BlogRoutes />} />
            <Route path="/committee" element={<CommitteePage />} />
            <Route path="/donate-now" element={<DonateNow />} />
            <Route path="/Contribute-now" element={<Navigate to="/donate-now" replace />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;