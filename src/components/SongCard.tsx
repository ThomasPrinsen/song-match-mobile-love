
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Heart } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { Song } from "@/data/songs";

interface SongCardProps {
  song: Song;
  isActive: boolean;
  swipeDirection: "none" | "left" | "right";
  onFavorite: () => void;
  isFavorite: boolean;
  zIndex?: number;
  position?: number;
}

const SongCard: React.FC<SongCardProps> = ({ 
  song, 
  isActive, 
  swipeDirection,
  onFavorite,
  isFavorite,
  zIndex = 10,
  position = 0
}) => {
  const cardClasses = () => {
    if (swipeDirection === "right") return "swipe-right";
    if (swipeDirection === "left") return "swipe-left";
    return "";
  };

  // Calculate position transformations for the stack effect
  const getTransform = () => {
    if (!isActive && position !== undefined) {
      if (position > 0) {
        // Cards to the right - appear behind
        return `translateX(${Math.min(position * 12, 40)}px) scale(${Math.max(1 - position * 0.05, 0.85)})`;
      } else if (position < 0) {
        // Cards to the left - appear behind
        return `translateX(${Math.max(position * 12, -40)}px) scale(${Math.max(1 + position * 0.05, 0.85)})`;
      }
    }
    return "translateX(0) scale(1)";
  };

  return (
    <Card 
      className={`song-card w-full max-w-sm overflow-hidden ${cardClasses()} transition-all duration-300 bg-white dark:bg-gray-900 shadow-lg`}
      style={{ 
        zIndex: isActive ? 10 : Math.max(1, zIndex), 
        transform: getTransform(),
        opacity: isActive ? 1 : Math.max(0.7, 1 - Math.abs(position || 0) * 0.15)
      }}
    >
      <div className="relative w-full flex flex-col">
        {/* Album cover - made square with AspectRatio */}
        <AspectRatio ratio={1 / 1} className="bg-gray-200">
          {song.coverImage ? (
            <img 
              src={song.coverImage} 
              alt={`${song.title} by ${song.artist}`}
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-music-accent">
              <Music size={80} className="text-music-primary opacity-50" />
            </div>
          )}
          
          {/* Favorite button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onFavorite();
            }}
            className="absolute top-4 right-4 p-2 bg-white/70 dark:bg-gray-800/70 rounded-full shadow-md hover:scale-110 transition-transform"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={20} 
              className={isFavorite ? "fill-music-primary text-music-primary" : "text-gray-500"} 
            />
          </button>
        </AspectRatio>
        
        {/* Song title and artist - display when active */}
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
            <h3 className="font-bold text-lg line-clamp-1">{song.title}</h3>
            <p className="text-sm opacity-90">{song.artist}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SongCard;
