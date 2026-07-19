import { useNavigate } from "react-router";
import { ShoppingBag, X, Package, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItemCount,
    totalPrice,
    placeOrder,
  } = useCart();
  const navigate = useNavigate();

  function handleBrowseProducts() {
    closeCart();
    navigate("/products");
  }

  function handleCheckout() {
    placeOrder();
  }

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-ink-950 shadow-2xl transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <ShoppingBag size={20} className="text-lime-400" /> Cart
            {cartItems.length > 0 && (
              <span className="rounded-full bg-lime-500/10 px-2 py-0.5 text-xs font-semibold text-lime-400">
                {totalItemCount} {totalItemCount === 1 ? "item" : "items"}
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-white/5 hover:text-white"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-800 text-gray-500">
              <Package size={28} />
            </span>
            <p className="font-display text-lg font-bold">Cart is empty</p>
            <p className="text-sm text-gray-500">Go shop something cool!</p>
            <button
              onClick={handleBrowseProducts}
              className="mt-2 rounded-xl bg-lime-500 px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-lime-400"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-2xl border border-white/10 bg-ink-900 p-4"
                >
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute right-4 top-4 p-1 text-gray-500 hover:text-rose-400"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="flex gap-3 pr-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-16 w-16 shrink-0 rounded-xl bg-white object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{item.title}</p>
                      <p className="mt-1 text-lg font-bold text-lime-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-300 hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-300 hover:text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-gray-400">Total</span>
                <span className="font-display text-2xl font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-lime-500 py-3.5 text-sm font-semibold text-ink-950 hover:bg-lime-400"
              >
                Checkout <ArrowRight size={16} />
              </button>
              <button
                onClick={clearCart}
                className="mt-3 w-full text-center text-xs text-gray-500 hover:text-gray-300"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
