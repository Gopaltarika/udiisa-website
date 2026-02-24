import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebsiteLayout from "../shared/layouts/WebsiteLayout";
import AdminLayout from "../shared/layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../modules/website/pages/Home/Home";
import Dashboard from "../modules/admin/pages/Dashboard/Dashboard";
import Login from "../modules/auth/pages/Login/Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* WEBSITE */}
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
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