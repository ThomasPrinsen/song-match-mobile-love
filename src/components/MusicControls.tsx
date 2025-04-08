
import React from "react";
import { Star, X, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { Song } from "@/data/songs";

interface MusicControlsProps {
  isPlaying: boolean;
  currentSong: Song | null;
  onRate: () => void;
  onSkip: () => void;
  onTogglePlay: () => void;
}

const MusicControls: React.FC<MusicControlsProps> = ({
  isPlaying,
  currentSong,
  onRate,
  onSkip,
  onTogglePlay,
}) => {
  const { toast } = useToast();

  const handleRate = () => {
    onRate();
  };

  return (
    <div className="flex items-center justify-center gap-5 mt-8">
      <Button 
        onClick={onSkip}
        size="lg"
        variant="outline"
        className="music-control rounded-full h-14 w-14 border-2 border-gray-300"
      >
        <X className="h-8 w-8 text-gray-500" />
      </Button>
      
      <Button
        onClick={onTogglePlay}
        size="lg"
        disabled={!currentSong}
        className="music-control rounded-full h-14 w-14 bg-music-accent border-none"
      >
        {isPlaying ? (
          <Pause className="h-8 w-8 text-music-primary" />
        ) : (
          <Play className="h-8 w-8 text-music-primary" />
        )}
      </Button>
      
      <Button
        onClick={handleRate}
        size="lg"
        variant="outline"
        className="music-control rounded-full h-14 w-14 border-2 border-music-secondary"
      >
        <Star className="h-8 w-8 text-music-secondary" />
      </Button>
    </div>
  );
};

export default MusicControls;
