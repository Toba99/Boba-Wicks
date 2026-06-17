import { useEffect, useState, useMemo } from 'react';
import { adminApi } from '../api';
import { useAdminLayout } from '../AdminLayout';
import AdminHeader from '../components/AdminHeader';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';

const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrders() {
  const { openMenu } = useAdminLayout();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const load = () => adminApi.orders.list().then((d) => setOrders(d.orders)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return orders.filter((o) => {
      const matchStatus = statusFilter === 'all' || o.status === statusFilter;
      const matchSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [orders, statusFilter, search]);

  const updateStatus = async (id, status) => {
    await adminApi.orders.update(id, { status });
    setSelected(null);
    load();
  };

  const columns = [
    { key: 'id', label: 'Order', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'customerName', label: 'Customer' },
    { key: 'total', label: 'Total', render: (r) => `$${r.total}` },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'createdAt', label: 'Date', render: (r) => new Date(r.createdAt).toLocaleDateString() },
  ];

  return (
    <>
      <AdminHeader title="Orders" subtitle="Track and fulfil customer orders" onMenuClick={openMenu} />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="search"
            placeholder="Search orders…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field max-w-md"
          />
          <div className="flex flex-wrap gap-2">
            {['all', ...STATUSES].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
                  statusFilter === s ? 'bg-blush-500 text-white' : 'bg-white border border-blush-200 text-ink-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><div className="w-10 h-10 rounded-full border-2 border-blush-300 border-t-blush-600 animate-spin" /></div>
        ) : (
          <DataTable columns={columns} data={filtered} onRowClick={setSelected} emptyMessage="No orders match your filters." />
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Order ${selected?.id}`} size="lg">
        {selected && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><p className="text-ink-500">Customer</p><p className="font-medium">{selected.customerName}</p></div>
              <div><p className="text-ink-500">Email</p><p className="font-medium">{selected.email}</p></div>
              <div><p className="text-ink-500">Total</p><p className="font-display text-2xl font-semibold">${selected.total}</p></div>
              <div><p className="text-ink-500">Status</p><StatusBadge status={selected.status} /></div>
            </div>
            {selected.shippingAddress && (
              <div className="text-sm">
                <p className="text-ink-500 mb-1">Shipping</p>
                <p>{selected.shippingAddress}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-ink-700 mb-2">Items</p>
              <ul className="space-y-2">
                {selected.items.map((item, i) => (
                  <li key={i} className="flex justify-between text-sm bg-blush-50/50 px-4 py-2 rounded-lg">
                    <span>{item.name} × {item.quantity} ({item.size})</span>
                    <span>${item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-ink-700 mb-2">Update status</p>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => updateStatus(selected.id, s)}
                    className={`px-4 py-2 rounded-full text-sm capitalize ${
                      selected.status === s ? 'bg-blush-500 text-white' : 'border border-blush-200 hover:bg-blush-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
