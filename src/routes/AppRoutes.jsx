import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebsiteLayout from "../shared/layouts/WebsiteLayout";
import AdminLayout from "../shared/layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../modules/website/pages/Home/Home";
import Dashboard from "../modules/admin/pages/Dashboard/Dashboard";
import Login from "../modules/auth/pages/Login/Login";
import Members from "../modules/website/pages/MembersPage/Members";
import TalentedPlayers from "../modules/website/pages/talentedplayers/TalentedPlayers";
import Main from "../modules/website/pages/BecomeAMember/Main";
import ContactUs from "../modules/website/pages/ContactUs/ContactUs";

const AppRoutes = () => {
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

        </Route>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN (PROTECTED) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;