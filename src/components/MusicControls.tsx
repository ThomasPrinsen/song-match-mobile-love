
import React from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { Song } from "@/data/songs";

interface MusicControlsProps {
  isPlaying: boolean;
  currentSong: Song | null;
  onRate: () => void;
  onPrevious: () => void;
  onNext: () => void;
  canNavigatePrevious: boolean;
  canNavigateNext: boolean;
}

const MusicControls: React.FC<MusicControlsProps> = ({
  currentSong,
  onRate,
  onPrevious,
  onNext,
  canNavigatePrevious,
  canNavigateNext
}) => {
  const { toast } = useToast();

  const handleRate = () => {
    onRate();
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <Button
        onClick={onPrevious}
        size="icon"
        variant="outline"
        className="rounded-full h-12 w-12"
        disabled={!canNavigatePrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        onClick={handleRate}
        size="lg"
        variant="default"
        className="music-control rounded-full h-16 w-48 bg-music-primary hover:bg-music-primary/90 transition-all shadow-md"
      >
        <Star className="h-6 w-6 mr-2" />
        <span className="text-lg font-medium">Rate Song</span>
      </Button>

      <Button
        onClick={onNext}
        size="icon"
        variant="outline"
        className="rounded-full h-12 w-12"
        disabled={!canNavigateNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MusicControls;
