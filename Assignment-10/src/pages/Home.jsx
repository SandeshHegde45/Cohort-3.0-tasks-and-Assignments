import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowRight,
  Package,
  TrendingUp,
  Star,
  Tag,
  Laptop,
  Shirt,
  Armchair,
  Home as HomeIcon,
  Dumbbell,
  Watch,
  Zap,
  ShieldCheck,
  Truck,
  ShoppingBag,
} from "lucide-react";
import { getAllProducts } from "../lib/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const categoryIcons = {
  Electronics: Laptop,
  Clothing: Shirt,
  Furniture: Armchair,
  Home: HomeIcon,
  Sports: Dumbbell,
  Accessories: Watch,
};

function getGreeting() {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return "Good morning";
  if (currentHour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { totalItemCount, totalPrice, addToCart } = useCart();
  const { currentUser } = useAuth();

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .finally(() => setIsLoading(false));
  }, []);

  const categoryCounts = {};
  products.forEach((product) => {
    if (categoryCounts[product.category]) {
      categoryCounts[product.category] += 1;
    } else {
      categoryCounts[product.category] = 1;
    }
  });
  const categoryList = Object.entries(categoryCounts);

  const topRatedProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
  const newArrivalProducts = products.filter((product) => product.isNew).slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900 px-8 py-12 animate-fade-up">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(198,255,51,0.08),transparent_45%)]" />
        <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-lime-400">
              {getGreeting()} <span>👋</span>
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              Welcome back,
              <br />
              <span className="text-lime-500">{currentUser ? currentUser.name : "Guest"}!</span>
            </h1>
            <p className="mt-4 max-w-md text-gray-400">
              Discover today's picks — hand-curated products across electronics,
              fashion, and more.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                to="/products"
                className="flex items-center gap-2 rounded-xl bg-lime-500 px-5 py-3 text-sm font-semibold text-ink-950 hover:bg-lime-400"
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link
                to="/products"
                className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5"
              >
                View All Products
              </Link>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <div className="rounded-xl border border-lime-500/30 bg-lime-500/10 px-5 py-3 text-right">
              <p className="font-display text-xl font-bold text-lime-400">
                {products.length}+
              </p>
              <p className="text-xs text-gray-400">Products Available</p>
            </div>
            <div className="rounded-xl border border-white/10 px-5 py-3 text-right">
              <p className="font-display text-xl font-bold">Free</p>
              <p className="text-xs text-gray-400">Delivery on $999+</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={<Package size={16} className="text-lime-400" />} iconBg="bg-lime-500/10" value={totalItemCount} label="Cart Items" sub="In your bag" />
        <StatCard icon={<TrendingUp size={16} className="text-sky-400" />} iconBg="bg-sky-500/10" value={`$${totalPrice.toFixed(2)}`} label="Cart Value" sub="Ready to checkout" />
        <StatCard icon={<Star size={16} className="text-amber-400" />} iconBg="bg-amber-500/10" value={products.length ? Math.max(5, Math.round(products.length * 0.1)) : "—"} label="Top Products" sub="Highly rated" />
        <StatCard icon={<Tag size={16} className="text-purple-400" />} iconBg="bg-purple-500/10" value={categoryList.length} label="Categories" sub="To explore" />
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">Shop by Category</h2>
          <Link to="/products" className="flex items-center gap-1 text-sm font-semibold text-lime-400 hover:text-lime-300">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-28 animate-pulse rounded-2xl bg-ink-800" />
              ))
            : categoryList.map(([categoryName, productCount]) => {
                const CategoryIcon = categoryIcons[categoryName] || Tag;
                return (
                  <Link
                    to={`/products?category=${encodeURIComponent(categoryName)}`}
                    key={categoryName}
                    className="flex flex-col items-center gap-2 rounded-2xl bg-white p-5 text-center text-ink-950 transition-transform hover:-translate-y-1"
                  >
                    <CategoryIcon size={26} />
                    <span className="text-sm font-semibold">{categoryName}</span>
                    <span className="text-xs text-gray-500">{productCount} items</span>
                  </Link>
                );
              })}
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <ProductList
          title="Top Rated"
          icon={<Star size={16} className="fill-amber-400 text-amber-400" />}
          products={topRatedProducts}
          onAddToCart={addToCart}
          isLoading={isLoading}
        />
        <ProductList
          title="New Arrivals"
          icon={<Zap size={16} className="fill-lime-500 text-lime-500" />}
          products={newArrivalProducts}
          onAddToCart={addToCart}
          isLoading={isLoading}
        />
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <Perk icon={<Zap size={18} className="text-lime-400" />} title="Fast Delivery" sub="Same-day on select items" />
        <Perk icon={<ShieldCheck size={18} className="text-sky-400" />} title="Secure Payments" sub="100% encrypted checkout" />
        <Perk icon={<ShoppingBag size={18} className="text-emerald-400" />} title="Best Prices" sub="Price-match guarantee" />
      </section>
    </div>
  );
}

function StatCard({ icon, iconBg, value, label, sub }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900 p-4">
      <span className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${iconBg}`}>
        {icon}
      </span>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-[11px] text-gray-600">{sub}</p>
    </div>
  );
}

function ProductList({ title, icon, products, onAddToCart, isLoading }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl bg-white p-5 text-ink-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-lg font-bold">
          {icon} {title}
        </h3>
        <Link to="/products" className="text-xs font-semibold text-gray-500 hover:text-ink-950">
          See all →
        </Link>
      </div>
      <div className="space-y-2">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-14 animate-pulse rounded-xl bg-gray-100" />
            ))
          : products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 p-2 hover:bg-gray-50"
              >
                <img src={product.image} alt={product.title} className="h-10 w-10 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{product.title}</p>
                  <p className="text-xs font-semibold text-lime-600">${product.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="rounded-lg bg-lime-100 p-2 text-lime-700 hover:bg-lime-200"
                >
                  <ShoppingBag size={14} />
                </button>
              </div>
            ))}
      </div>
    </div>
  );
}

function Perk({ icon, title, sub }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900 p-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">{icon}</span>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-gray-500">{sub}</p>
      </div>
    </div>
  );
}
