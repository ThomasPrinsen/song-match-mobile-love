import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Music } from "lucide-react";
import { Song } from "@/data/songs";
import StarRating from "./StarRating";
import { usePlayback } from "@/contexts/PlaybackContext";
import NavBar from "./NavBar";

interface HistoryPageProps {
  isOpen: boolean;
  onClose: () => void;
  ratedSongs: number[];
  allSongs: Song[];
  onRatingUpdate?: (songId: string, rating: number) => void;
}

const HistoryPage = ({
  isOpen,
  onClose,
  ratedSongs,
  allSongs,
  onRatingUpdate
}: HistoryPageProps) => {
  const { playSong } = usePlayback();

  // Get rated songs with their ratings
  const ratedSongsList = allSongs
    .filter(song => song.rating > 0)
    .sort((a, b) => b.rating - a.rating);

  const handlePlaySong = (song: Song) => {
    playSong(song);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[calc(100vh-2rem)] flex flex-col bg-gradient-to-b from-purple-900 to-purple-950">
        <div className="flex-1 overflow-hidden">
          <header className="mb-6">
            <h2 className="text-2xl font-bold text-white text-center">Last 24 Hours</h2>
            <p className="text-center text-white/60">Songs you've rated recently</p>
          </header>

          <ScrollArea className="h-[calc(100%-8rem)]">
            <div className="space-y-4 px-4">
              {ratedSongsList.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Music className="w-8 h-8 text-white/50" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No rated songs yet</h3>
                  <p className="text-white/60 max-w-xs">
                    Rate some songs to see them appear here
                  </p>
                </div>
              ) : (
                ratedSongsList.map((song) => (
                  <div
                    key={song.id}
                    className="bg-white/10 rounded-lg p-3 flex items-center gap-3 hover:bg-white/20 transition-colors cursor-pointer"
                    onClick={() => handlePlaySong(song)}
                  >
                    <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={song.coverImage}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">{song.title}</h4>
                      <p className="text-white/60 text-sm truncate">{song.artist}</p>
                      <div className="mt-1">
                        <StarRating rating={song.rating} readonly size="sm" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
        <NavBar />
      </DialogContent>
    </Dialog>
  );
};

export default HistoryPage; 