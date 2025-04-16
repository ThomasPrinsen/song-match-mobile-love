import React from "react";
import { X, Play, Pause } from "lucide-react";
import { Song } from "@/data/songs";

interface HistoryPageProps {
  isOpen: boolean;
  onClose: () => void;
  ratedSongs: number[];
  allSongs: Song[];
  onRatingUpdate: (songId: string, newRating: number) => void;
}

const HistoryPage = ({ 
  isOpen, 
  onClose, 
  ratedSongs,
  allSongs,
  onRatingUpdate
}: HistoryPageProps) => {
  const [isPlaying, setIsPlaying] = React.useState<{ [key: string]: boolean }>({});
  const [showRating, setShowRating] = React.useState<{ [key: string]: boolean }>({});

  // Filter songs rated in the last 24 hours
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentlyRatedSongs = allSongs.filter(song => 
    ratedSongs.includes(parseInt(song.id.substring(4)))
  );

  const togglePlay = (songId: string) => {
    setIsPlaying(prev => ({
      ...prev,
      [songId]: !prev[songId]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-purple-950 z-50 animate-in slide-in-from-right">
      <div className="min-h-full flex flex-col">
        <header className="px-6 py-4 bg-black/20 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Last 24 Hours</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </header>

        <div className="flex-1 px-6 py-8 overflow-y-auto">
          <div className="space-y-4">
            {recentlyRatedSongs.length === 0 ? (
              <div className="text-center text-white/70 py-8">
                No songs rated in the last 24 hours
              </div>
            ) : (
              recentlyRatedSongs.map((song) => (
                <div 
                  key={song.id}
                  className="bg-white/10 rounded-2xl overflow-hidden"
                >
                  <div className="flex items-center p-4">
                    {/* Song Cover */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden mr-4">
                      <img 
                        src={song.coverImage}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => togglePlay(song.id)}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
                      >
                        {isPlaying[song.id] ? (
                          <Pause className="w-6 h-6 text-white" />
                        ) : (
                          <Play className="w-6 h-6 text-white" />
                        )}
                      </button>
                    </div>

                    {/* Song Info */}
                    <div className="flex-grow">
                      <h3 className="text-white font-semibold">{song.title}</h3>
                      <p className="text-white/70 text-sm">{song.artist}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => onRatingUpdate(song.id, star)}
                          className={`transform transition-all duration-200 ${
                            star <= (song.rating || 0)
                              ? 'text-yellow-400'
                              : 'text-white/40 hover:text-yellow-200'
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage; 