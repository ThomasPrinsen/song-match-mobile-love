import React from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Music, Clock, Calendar, X } from "lucide-react";
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
  const { playSong, currentSong, isPlaying } = usePlayback();

  // Get rated songs with their ratings
  const ratedSongsList = allSongs
    .filter(song => song.rating > 0)
    .sort((a, b) => b.rating - a.rating);

  const handlePlaySong = (song: Song) => {
    playSong(song);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-screen p-0 flex flex-col bg-gradient-to-b from-purple-900 to-purple-950">
        {/* Close Button */}
        <DialogClose className="absolute right-4 top-4 rounded-full p-2 text-white opacity-70 hover:opacity-100 bg-white/10 hover:bg-white/20 transition-all">
          <X className="h-4 w-4" />
        </DialogClose>

        <div className="flex-1 overflow-hidden">
          {/* Enhanced Header */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
            <header className="px-6 pt-8 pb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-1">Last 24 Hours</h2>
              <p className="text-center text-white/60">Songs you've rated recently</p>
            </header>
          </div>

          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="px-4 pb-24 space-y-2">
              {ratedSongsList.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-6">
                    <Music className="w-10 h-10 text-white/50" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">No rated songs yet</h3>
                  <p className="text-white/60 max-w-xs px-6">
                    Start rating songs to build your music history
                  </p>
                </div>
              ) : (
                ratedSongsList.map((song) => (
                  <div
                    key={song.id}
                    className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl p-3 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      {/* Song Image with Play State Indicator */}
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={song.coverImage}
                          alt={song.title}
                          className="w-full h-full object-cover"
                        />
                        {currentSong?.id === song.id && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          </div>
                        )}
                      </div>

                      {/* Song Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-medium text-white truncate">{song.title}</h4>
                            <p className="text-sm text-white/60 truncate">{song.artist}</p>
                          </div>
                          <span className="text-sm text-white/40 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Today
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <StarRating rating={song.rating} readonly size="sm" />
                          <span className="text-white/40 text-sm">
                            {song.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Interaction Area */}
                    <button
                      onClick={() => handlePlaySong(song)}
                      className="absolute inset-0 w-full h-full cursor-pointer"
                      aria-label={`Play ${song.title}`}
                    />
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