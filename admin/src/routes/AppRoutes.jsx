import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../modules/admin/pages/Login";
import Dashboard from "../modules/admin/pages/Dashboard";
import AdminLayout from "../modules/admin/layout/AdminLayout";
import Players from "../modules/admin/pages/Players";
import Blogs from "../modules/admin/pages/Blogs";
import Settings from "../modules/admin/pages/Settings";
import GeneralMembers from "../modules/admin/pages/members/GeneralMembers";
import SpecialMembers from "../modules/admin/pages/members/SpecialMembers";
import IncomingMembers from "../modules/admin/pages/incoming/IncomingMembers";
import IncomingContacts from "../modules/admin/pages/incoming/IncomingContacts";
import CommitteeAdmin from "../modules/admin/pages/committee/Committeeadmin";
import ForgotPassword from "../modules/admin/pages/Forgotpassword";

const AppRoutes = () => {
  function RequireAuth({ children }) {
    const token = localStorage.getItem("adminToken");
    if (!token) return <Navigate to="/admin/login" replace />;
    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="players" element={<Players />} />
          <Route path="committees" element={<CommitteeAdmin />} />
          <Route path="members/general" element={<GeneralMembers />} />
          <Route path="members/special" element={<SpecialMembers />} />
          <Route path="incoming/members" element={<IncomingMembers />} />
          <Route path="incoming/contacts" element={<IncomingContacts />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="settings" element={<Settings />} />
        </Route>
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;