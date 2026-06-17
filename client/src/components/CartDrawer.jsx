import { SIZE_OPTIONS } from '../data/products';
import { useCart } from '../context/CartContext';

/**
 * Slide-out cart drawer with quantity controls.
 */
export default function CartDrawer() {
  const {
    items,
    isOpen,
    cartTotal,
    toggleCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm z-[60] animate-fade-in"
        onClick={toggleCart}
        aria-hidden="true"
      />
      <aside
        className="fixed top-0 right-0 h-full w-full max-w-md bg-cream-50 shadow-2xl z-[70] flex flex-col animate-fade-in-up"
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between p-6 border-b border-blush-100">
          <h2 className="font-display text-2xl font-semibold text-ink-900">Your Cart</h2>
          <button
            type="button"
            onClick={toggleCart}
            className="p-2 rounded-full hover:bg-blush-50 transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-ink-500 text-center py-12">Your cart is empty. Discover our scents!</p>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => {
                const sizeLabel = SIZE_OPTIONS.find((s) => s.id === item.size)?.label ?? item.size;
                return (
                  <li key={item.key} className="flex gap-4 pb-6 border-b border-blush-100 last:border-0">
                    <div className="w-16 h-20 rounded-xl bg-blush-50 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-ink-900 truncate">{item.name}</h3>
                      <p className="text-xs text-ink-500 mt-0.5">{sizeLabel}</p>
                      <p className="font-display text-lg text-blush-600 mt-1">${item.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-blush-200 hover:bg-blush-50 text-sm"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-blush-200 hover:bg-blush-50 text-sm"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.key)}
                          className="ml-auto text-xs text-ink-500 hover:text-blush-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-blush-100 bg-white/80">
            <div className="flex justify-between mb-4">
              <span className="text-ink-600">Subtotal</span>
              <span className="font-display text-2xl font-semibold text-ink-900">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <button type="button" className="btn-primary w-full mb-3">
              Checkout
            </button>
            <button
              type="button"
              onClick={clearCart}
              className="w-full text-sm text-ink-500 hover:text-blush-600"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
