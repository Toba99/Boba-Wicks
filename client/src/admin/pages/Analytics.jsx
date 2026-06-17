import { useEffect, useState } from 'react';
import { adminApi } from '../api';
import { useAdminLayout } from '../AdminLayout';
import AdminHeader from '../components/AdminHeader';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import StatusBadge from '../components/StatusBadge';

export default function AdminAnalytics() {
  const { openMenu } = useAdminLayout();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.analytics().then(setData).finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <>
        <AdminHeader title="Analytics" onMenuClick={openMenu} />
        <div className="p-8 flex justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-blush-300 border-t-blush-600 animate-spin" />
        </div>
      </>
    );
  }

  const { overview, revenueByMonth, ordersByStatus, topProducts } = data;
  const statusTotal = Object.values(ordersByStatus).reduce((a, b) => a + b, 0);

  return (
    <>
      <AdminHeader title="Analytics" subtitle="Business performance insights" onMenuClick={openMenu} />
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Revenue (YTD)" value={`$${overview.totalRevenue.toLocaleString()}`} change={12} />
          <StatCard label="Avg order value" value={`$${overview.avgOrderValue}`} />
          <StatCard label="Conversion rate" value={`${overview.conversionRate}%`} change={0.4} />
          <StatCard label="Total orders" value={overview.totalOrders} change={8} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-blush-100 p-6 shadow-soft">
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-6">Monthly revenue</h2>
            <BarChart data={revenueByMonth} formatValue={(v) => `$${v.toLocaleString()}`} />
          </div>

          <div className="bg-white rounded-2xl border border-blush-100 p-6 shadow-soft">
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-6">Orders by status</h2>
            <div className="space-y-4">
              {Object.entries(ordersByStatus).map(([status, count]) => (
                <div key={status}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize text-ink-700">{status}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                  <div className="h-2 bg-blush-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blush-400 to-blush-500 rounded-full transition-all"
                      style={{ width: `${statusTotal ? (count / statusTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-blush-100 p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold text-ink-900 mb-6">Top products</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blush-100 text-left text-xs uppercase tracking-wider text-ink-500">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Units sold</th>
                  <th className="pb-3">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.id} className="border-b border-blush-50 last:border-0">
                    <td className="py-4 font-medium text-ink-900">{p.name}</td>
                    <td className="py-4 text-ink-600">{p.sales}</td>
                    <td className="py-4 text-blush-600 font-medium">${p.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-ink-500">Pending custom requests</p>
              <p className="font-display text-3xl font-semibold mt-1">{overview.pendingCustomRequests}</p>
            </div>
            <StatusBadge status="pending" />
          </div>
          <div className="glass rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-ink-500">Open inquiries</p>
              <p className="font-display text-3xl font-semibold mt-1">{overview.openInquiries}</p>
            </div>
            <StatusBadge status="open" />
          </div>
        </div>
      </div>
    </>
  );
}
