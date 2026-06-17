import { useState } from 'react';
import { Outlet, Navigate, useOutletContext } from 'react-router-dom';
import { AdminAuthProvider, useAdminAuth } from './context/AuthContext';
import AdminSidebar from './components/AdminSidebar';

function AdminShell() {
  const { isAuthenticated, loading } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="w-10 h-10 rounded-full border-2 border-blush-300 border-t-blush-600 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="lg:pl-64">
        <Outlet context={{ openMenu: () => setMobileOpen(true) }} />
      </div>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <AdminAuthProvider>
      <AdminShell />
    </AdminAuthProvider>
  );
}

export function useAdminLayout() {
  return useOutletContext() ?? {};
}
