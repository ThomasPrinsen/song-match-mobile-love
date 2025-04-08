
import React, { useState, useEffect } from "react";
import SongCard from "@/components/SongCard";
import MusicControls from "@/components/MusicControls";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import RatingDialog from "@/components/RatingDialog";
import { songs, Song } from "@/data/songs";
import { Music } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const [ratedSongs, setRatedSongs] = useState<number[]>([]);
  const [showRatingDialog, setShowRatingDialog] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Filter songs by selected genres and exclude rated songs
  const filteredSongs = songs
    .filter(song => selectedGenres.length === 0 || selectedGenres.includes(song.genre))
    .filter(song => !ratedSongs.includes(song.id));
  
  const currentSong = filteredSongs.length > 0 ? filteredSongs[currentSongIndex % filteredSongs.length] : null;
  
  const handleNextSong = () => {
    if (currentSongIndex < filteredSongs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else if (filteredSongs.length > 1) {
      // Loop back to the first song when we reach the end
      setCurrentSongIndex(0);
    }
    setIsPlaying(false);
  };
  
  const handlePreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else if (filteredSongs.length > 1) {
      // Loop to the last song if at the beginning
      setCurrentSongIndex(filteredSongs.length - 1);
    }
    setIsPlaying(false);
  };
  
  const handleRate = () => {
    setShowRatingDialog(true);
  };
  
  const handleRatingSubmit = (rating: number) => {
    if (currentSong) {
      // Add to rated songs
      setRatedSongs(prev => [...prev, currentSong.id]);
      
      // Continue to next song if available
      if (filteredSongs.length > 1) {
        handleNextSong();
      } else {
        // Reset current index if this was the last song
        setCurrentSongIndex(0);
      }
      setShowRatingDialog(false);
    }
  };
  
  const handleToggleFavorite = () => {
    if (!currentSong) return;
    
    const isFavorite = favoriteSongs.some(song => song.id === currentSong.id);
    
    if (isFavorite) {
      setFavoriteSongs(favoriteSongs.filter(song => song.id !== currentSong.id));
      toast({
        title: "Removed from favorites",
        description: `"${currentSong.title}" has been removed from your favorites`,
      });
    } else {
      setFavoriteSongs([...favoriteSongs, currentSong]);
      toast({
        title: "Added to favorites",
        description: `"${currentSong.title}" has been added to your favorites`,
      });
    }
  };
  
  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("favoriteSongs", JSON.stringify(favoriteSongs));
    localStorage.setItem("ratedSongs", JSON.stringify(ratedSongs));
  }, [favoriteSongs, ratedSongs]);
  
  // Load data from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteSongs");
    if (savedFavorites) {
      setFavoriteSongs(JSON.parse(savedFavorites));
    }
    
    const savedRated = localStorage.getItem("ratedSongs");
    if (savedRated) {
      setRatedSongs(JSON.parse(savedRated));
    }
    
    const savedGenres = localStorage.getItem("selectedGenres");
    if (savedGenres) {
      setSelectedGenres(JSON.parse(savedGenres));
    }
  }, []);

  // Limit the number of visible songs to 5 maximum
  const visibleSongs = filteredSongs.slice(0, 5);
  const isFavorite = currentSong ? favoriteSongs.some(song => song.id === currentSong.id) : false;
  
  return (
    <MobileLayout>
      <div className="h-full flex flex-col px-4 pt-10 pb-20 bg-gradient-to-b from-music-dark to-purple-950">
        <header className="mb-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-music-primary to-music-secondary flex items-center justify-center">
              <span className="text-lg font-bold text-white">T</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-music-primary to-music-secondary bg-clip-text text-transparent">
              Thammy
            </h1>
          </div>
          <p className="text-center text-gray-300 text-sm mt-1">
            Where music breaks through
          </p>
        </header>
        
        <div className="flex-grow relative flex items-center justify-center">
          {/* Card stack */}
          <div className="relative w-full max-w-sm h-[70vh]">
            {/* Current song card */}
            {currentSong && (
              <SongCard 
                song={currentSong}
                isActive={true}
                swipeDirection="none"
                onFavorite={handleToggleFavorite}
                isFavorite={isFavorite}
              />
            )}
            
            {filteredSongs.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Music size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No more songs</h3>
                <p className="text-gray-300 max-w-xs">
                  You've rated all available songs in this genre. Try selecting different genres in your profile.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mb-4">
          {visibleSongs.map((_, index) => (
            <div 
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === (currentSongIndex % visibleSongs.length) 
                  ? "bg-white" 
                  : "bg-gray-500"
              }`}
            />
          ))}
        </div>
        
        <MusicControls 
          isPlaying={isPlaying}
          currentSong={currentSong}
          onRate={handleRate}
          onPrevious={handlePreviousSong}
          onNext={handleNextSong}
          canNavigatePrevious={filteredSongs.length > 1}
          canNavigateNext={filteredSongs.length > 1}
        />
      </div>
      
      <RatingDialog 
        isOpen={showRatingDialog}
        onClose={() => setShowRatingDialog(false)}
        onRate={handleRatingSubmit}
        currentSong={currentSong}
      />
      
      <NavBar />
    </MobileLayout>
  );
};

export default Index;
