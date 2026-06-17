import { useState, useMemo, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import { SCENT_TYPES } from '../data/products';
import { apiUrl } from '../lib/apiBase';

const API_BASE = apiUrl('/api');

/**
 * Products page with search, scent-type filters, and product grid.
 */
export default function Scents() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products ?? []);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to client-side import if API unavailable
        import('../data/products').then((m) => {
          setProducts(m.products);
          setLoading(false);
        });
      });
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesFilter = activeFilter === 'all' || p.type === activeFilter;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.scentNotes.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [products, search, activeFilter]);

  return (
    <div className="min-h-screen">
      {/* Page hero */}
      <section className="section-padding bg-hero-gradient border-b border-blush-100/60">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Shop Scents"
            subtitle="Explore our full collection of boba-inspired candles. Filter by mood, search by note, and find your perfect pour."
            align="left"
          />
        </div>
      </section>

      <section className="section-padding bg-cream-50">
        <div className="max-w-7xl mx-auto">
          {/* Search & filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-10">
            <div className="relative flex-1 max-w-md">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="search"
                placeholder="Search by name or scent notes…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-12"
                aria-label="Search products"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {SCENT_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                    activeFilter === type
                      ? 'bg-blush-500 text-white shadow-soft'
                      : 'bg-white border border-blush-200 text-ink-700 hover:border-blush-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 rounded-2xl bg-blush-100/50 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-ink-500 py-16">
              No scents match your search. Try a different filter or keyword.
            </p>
          ) : (
            <>
              <p className="text-sm text-ink-500 mb-6">
                Showing {filtered.length} {filtered.length === 1 ? 'scent' : 'scents'}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
