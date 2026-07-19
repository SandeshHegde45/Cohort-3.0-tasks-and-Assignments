import { useEffect } from "react";
import { PartyPopper } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function OrderPlacedToast() {
  const { isOrderPlaced, dismissOrderPlaced } = useCart();

  useEffect(() => {
    if (!isOrderPlaced) {
      return;
    }
    const timer = setTimeout(() => {
      dismissOrderPlaced();
    }, 2800);
    return () => clearTimeout(timer);
  }, [isOrderPlaced]);

  if (!isOrderPlaced) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-8 z-[60] flex justify-center px-4">
      <div className="flex items-center gap-2 rounded-2xl border border-lime-500/30 bg-ink-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl">
        <PartyPopper size={18} className="text-lime-400" />
        Order placed 🎉
      </div>
    </div>
  );
}
