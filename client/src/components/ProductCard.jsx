import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SIZE_OPTIONS, getProductPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { CandleVisual } from '../utils/candleVisuals';

/**
 * Product card with scent details, size selector, price, and add-to-cart.
 */
export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const defaultSize = product.sizes?.includes('classic')
    ? 'classic'
    : product.sizes?.[0] ?? 'classic';
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [added, setAdded] = useState(false);

  const availableSizes = SIZE_OPTIONS.filter((s) => product.sizes?.includes(s.id));
  const price = getProductPrice(product, selectedSize);

  const handleAdd = () => {
    if (product.type === 'custom') return;
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="group flex flex-col bg-card-gradient rounded-2xl border border-blush-100/80 shadow-soft overflow-hidden hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
      {/* Image area */}
      <div className="relative aspect-[4/5] bg-gradient-to-b from-blush-50 to-cream-100 flex items-center justify-center p-6 overflow-hidden">
        {product.badge && (
          <span className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-blush-500 text-white rounded-full">
            {product.badge}
          </span>
        )}
        <CandleVisual
          variant={product.image}
          className="w-32 h-auto group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 gap-4">
        <div>
          <p className="text-xs font-medium tracking-wider uppercase text-blush-600 mb-1">
            {product.type}
          </p>
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink-900">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-ink-600 leading-relaxed">{product.scentNotes}</p>
        </div>

        {/* Size options */}
        {product.type !== 'custom' && availableSizes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => setSelectedSize(size.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  selectedSize === size.id
                    ? 'bg-blush-500 text-white border-blush-500'
                    : 'bg-white/80 text-ink-700 border-blush-200 hover:border-blush-400'
                }`}
              >
                {size.label.split(' ')[0]}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-4 pt-2 border-t border-blush-100">
          <p className="font-display text-2xl font-semibold text-ink-900">
            ${price}
          </p>
          {product.type === 'custom' ? (
            <Link to="/custom" className="btn-primary text-sm py-2.5 px-5">
              Customize
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className={`text-sm py-2.5 px-5 rounded-full font-medium transition-all duration-300 ${
                added
                  ? 'bg-ink-800 text-white'
                  : 'bg-blush-500 text-white hover:bg-blush-600 hover:shadow-soft'
              }`}
            >
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
