import { Routes, Route } from "react-router-dom";
import AdminLayout from "../shared/layouts/AdminLayout";
import Dashboard from "../modules/admin/pages/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;