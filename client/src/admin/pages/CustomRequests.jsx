import { useEffect, useState, useMemo } from 'react';
import { adminApi } from '../api';
import { useAdminLayout } from '../AdminLayout';
import AdminHeader from '../components/AdminHeader';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';

const STATUSES = ['pending', 'in_review', 'approved', 'poured', 'shipped', 'cancelled'];

export default function AdminCustomRequests() {
  const { openMenu } = useAdminLayout();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const load = () =>
    adminApi.customRequests.list().then((d) => setRequests(d.requests)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const filtered = useMemo(
    () => (filter === 'all' ? requests : requests.filter((r) => r.status === filter)),
    [requests, filter]
  );

  const updateStatus = async (id, status) => {
    await adminApi.customRequests.update(id, { status });
    setSelected(null);
    load();
  };

  const columns = [
    { key: 'id', label: 'ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'name', label: 'Customer' },
    { key: 'labelName', label: 'Label', render: (r) => r.labelName || '—' },
    { key: 'estimatedPrice', label: 'Est.', render: (r) => `$${r.estimatedPrice}` },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'createdAt', label: 'Submitted', render: (r) => new Date(r.createdAt).toLocaleDateString() },
  ];

  return (
    <>
      <AdminHeader title="Custom Requests" subtitle="Bespoke candle orders from customers" onMenuClick={openMenu} />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex flex-wrap gap-2">
          {['all', ...STATUSES].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${
                filter === s ? 'bg-blush-500 text-white' : 'bg-white border border-blush-200'
              }`}
            >
              {s.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><div className="w-10 h-10 rounded-full border-2 border-blush-300 border-t-blush-600 animate-spin" /></div>
        ) : (
          <DataTable columns={columns} data={filtered} onRowClick={setSelected} />
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Custom scent details" size="lg">
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><p className="text-ink-500">Customer</p><p className="font-medium">{selected.name}</p></div>
              <div><p className="text-ink-500">Email</p><p className="font-medium">{selected.email}</p></div>
              <div><p className="text-ink-500">Base scent</p><p className="capitalize">{selected.baseScentId?.replace(/-/g, ' ')}</p></div>
              <div><p className="text-ink-500">Size / Jar</p><p>{selected.sizeId} / {selected.jarStyleId}</p></div>
              <div><p className="text-ink-500">Top notes</p><p>{selected.topNoteIds?.join(', ') || '—'}</p></div>
              <div><p className="text-ink-500">Estimated</p><p className="font-display text-xl">${selected.estimatedPrice}</p></div>
            </div>
            {selected.labelName && <div><p className="text-ink-500">Label</p><p>{selected.labelName}</p></div>}
            {selected.giftMessage && <div><p className="text-ink-500">Gift message</p><p className="italic">{selected.giftMessage}</p></div>}
            <div>
              <p className="font-medium mb-2">Update status</p>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => updateStatus(selected.id, s)}
                    className={`px-3 py-1.5 rounded-full text-sm capitalize ${
                      selected.status === s ? 'bg-blush-500 text-white' : 'border border-blush-200'
                    }`}
                  >
                    {s.replace(/_/g, ' ')}
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
