import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { getAllProducts, getProductById } from "../lib/api";
import { useCart } from "../context/CartContext";
import StarRating from "../components/StarRating";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getProductById(id).then((foundProduct) => {
      setProduct(foundProduct);
      if (foundProduct) {
        getAllProducts().then((allProducts) => {
          const sameCategory = allProducts.filter(
            (item) => item.category === foundProduct.category).sort((a, b) => a.id - b.id);
          setCategoryProducts(sameCategory);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, [id]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-3xl bg-ink-800" />
          <div className="space-y-4">
            <div className="h-6 w-24 animate-pulse rounded-full bg-ink-800" />
            <div className="h-10 w-2/3 animate-pulse rounded-lg bg-ink-800" />
            <div className="h-24 animate-pulse rounded-lg bg-ink-800" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-sm text-gray-500">
          This product may have been removed or the link is incorrect.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-lime-500 px-5 py-3 text-sm font-semibold text-ink-950 hover:bg-lime-400"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const currentIndex = categoryProducts.findIndex((item) => item.id === product.id);
  const previousProduct = currentIndex > 0 ? categoryProducts[currentIndex - 1] : null;
  const nextProduct = currentIndex >= 0 && currentIndex < categoryProducts.length - 1 ? categoryProducts[currentIndex + 1] : null;
  const relatedProducts = categoryProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <Link to="/products" className="flex items-center gap-1 hover:text-white">
          <ArrowLeft size={14} /> Products
        </Link>
        <span>/</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-white">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-white">{product.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-3xl bg-white p-10">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[420px] w-full object-contain"
          />
        </div>

        <div>
          <span className="inline-block rounded-full bg-lime-500/10 px-3 py-1 text-xs font-semibold text-lime-400">
            {product.category}
          </span>

          <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">{product.title}</h1>

          <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
            <StarRating rating={product.rating} size={16} emptyColor="text-gray-600" />
            <span className="font-semibold text-white">{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount} reviews)</span>
          </div>

          <div className="mt-5 border-t border-white/10 pt-5">
            <p className="font-display text-3xl font-bold text-lime-400">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="mt-5 border-t border-white/10 pt-5">
            <p className="text-sm leading-relaxed text-gray-400">{product.description}</p>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => addToCart(product)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-lime-500 py-3.5 text-sm font-semibold text-ink-950 hover:bg-lime-400"
            >
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-colors ${isInWishlist(product.id)
                ? "border-rose-500/30 bg-rose-500/10 text-rose-500"
                : "border-white/10 text-gray-300 hover:text-lime-400"
                }`}
              aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}>
              <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <InfoTile icon={<Truck size={18} />} title="Free Delivery" sub="On orders $50+" />
            <InfoTile icon={<ShieldCheck size={18} />} title="Secure Pay" sub="256-bit SSL" />
            <InfoTile icon={<RotateCcw size={18} />} title="Easy Returns" sub="30-day policy" />
          </div>

          <div className="mt-6 flex gap-3">
            {previousProduct && (
              <button
                onClick={() => navigate(`/products/${previousProduct.id}`)}
                className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-white/10 bg-ink-900 py-3 text-sm font-semibold text-gray-300 hover:text-white">
                <ChevronLeft size={16} /> Previous
              </button>
            )}
            {nextProduct && (
              <button
                onClick={() => navigate(`/products/${nextProduct.id}`)}
                className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-lime-500 py-3 text-sm font-semibold text-ink-950 hover:bg-lime-400"
              >
                Next <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold">Related Products</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoTile({ icon, title, sub }) {
  return (
    <div className="rounded-xl border border-white/10 bg-ink-900 p-3 text-center">
      <span className="mx-auto mb-1 flex h-6 w-6 items-center justify-center text-lime-400">
        {icon}
      </span>
      <p className="text-xs font-semibold">{title}</p>
      <p className="text-[11px] text-gray-500">{sub}</p>
    </div>
  );
}
