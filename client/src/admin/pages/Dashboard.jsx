import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../api';
import { useAdminLayout } from '../AdminLayout';
import AdminHeader from '../components/AdminHeader';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import StatusBadge from '../components/StatusBadge';

export default function AdminDashboard() {
  const { openMenu } = useAdminLayout();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.analytics().then(setData).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-blush-300 border-t-blush-600 animate-spin" />
      </div>
    );
  }

  const { overview, revenueByMonth, recentActivity } = data;

  return (
    <>
      <AdminHeader
        title="Dashboard"
        subtitle="Overview of your boba candle business"
        onMenuClick={openMenu}
      />
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          <StatCard label="Total Revenue" value={`$${overview.totalRevenue.toLocaleString()}`} change={12} icon="◈" />
          <StatCard label="Orders" value={overview.totalOrders} change={8} icon="▣" />
          <StatCard label="Products" value={overview.totalProducts} icon="◇" />
          <StatCard
            label="Open Items"
            value={overview.pendingCustomRequests + overview.openInquiries}
            icon="✦"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-blush-100 p-6 shadow-soft">
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-6">Revenue</h2>
            <BarChart
              data={revenueByMonth}
              formatValue={(v) => `$${(v / 1000).toFixed(1)}k`}
            />
          </div>

          <div className="bg-white rounded-2xl border border-blush-100 p-6 shadow-soft">
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">Quick links</h2>
            <ul className="space-y-2">
              {[
                { to: '/admin/orders', label: 'Manage orders' },
                { to: '/admin/custom-requests', label: 'Custom requests' },
                { to: '/admin/inquiries', label: 'Customer inquiries' },
                { to: '/admin/products', label: 'Edit products' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-ink-700 hover:bg-blush-50 transition-colors"
                  >
                    {label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-blush-100 p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">Recent activity</h2>
          <ul className="divide-y divide-blush-50">
            {recentActivity.map((item) => (
              <li key={`${item.type}-${item.id}`} className="flex items-center justify-between py-4 gap-4">
                <div>
                  <p className="font-medium text-ink-800">{item.label}</p>
                  <p className="text-xs text-ink-500 mt-0.5">
                    {new Date(item.time).toLocaleString()}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
