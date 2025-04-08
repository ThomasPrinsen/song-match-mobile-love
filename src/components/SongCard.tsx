
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Heart } from "lucide-react";
import type { Song } from "@/data/songs";

interface SongCardProps {
  song: Song;
  isActive: boolean;
  swipeDirection: "none" | "left" | "right";
  onFavorite: () => void;
  isFavorite: boolean;
}

const SongCard: React.FC<SongCardProps> = ({ 
  song, 
  isActive, 
  swipeDirection,
  onFavorite,
  isFavorite 
}) => {
  const cardClasses = () => {
    if (swipeDirection === "right") return "swipe-right";
    if (swipeDirection === "left") return "swipe-left";
    return "";
  };

  return (
    <Card 
      className={`song-card w-full aspect-[3/5] rounded-3xl overflow-hidden absolute ${cardClasses()} ${isActive ? "z-10" : "z-0"} bg-white dark:bg-gray-900`}
    >
      <div className="relative h-full w-full flex flex-col">
        {/* Album cover/artist image - taking up most of the card */}
        <div className="relative h-4/5 overflow-hidden">
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
            className="absolute top-4 right-4 p-2 bg-white/70 dark:bg-gray-800/70 rounded-full shadow-md"
          >
            <Heart 
              size={20} 
              className={isFavorite ? "fill-music-primary text-music-primary" : "text-gray-500"} 
            />
          </button>
        </div>
        
        {/* Song info - at the bottom of the card */}
        <div className="p-5 flex flex-col bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white line-clamp-1">{song.artist}</h2>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="bg-music-accent/20 text-gray-700 border-gray-300">
                  {song.genre}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SongCard;
