import { Star } from "lucide-react";

export default function StarRating({ rating, size = 14, emptyColor = "text-gray-300" }) {
  const starIndexes = [0, 1, 2, 3, 4];

  return (
    <div className="flex">
      {starIndexes.map((starIndex) => {
        const fillAmount = Math.min(Math.max(rating - starIndex, 0), 1);
        const fillPercent = Math.round(fillAmount * 100);

        return (
          <span key={starIndex} className="relative" style={{ width: size, height: size }}>
            <Star size={size} className={`absolute inset-0 ${emptyColor}`} />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercent}%` }}
            >
              <Star size={size} fill="currentColor" className="text-amber-400" />
            </span>
          </span>
        );
      })}
    </div>
  );
}
