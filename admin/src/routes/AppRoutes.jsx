import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../modules/admin/pages/Login";
import Dashboard from "../modules/admin/pages/Dashboard";
import AdminLayout from "../modules/admin/layout/AdminLayout";
const AppRoutes = () => {
  function RequireAuth({ children }) {
  const token = localStorage.getItem('adminToken')
  if (!token) return <Navigate to="/admin/login" replace />
  return children
}
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/admin/dashboard" element={<AdminLayout />} />
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;