import { useEffect, useState } from 'react';
import { adminApi } from '../api';
import { useAdminLayout } from '../AdminLayout';
import AdminHeader from '../components/AdminHeader';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';

export default function AdminInquiries() {
  const { openMenu } = useAdminLayout();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = () => adminApi.inquiries.list().then((d) => setInquiries(d.inquiries)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const resolve = async (id) => {
    await adminApi.inquiries.update(id, { status: 'resolved' });
    setSelected(null);
    load();
  };

  const columns = [
    { key: 'name', label: 'From' },
    { key: 'subject', label: 'Subject', render: (r) => r.subject || '(no subject)' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'createdAt', label: 'Date', render: (r) => new Date(r.createdAt).toLocaleDateString() },
  ];

  return (
    <>
      <AdminHeader title="Customer Inquiries" subtitle="Contact form messages" onMenuClick={openMenu} />
      <div className="p-4 sm:p-6 lg:p-8">
        {loading ? (
          <div className="flex justify-center py-16"><div className="w-10 h-10 rounded-full border-2 border-blush-300 border-t-blush-600 animate-spin" /></div>
        ) : (
          <DataTable columns={columns} data={inquiries} onRowClick={setSelected} />
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Inquiry details" size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><p className="text-ink-500">Name</p><p className="font-medium">{selected.name}</p></div>
              <div><p className="text-ink-500">Email</p><a href={`mailto:${selected.email}`} className="text-blush-600">{selected.email}</a></div>
            </div>
            {selected.subject && <div><p className="text-ink-500 text-sm">Subject</p><p className="font-medium">{selected.subject}</p></div>}
            <div className="bg-blush-50/50 rounded-xl p-4">
              <p className="text-ink-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>
            <div className="flex items-center justify-between pt-4">
              <StatusBadge status={selected.status} />
              {selected.status !== 'resolved' && (
                <button type="button" onClick={() => resolve(selected.id)} className="btn-primary text-sm py-2 px-5">
                  Mark resolved
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
