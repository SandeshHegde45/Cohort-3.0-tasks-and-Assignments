import { Star } from "lucide-react";

export default function StarRating({ rating, size = 14 }) {
  const starIndexes = [0, 1, 2, 3, 4];

  return (
    <div className="flex items-center">
      {starIndexes.map((starIndex) => {
        const isFilled = starIndex < Math.round(rating || 0);
        return (
          <Star
            key={starIndex}
            size={size}
            className={isFilled ? "text-amber-400 fill-amber-400" : "text-white/15 fill-white/15"}
          />
        );
      })}
    </div>
  );
}
