import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Heart, Play, Pause, Clock } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { Song } from "@/data/songs";

interface SongCardProps {
  song: Song;
  isActive: boolean;
  onFavorite: () => void;
  isFavorite: boolean;
  isPlaying: boolean;
  onPlayPause: () => void;
  rating: number;
}

const SongCard = ({ 
  song, 
  isActive, 
  onFavorite, 
  isFavorite, 
  isPlaying,
  onPlayPause,
  rating 
}: SongCardProps) => {
  return (
    <div className={`song-card relative ${isActive ? 'z-10' : 'z-0'}`}>
      <div className="relative">
        <img 
          src={song.coverImage}
          alt={`${song.title} cover`}
          className="w-full aspect-square rounded-lg object-cover mb-4"
        />
        {/* Duration Badge */}
        <div className="absolute bottom-6 right-4 bg-black/60 px-2 py-1 rounded-md text-sm text-white flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {song.duration}
        </div>
        {/* Play/Pause Button Overlay */}
        <button 
          onClick={onPlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg"
        >
          {isPlaying ? (
            <Pause className="w-16 h-16 text-white" />
          ) : (
            <Play className="w-16 h-16 text-white" />
          )}
        </button>
        {/* Favorite Button */}
        <div className="absolute top-4 right-4">
          <button 
            onClick={onFavorite}
            className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          >
            <Heart 
              className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} 
            />
          </button>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">{song.title}</h3>
        <p className="text-gray-300">{song.artist}</p>
      </div>
    </div>
  );
};

export default SongCard;
