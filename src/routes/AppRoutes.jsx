import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WebsiteLayout from "../shared/layouts/WebsiteLayout";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../modules/website/pages/Home/Home";
import Dashboard from "../modules/admin/pages/Dashboard";
import Login from "../modules/auth/pages/Login/Login";
import Members from "../modules/website/pages/MembersPage/Members";
import TalentedPlayers from "../modules/website/pages/talentedplayers/TalentedPlayers";
import Main from "../modules/website/pages/BecomeAMember/Main";
import ContactUs from "../modules/website/pages/ContactUs/ContactUs";
import BlogRoutes from "../modules/website/pages/blog/MainBlogs";
import AdminLayout from "../modules/admin/layout/AdminLayout";
import Players from "../modules/admin/pages/Players";
import GeneralMembers from "../modules/admin/pages/members/GeneralMembers";
import SpecialMembers from "../modules/admin/pages/members/SpecialMembers";
import ManagingCommittee from "../modules/admin/pages/members/ManagingCommittee";
import IncomingMembers from "../modules/admin/pages/incoming/IncomingMembers";
import IncomingContacts from "../modules/admin/pages/incoming/IncomingContacts";
import Blogs from "../modules/admin/pages/Blogs";
import Settings from "../modules/admin/pages/Settings";
import AboutUs from "../modules/website/pages/about/aboutus";

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
          <Route path="/members/managing-committee" element={<Members />} />
          <Route path="/members/special-members" element={<Members />} />
          <Route path="/members/general-members" element={<Members />} />
          <Route path="/talented-players" element={<TalentedPlayers />} />
          <Route path="/membership/general-member" element={<Main />} />
          <Route path="/membership/special-member" element={<Main />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
       <Route path="/blogs/*" element={<BlogRoutes />} />

        </Route>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN (PROTECTED) */}
       <Route
  path="/admin/*"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<Navigate to="dashboard" replace />} />
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="players" element={<Players />} />
  <Route path="members/general" element={<GeneralMembers />} />
  <Route path="members/special" element={<SpecialMembers />} />
  <Route path="members/committee" element={<ManagingCommittee />} />
  <Route path="incoming/members" element={<IncomingMembers />} />
  <Route path="incoming/contacts" element={<IncomingContacts />} />
  <Route path="blogs" element={<Blogs />} />
  <Route path="settings" element={<Settings />} />
</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;