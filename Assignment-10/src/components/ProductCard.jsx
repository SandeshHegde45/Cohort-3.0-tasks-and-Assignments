import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import StarRating from "./StarRating";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  function handleCardClick() {
    navigate(`/products/${product.id}`);
  }

  function handleAddClick(event) {
    event.stopPropagation();
    addToCart(product);
  }

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white text-ink-950 shadow-sm transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-ink-950/90 px-2.5 py-1 text-[11px] font-semibold text-lime-400">
          {product.category}
        </span>
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-1 text-sm font-semibold">{product.title}</h3>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <StarRating rating={product.rating} size={12} />
          <span>{product.rating.toFixed(1)} ({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-base font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddClick}
            className="flex items-center gap-1 rounded-lg bg-lime-500 px-3 py-1.5 text-xs font-semibold text-ink-950 hover:bg-lime-400"
          >
            <ShoppingBag size={13} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
