import { useEffect, useState } from 'react';
import { adminApi } from '../api';
import { useAdminLayout } from '../AdminLayout';
import AdminHeader from '../components/AdminHeader';

export default function AdminHomepage() {
  const { openMenu } = useAdminLayout();
  const [content, setContent] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([adminApi.homepage.get(), adminApi.products.list()])
      .then(([h, p]) => {
        setContent(h.content);
        setProducts(p.products.filter((pr) => pr.type !== 'custom'));
      })
      .finally(() => setLoading(false));
  }, []);

  const update = (path, value) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const toggleFeatured = (id) => {
    const ids = content.featuredProductIds.includes(id)
      ? content.featuredProductIds.filter((x) => x !== id)
      : [...content.featuredProductIds, id].slice(0, 6);
    update('featuredProductIds', ids);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const { content: updated } = await adminApi.homepage.update(content);
      setContent(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <>
        <AdminHeader title="Homepage" onMenuClick={openMenu} />
        <div className="p-8 flex justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-blush-300 border-t-blush-600 animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader
        title="Homepage Content"
        subtitle="Edit hero, stats, and featured sections"
        onMenuClick={openMenu}
        actions={
          <button type="button" onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5 px-5">
            {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save changes'}
          </button>
        }
      />
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl space-y-8">
        {/* Hero */}
        <section className="bg-white rounded-2xl border border-blush-100 p-6 shadow-soft space-y-4">
          <h2 className="font-display text-xl font-semibold text-ink-900">Hero section</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Eyebrow</label>
            <input className="input-field" value={content.hero.eyebrow} onChange={(e) => update('hero.eyebrow', e.target.value)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title line 1</label>
              <input className="input-field" value={content.hero.title} onChange={(e) => update('hero.title', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title accent (italic)</label>
              <input className="input-field" value={content.hero.titleAccent} onChange={(e) => update('hero.titleAccent', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <textarea className="input-field resize-none" rows={3} value={content.hero.subtitle} onChange={(e) => update('hero.subtitle', e.target.value)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Primary CTA</label>
              <input className="input-field" value={content.hero.ctaPrimary} onChange={(e) => update('hero.ctaPrimary', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Secondary CTA</label>
              <input className="input-field" value={content.hero.ctaSecondary} onChange={(e) => update('hero.ctaSecondary', e.target.value)} />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white rounded-2xl border border-blush-100 p-6 shadow-soft space-y-4">
          <h2 className="font-display text-xl font-semibold text-ink-900">Hero stats</h2>
          {content.stats.map((stat, i) => (
            <div key={i} className="grid sm:grid-cols-2 gap-4 p-4 bg-blush-50/30 rounded-xl">
              <div>
                <label className="block text-xs font-medium mb-1">Value</label>
                <input
                  className="input-field"
                  value={stat.value}
                  onChange={(e) => {
                    const stats = [...content.stats];
                    stats[i] = { ...stats[i], value: e.target.value };
                    update('stats', stats);
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Label</label>
                <input
                  className="input-field"
                  value={stat.label}
                  onChange={(e) => {
                    const stats = [...content.stats];
                    stats[i] = { ...stats[i], label: e.target.value };
                    update('stats', stats);
                  }}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Featured products */}
        <section className="bg-white rounded-2xl border border-blush-100 p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">Featured products (max 6)</h2>
          <div className="flex flex-wrap gap-2">
            {products.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => toggleFeatured(p.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  content.featuredProductIds.includes(p.id)
                    ? 'bg-blush-500 text-white'
                    : 'bg-white border border-blush-200 text-ink-700'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </section>

        {/* Custom CTA */}
        <section className="bg-white rounded-2xl border border-blush-100 p-6 shadow-soft space-y-4">
          <h2 className="font-display text-xl font-semibold text-ink-900">Custom CTA block</h2>
          {['eyebrow', 'title', 'subtitle', 'buttonText'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
              <input
                className="input-field"
                value={content.customCta[field]}
                onChange={(e) => update(`customCta.${field}`, e.target.value)}
              />
            </div>
          ))}
        </section>

        {/* Pillars */}
        <section className="bg-white rounded-2xl border border-blush-100 p-6 shadow-soft space-y-4">
          <h2 className="font-display text-xl font-semibold text-ink-900">Brand pillars</h2>
          {content.pillars.map((pillar, i) => (
            <div key={i} className="p-4 border border-blush-100 rounded-xl space-y-3">
              <input
                className="input-field font-medium"
                value={pillar.title}
                onChange={(e) => {
                  const pillars = [...content.pillars];
                  pillars[i] = { ...pillars[i], title: e.target.value };
                  update('pillars', pillars);
                }}
              />
              <textarea
                className="input-field resize-none text-sm"
                rows={2}
                value={pillar.description}
                onChange={(e) => {
                  const pillars = [...content.pillars];
                  pillars[i] = { ...pillars[i], description: e.target.value };
                  update('pillars', pillars);
                }}
              />
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
