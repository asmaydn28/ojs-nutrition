import { memo } from "react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  commentCount?: number;
  className?: string;
  layout?: "horizontal" | "vertical"; // Yatay (yan yana) veya dikey (alt alta)
}

const STAR_SIZES = {
  sm: { width: 16, height: 16 },
  md: { width: 24, height: 24 },
  lg: { width: 28, height: 28 },
};

const StarRating = memo(function StarRating({
  rating,
  size = "md",
  showCount = false,
  commentCount,
  className = "",
  layout = "vertical",
}: StarRatingProps) {
  const roundedRating = Math.round(rating);
  const starSize = STAR_SIZES[size];
  const isVertical = layout === "vertical";

  return (
    <div className={`flex ${isVertical ? "flex-col items-center gap-1" : "items-center gap-3"} ${className}`}>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width={starSize.width}
            height={starSize.height}
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9L8.91 8.26L12 2Z"
              fill={i < roundedRating ? "#FDD835" : "#E0E0E0"}
            />
          </svg>
        ))}
      </div>
      {showCount && commentCount !== undefined && (
        <span className="font-inter font-medium text-[13px] leading-[17px] text-[#333] text-center">
          {commentCount} Yorum
        </span>
      )}
    </div>
  );
});

export default StarRating;

