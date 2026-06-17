import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './context/AuthContext';
import AdminLayout from './AdminLayout';
import AdminLogin from './pages/Login';
import AdminDashboard from './pages/Dashboard';
import AdminAnalytics from './pages/Analytics';
import AdminProducts from './pages/Products';
import AdminCategories from './pages/Categories';
import AdminOrders from './pages/Orders';
import AdminCustomRequests from './pages/CustomRequests';
import AdminInquiries from './pages/Inquiries';
import AdminHomepage from './pages/Homepage';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <AdminAuthProvider>
            <AdminLogin />
          </AdminAuthProvider>
        }
      />
      <Route
        path="/*"
        element={
          <AdminLayout />
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="custom-requests" element={<AdminCustomRequests />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="homepage" element={<AdminHomepage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}
