import { useEffect, useState, useMemo } from 'react';
import { adminApi } from '../api';
import { useAdminLayout } from '../AdminLayout';
import AdminHeader from '../components/AdminHeader';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';

const EMPTY = {
  name: '',
  scentNotes: '',
  type: 'creamy',
  basePrice: 32,
  sizes: ['classic'],
  image: 'custom',
  badge: '',
  description: '',
  stock: 0,
  active: true,
};

export default function AdminProducts() {
  const { openMenu } = useAdminLayout();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => {
    Promise.all([adminApi.products.list(), adminApi.categories.list()])
      .then(([p, c]) => {
        setProducts(p.products);
        setCategories(c.categories);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((p) => {
      const matchType = filterType === 'all' || p.type === filterType;
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.scentNotes?.toLowerCase().includes(q);
      return matchType && matchSearch;
    });
  }, [products, search, filterType]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({
      ...product,
      sizes: product.sizes ?? ['classic'],
      badge: product.badge ?? '',
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        basePrice: Number(form.basePrice),
        stock: Number(form.stock),
        badge: form.badge || undefined,
        sizes: Array.isArray(form.sizes) ? form.sizes : form.sizes.split(',').map((s) => s.trim()),
      };
      if (editing) {
        await adminApi.products.update(editing.id, payload);
      } else {
        await adminApi.products.create(payload);
      }
      setModalOpen(false);
      load();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await adminApi.products.remove(id);
    load();
  };

  const columns = [
    { key: 'name', label: 'Product', render: (r) => (
      <div>
        <p className="font-medium text-ink-900">{r.name}</p>
        <p className="text-xs text-ink-500 capitalize">{r.type}</p>
      </div>
    )},
    { key: 'basePrice', label: 'Price', render: (r) => `$${r.basePrice}` },
    { key: 'stock', label: 'Stock' },
    { key: 'active', label: 'Status', render: (r) => (
      <StatusBadge status={r.active !== false ? 'active' : 'inactive'} />
    )},
    {
      key: 'actions',
      label: '',
      render: (r) => (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={() => openEdit(r)} className="text-sm text-blush-600 hover:underline">Edit</button>
          <button type="button" onClick={() => handleDelete(r.id)} className="text-sm text-red-500 hover:underline">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <AdminHeader
        title="Products"
        subtitle="Manage candle catalogue"
        onMenuClick={openMenu}
        actions={
          <button type="button" onClick={openCreate} className="btn-primary text-sm py-2.5 px-5">
            + Add product
          </button>
        }
      />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field max-w-md"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input-field max-w-xs capitalize"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 rounded-full border-2 border-blush-300 border-t-blush-600 animate-spin" />
          </div>
        ) : (
          <DataTable columns={columns} data={filtered} onRowClick={openEdit} />
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit product' : 'New product'} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input className="input-field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select className="input-field capitalize" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Base price *</label>
              <input type="number" className="input-field" required value={form.basePrice} onChange={(e) => setForm({ ...form, basePrice: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input type="number" className="input-field" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Scent notes</label>
              <input className="input-field" value={form.scentNotes} onChange={(e) => setForm({ ...form, scentNotes: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image key</label>
              <input className="input-field" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="taro, matcha, ube…" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Badge</label>
              <input className="input-field" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Bestseller, New…" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Sizes (comma-separated)</label>
              <input className="input-field" value={Array.isArray(form.sizes) ? form.sizes.join(', ') : form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value.split(',').map((s) => s.trim()) })} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea className="input-field resize-none" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.active !== false} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-blush-500" />
              <span className="text-sm">Active on storefront</span>
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={saving} className="btn-primary flex-1">{saving ? 'Saving…' : 'Save'}</button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
