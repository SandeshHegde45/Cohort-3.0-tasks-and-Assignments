import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft, ShoppingCart, Check, Plus, Minus,
  Truck, Shield, RotateCcw, Heart, Package, ChevronLeft, ChevronRight,
} from "lucide-react";
import { getAllProducts, getProductById } from "../lib/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import StarRating from "../components/StarRating";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openCart, isInCart, cartItems, updateQuantity } = useCart();
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
          const sameCategory = allProducts
            .filter((item) => item.category === foundProduct.category)
            .sort((a, b) => a.id - b.id);
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square bg-white/5 rounded-3xl" />
          <div className="space-y-4 pt-4">
            <div className="h-4 bg-white/5 rounded-lg w-24" />
            <div className="h-8 bg-white/5 rounded-xl w-3/4" />
            <div className="h-8 bg-white/5 rounded-xl w-1/2" />
            <div className="h-24 bg-white/5 rounded-xl" />
            <div className="h-12 bg-white/5 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
        <Package size={56} className="text-white/15" />
        <p className="font-heading font-bold text-xl text-white/50">Product not found</p>
        <button onClick={() => navigate("/products")} className="btn-volt">
          Back to Shop
        </button>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const cartItem = cartItems.find((item) => item.id === product.id);

  function handleAddToCart() {
    addToCart(product);
    openCart();
  }

  const currentIndex = categoryProducts.findIndex((item) => item.id === product.id);
  const previousProduct = currentIndex > 0 ? categoryProducts[currentIndex - 1] : null;
  const nextProduct =
    currentIndex >= 0 && currentIndex < categoryProducts.length - 1
      ? categoryProducts[currentIndex + 1]
      : null;
  const relatedProducts = categoryProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <nav className="flex items-center gap-2 text-sm text-white/30 font-body mb-8">
        <Link to="/products" className="hover:text-white flex items-center gap-1.5 transition-colors">
          <ArrowLeft size={14} /> Products
        </Link>
        <span>/</span>
        <span className="capitalize text-white/50">{product.category}</span>
        <span>/</span>
        <span className="text-white/70 clamp-1 max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 mb-16">
        <div className="bg-white rounded-3xl p-10 flex items-center justify-center aspect-square animate-scale-in">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col gap-5 animate-fade-up">
          <span className="badge bg-volt/10 text-volt border border-volt/20 capitalize w-fit text-xs">
            {product.category}
          </span>

          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-3">
            <StarRating rating={product.rating} size={14} />
            <span className="font-semibold text-white/70 text-sm">{product.rating.toFixed(1)}</span>
            <span className="text-white/30 text-sm">({product.reviewCount} reviews)</span>
          </div>

          <div className="py-4 border-y border-white/8">
            <span className="font-heading font-bold text-4xl text-volt">${product.price.toFixed(2)}</span>
          </div>

          <p className="text-white/50 font-body text-sm leading-relaxed">{product.description}</p>

          {inCart && cartItem && (
            <div className="flex items-center gap-3 bg-white/4 border border-white/8 rounded-2xl p-4">
              <span className="text-white/50 text-sm font-body">In cart:</span>
              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl transition-all"
                >
                  <Minus size={13} />
                </button>
                <span className="font-heading font-bold text-lg w-6 text-center">{cartItem.quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl transition-all"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-heading font-bold text-base transition-all duration-200 active:scale-95
                ${inCart ? "bg-green-500/15 text-green-400 border border-green-500/25 hover:bg-green-500/25" : "btn-volt"}`}
            >
              {inCart ? (
                <>
                  <Check size={18} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Add to Cart
                </>
              )}
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3.5 border rounded-2xl transition-all ${
                isInWishlist(product.id)
                  ? "bg-red-500/15 border-red-500/30 text-red-400"
                  : "border-white/10 text-white/30 hover:text-red-400 hover:border-red-500/30"
              }`}
            >
              <Heart size={20} className={isInWishlist(product.id) ? "fill-red-400" : ""} />
            </button>
          </div>

          {inCart && (
            <button onClick={openCart} className="btn-ghost w-full text-center text-sm">
              View Cart →
            </button>
          )}

          <div className="grid grid-cols-3 gap-3 mt-1">
            {[
              { icon: Truck, label: "Free Delivery", sub: "On orders $50+" },
              { icon: Shield, label: "Secure Pay", sub: "256-bit SSL" },
              { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="bg-white/3 border border-white/6 rounded-2xl p-3 text-center">
                <Icon size={16} className="text-volt mx-auto mb-1.5" />
                <p className="text-white/60 text-[11px] font-body font-semibold">{label}</p>
                <p className="text-white/25 text-[10px] font-body">{sub}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            {previousProduct && (
              <Link
                to={`/products/${previousProduct.id}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl transition-all text-white text-sm font-body"
              >
                <ChevronLeft size={16} /> Previous
              </Link>
            )}
            {nextProduct && (
              <Link
                to={`/products/${nextProduct.id}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-volt hover:bg-volt-light text-ink border border-volt rounded-2xl transition-all font-heading font-semibold text-sm"
              >
                Next <ChevronRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section>
          <h2 className="font-heading font-bold text-2xl mb-6">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                style={{ animationDelay: `${index * 60}ms` }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
