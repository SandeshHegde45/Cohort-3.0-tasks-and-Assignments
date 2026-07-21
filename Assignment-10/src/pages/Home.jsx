import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ShoppingBag, TrendingUp, Star, Zap, ArrowRight, Package, Tag, Shield } from "lucide-react";
import { getAllProducts } from "../lib/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const categoryIcons = {
  Electronics: "💻",
  Clothing: "👕",
  Furniture: "🛋️",
  Home: "🏠",
  Sports: "🏀",
  Accessories: "👜",
};

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-[#111] border border-white/8 rounded-3xl p-6 flex items-start gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="font-heading font-bold text-2xl text-white">{value}</p>
        <p className="text-white/50 text-sm font-body">{label}</p>
        {sub && <p className="text-white/25 text-xs font-body mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function MiniProductCard({ product }) {
  const { addToCart, openCart } = useCart();

  function handleAddClick(event) {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
    openCart();
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex items-center gap-3 p-3 bg-white/3 hover:bg-white/6 border border-white/6 hover:border-volt/30 rounded-2xl transition-all duration-200"
    >
      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 p-1.5">
        <img src={product.image} alt={product.title} className="w-full h-full object-contain border border-ink-800 rounded-md" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-ink text-sm font-body clamp-1">{product.title}</p>
        <p className="text-volt font-heading font-bold text-sm mt-0.5">${product.price.toFixed(2)}</p>
      </div>
      <button
        onClick={handleAddClick}
        className="shrink-0 w-7 h-7 bg-volt/10 hover:bg-volt text-volt hover:text-ink rounded-lg flex items-center justify-center transition-all"
      >
        <ShoppingBag size={13} />
      </button>
    </Link>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { totalItemCount, totalPrice } = useCart();
  const { currentUser } = useAuth();

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .finally(() => setIsLoading(false));
  }, []);

  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const newest = products.filter((product) => product.isNew).slice(0, 5);

  const categoryCounts = {};
  products.forEach((product) => {
    if (categoryCounts[product.category]) {
      categoryCounts[product.category] += 1;
    } else {
      categoryCounts[product.category] = 1;
    }
  });
  const categoryList = Object.entries(categoryCounts);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="relative overflow-hidden rounded-3xl bg-[#111] border border-white/8 p-8 sm:p-12 mb-10">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-volt/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-volt/4 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(200,244,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,244,0,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-volt/70 text-sm font-body tracking-widest uppercase mb-3">{greeting} 👋</p>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
              Welcome back,
              <br />
              <span className="text-volt">{currentUser ? currentUser.name.split(" ")[0] : "Shopper"}!</span>
            </h1>
            <p className="text-white/40 font-body max-w-md">
              Discover today's picks — hand-curated products across electronics, fashion, and more.
            </p>
            <div className="flex gap-3 mt-6 flex-wrap">
              <Link to="/products" className="btn-volt flex items-center gap-2">
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link to="/products" className="btn-ghost flex items-center gap-2">
                View All Products
              </Link>
            </div>
          </div>

          <div className="shrink-0 flex flex-row md:flex-col gap-3">
            <div className="bg-volt/10 border border-volt/20 rounded-2xl px-6 py-4 text-center flex-1">
              <p className="font-heading font-bold text-4xl text-volt">150+</p>
              <p className="text-white/40 text-xs font-body mt-1">
                Products Available
              </p>
            </div>

            <div className="bg-white/4 border border-white/8 rounded-2xl px-6 py-4 text-center flex-1">
              <p className="font-heading font-bold text-2xl text-white">Free</p>
              <p className="text-white/40 text-xs font-body mt-1">
                Delivery on ₹999+
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 stagger">
        <StatCard icon={Package} label="Cart Items" value={totalItemCount} sub="In your bag" color="bg-volt/10 text-volt" />
        <StatCard icon={TrendingUp} label="Cart Value" value={`$${totalPrice.toFixed(2)}`} sub="Ready to checkout" color="bg-blue-500/10 text-blue-400" />
        <StatCard icon={Star} label="Top Products" value={topRated.length} sub="Highly rated" color="bg-amber-500/10 text-amber-400" />
        <StatCard icon={Tag} label="Categories" value={categoryList.length} sub="To explore" color="bg-purple-500/10 text-purple-400" />
      </div>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading font-bold text-xl">Shop by Category</h2>
          <Link to="/products" className="text-volt text-sm hover:text-volt-light transition-colors flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categoryList.map(([categoryName, count]) => (
            <Link
              key={categoryName}
              to={`/products?category=${encodeURIComponent(categoryName)}`}
              className="group bg-white border border-white/20 hover:border-white/40 hover:bg-white/95 rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="text-3xl mb-3">{categoryIcons[categoryName] || "📦"}</div>
              <p className="font-body font-semibold text-ink/80 text-sm capitalize">{categoryName}</p>
              <p className="text-ink/50 text-xs mt-1">{count} items</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-white/20 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-lg flex items-center gap-2 text-ink">
              <Star size={18} className="text-amber-400 fill-amber-400" /> Top Rated
            </h2>
            <Link to="/products?sort=rating" className="text-volt text-xs hover:text-volt-light flex items-center gap-1">
              See all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {isLoading
              ? [...Array(5)].map((_, index) => <div key={index} className="h-14 skeleton rounded-2xl" />)
              : topRated.map((product) => <MiniProductCard key={product.id} product={product} />)}
          </div>
        </div>

        <div className="bg-white border border-white/20 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-lg flex items-center gap-2 text-ink">
              <Zap size={18} className="text-volt fill-volt" /> New Arrivals
            </h2>
            <Link to="/products" className="text-volt text-xs hover:text-volt-light flex items-center gap-1">
              See all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {isLoading
              ? [...Array(5)].map((_, index) => <div key={index} className="h-14 skeleton rounded-2xl" />)
              : newest.map((product) => <MiniProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Zap, title: "Fast Delivery", desc: "Same-day on select items", color: "text-volt" },
          { icon: Shield, title: "Secure Payments", desc: "100% encrypted checkout", color: "text-blue-400" },
          { icon: Tag, title: "Best Prices", desc: "Price-match guarantee", color: "text-green-400" },
        ].map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="bg-[#111] border border-white/8 rounded-2xl p-5 flex items-center gap-4">
            <Icon size={24} className={color} />
            <div>
              <p className="font-body font-semibold text-white/80 text-sm">{title}</p>
              <p className="text-white/30 text-xs">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
