import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../modules/website/pages/Home/Home";
import Members from "../modules/website/pages/MembersPage/Members";
import TalentedPlayers from "../modules/website/pages/talentedplayers/TalentedPlayers";
import Main from "../modules/website/pages/BecomeAMember/Main";
import ContactUs from "../modules/website/pages/ContactUs/ContactUs";
import BlogRoutes from "../modules/website/pages/blog/MainBlogs";
import AboutUs from "../modules/website/pages/about/aboutus";
import WebsiteLayout from "../shared/layouts/WebsiteLayout";
import CommitteePage from "../modules/website/pages/committee/CommitteePage";
import DonateNow from "../modules/website/pages/donatenow/DonateNow";
const AppRoutes = () => {
  function RequireAuth({ children }) {
  const token = localStorage.getItem('adminToken')
  if (!token) return <Navigate to="/admin/login" replace />
  return children
}
  return (
    <BrowserRouter>
      <Routes>
        {/* WEBSITE */}
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/members/special-members" element={<Members />} />
          <Route path="/members/general-members" element={<Members />} />
          <Route path="/talented-players" element={<TalentedPlayers />} />
          <Route path="/membership" element={<Main />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
       <Route path="/blogs/*" element={<BlogRoutes />} />
<Route path="/committee" element={<CommitteePage />} />
<Route path="/donate-now" element={<DonateNow />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;