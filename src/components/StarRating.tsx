import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  size = "md",
  className
}) => {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 32,
  };
  
  const iconSize = sizes[size];
  const totalStars = 5;
  
  const handleStarClick = (starIndex: number) => {
    // If clicking on the same star that's already selected, keep it
    // Otherwise set to the clicked value
    onRatingChange(starIndex);
  };
  
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = rating >= starValue;
        const isHalfFilled = !isFilled && rating + 0.5 >= starValue;
        
        return (
          <div 
            key={index} 
            className="relative cursor-pointer transition-transform hover:scale-110"
            onClick={() => handleStarClick(starValue)}
          >
            <Star
              size={iconSize}
              className={cn(
                "transition-all duration-300",
                isFilled 
                  ? "text-amber-400 fill-amber-400" 
                  : isHalfFilled 
                  ? "text-amber-400 fill-amber-400" 
                  : "text-gray-300"
              )}
              fill={isFilled ? "currentColor" : isHalfFilled ? "url(#half)" : "none"}
            />
            
            {/* Half-fill gradient definition */}
            <svg width="0" height="0">
              <defs>
                <linearGradient id="half" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
