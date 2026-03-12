import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TermsAndConditions from "../modules/website/pages/termscondition/TermsAndConditions";

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
const AppRoutes = () => {
  function RequireAuth({ children }) {
  const token = localStorage.getItem('adminToken')
  if (!token) return <Navigate to="/admin/login" replace />
  return children
}
  return (
    <BrowserRouter>
      <Suspense fallback={<div className=""></div>}>
        <Routes>
          {/* WEBSITE */}
          <Route element={<WebsiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/members/special-members" element={<Members />} />
            <Route path="/members/general-members" element={<Members />} />
            <Route path="/talented-players" element={<TalentedPlayers />} />
            <Route path="/membership/individual-patron" element={<Main />} />
            <Route path="/membership/individual-player" element={<Main />} />
            <Route path="/membership/lifetime-corporate" element={<Main />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blogs/*" element={<BlogRoutes />} />
            <Route path="/committee" element={<CommitteePage />} />
            <Route path="/donate-now" element={<DonateNow />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;