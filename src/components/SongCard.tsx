
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music } from "lucide-react";
import type { Song } from "@/data/songs";

interface SongCardProps {
  song: Song;
  isActive: boolean;
  swipeDirection: "none" | "left" | "right";
}

const SongCard: React.FC<SongCardProps> = ({ song, isActive, swipeDirection }) => {
  const cardClasses = () => {
    if (swipeDirection === "right") return "swipe-right";
    if (swipeDirection === "left") return "swipe-left";
    return "";
  };

  return (
    <Card 
      className={`song-card w-full aspect-[3/4] absolute ${cardClasses()} ${isActive ? "z-10" : "z-0"}`} 
    >
      <div className="relative h-full w-full flex flex-col">
        {/* Album cover */}
        <div className="relative h-3/5 overflow-hidden">
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
        </div>
        
        {/* Song info */}
        <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-music-accent to-white dark:from-music-dark dark:to-gray-900">
          <h2 className="text-2xl font-bold text-music-primary line-clamp-1">{song.title}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">{song.artist}</p>
          
          <div className="mt-auto flex items-center justify-between">
            <Badge variant="outline" className="bg-music-accent/50 text-music-primary border-music-primary">
              {song.genre}
            </Badge>
            <span className="text-sm text-gray-500">{song.releaseYear}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SongCard;
