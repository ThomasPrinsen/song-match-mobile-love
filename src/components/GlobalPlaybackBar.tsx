import React, { useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { usePlayback } from '@/contexts/PlaybackContext';

const GlobalPlaybackBar = () => {
  const { currentSong, isPlaying, pauseSong, resumeSong, nextSong, previousSong } = usePlayback();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    setProgress(0);
  }, [currentSong]);

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto bg-black/90 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="flex items-center px-4 py-2">
        <div className="flex items-center flex-1 min-w-0">
          <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
            <img 
              src={currentSong.coverImage} 
              alt={currentSong.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-3 min-w-0">
            <div className="text-white font-medium truncate">{currentSong.title}</div>
            <div className="text-white/60 text-sm truncate">{currentSong.artist}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <button 
            onClick={previousSong}
            className="p-2 text-white/80 hover:text-white"
          >
            <SkipBack size={20} />
          </button>
          <button 
            onClick={isPlaying ? pauseSong : resumeSong}
            className="p-2 bg-music-primary rounded-full text-white hover:bg-music-primary/90"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button 
            onClick={nextSong}
            className="p-2 text-white/80 hover:text-white"
          >
            <SkipForward size={20} />
          </button>
        </div>
      </div>
      {/* Progress bar */}
      <div className="px-4 pb-1">
        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalPlaybackBar; 