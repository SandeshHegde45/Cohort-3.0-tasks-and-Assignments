import { Link } from "react-router";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import StarRating from "./StarRating";

export default function ProductCard({ product, style }) {
  const { addToCart, openCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

  function handleAddClick(event) {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
    openCart();
  }

  return (
    <Link
      to={`/products/${product.id}`}
      style={style}
      className="product-card flex flex-col group animate-fade-up"
    >
      <div className="relative aspect-square bg-white overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 badge bg-black/60 text-white/80 backdrop-blur-sm capitalize text-[10px]">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-white/30 text-[10px] tracking-widest font-body capitalize">
          {product.category}
        </p>

        <h3 className="font-body font-medium text-white/85 text-sm leading-snug clamp-2 flex-1">
          {product.title}
        </h3>

        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} size={10} />
          <span className="text-white/30 text-[10px]">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/6">
          <span className="font-heading font-bold text-volt text-lg">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-body
                        transition-all duration-200 active:scale-95
                        ${inCart ? "bg-green-500/15 text-green-400 border border-green-500/20" : "bg-volt text-ink hover:bg-volt-light"}`}
          >
            {inCart ? (
              <>
                <Check size={12} />
                Added
              </>
            ) : (
              <>
                <ShoppingCart size={12} />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
