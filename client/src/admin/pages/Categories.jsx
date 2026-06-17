import { useEffect, useState } from 'react';
import { adminApi } from '../api';
import { useAdminLayout } from '../AdminLayout';
import AdminHeader from '../components/AdminHeader';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';

export default function AdminCategories() {
  const { openMenu } = useAdminLayout();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', active: true });

  const load = () => adminApi.categories.list().then((d) => setCategories(d.categories)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', description: '', active: true });
    setModalOpen(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setForm({ name: cat.name, description: cat.description, active: cat.active !== false });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing) await adminApi.categories.update(editing.id, form);
      else await adminApi.categories.create(form);
      setModalOpen(false);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const columns = [
    { key: 'name', label: 'Category', render: (r) => (
      <div>
        <p className="font-medium text-ink-900">{r.name}</p>
        <p className="text-xs text-ink-500">{r.slug}</p>
      </div>
    )},
    { key: 'description', label: 'Description', render: (r) => (
      <span className="max-w-xs truncate block">{r.description}</span>
    )},
    { key: 'productCount', label: 'Products' },
    { key: 'active', label: 'Status', render: (r) => (
      <StatusBadge status={r.active !== false ? 'active' : 'inactive'} />
    )},
    {
      key: 'actions',
      label: '',
      render: (r) => (
        <button type="button" onClick={(e) => { e.stopPropagation(); openEdit(r); }} className="text-sm text-blush-600 hover:underline">
          Edit
        </button>
      ),
    },
  ];

  return (
    <>
      <AdminHeader
        title="Scent Categories"
        subtitle="Organise products by scent family"
        onMenuClick={openMenu}
        actions={<button type="button" onClick={openCreate} className="btn-primary text-sm py-2.5 px-5">+ Add category</button>}
      />
      <div className="p-4 sm:p-6 lg:p-8">
        {loading ? (
          <div className="flex justify-center py-16"><div className="w-10 h-10 rounded-full border-2 border-blush-300 border-t-blush-600 animate-spin" /></div>
        ) : (
          <DataTable columns={columns} data={categories} onRowClick={openEdit} />
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit category' : 'New category'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input className="input-field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea className="input-field resize-none" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.active !== false} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-blush-500" />
            <span className="text-sm">Active</span>
          </label>
          <button type="submit" className="btn-primary w-full">Save</button>
        </form>
      </Modal>
    </>
  );
}
